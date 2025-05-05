import { fetchPage, fetchPages } from "@/app/graphql";
import { generateMeta } from "@/seo/generateMeta";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageClient } from "./page.client";

export async function generateStaticParams() {
  try {
    const pages = await fetchPages();
    if (!Array.isArray(pages)) {
      console.error("Invalid pages data received");
      return [];
    }

    const validParams = pages
      .map(({ breadcrumbs }) => {
        if (!breadcrumbs || breadcrumbs.length < 2) return null;

        const url = breadcrumbs[breadcrumbs.length - 1]?.url;
        if (!url) return null;

        // Remove leading and trailing slashes and split into segments
        const segments = url.replace(/^\/|\/$/g, "").split("/");

        // Only process URLs that have exactly 2 segments for [child]/[subChild]
        if (segments.length !== 2) return null;

        return {
          child: segments[0],
          subChild: segments[1],
        };
      })
      .filter(
        (params): params is { child: string; subChild: string } =>
          params !== null && params.child !== "" && params.subChild !== ""
      );

    return validParams;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { child: string; subChild: string };
}): Promise<Metadata> {
  const { child, subChild } = params;
  const slug = [child, subChild].filter(Boolean);

  try {
    const page = await fetchPage(slug);
    if (page) {
      return generateMeta({ doc: page });
    }
  } catch (error) {
    console.error("Error fetching page data:", error);
  }

  return {
    title: "Default Title",
    description: "Default Description",
  };
}

const SubCategoryPage = async ({
  params,
}: {
  params: { child: string; subChild: string };
}) => {
  const { child, subChild } = params;
  const slug = [child, subChild].filter(Boolean);

  try {
    const pageData = await fetchPage(slug);
    if (!pageData) {
      return notFound();
    }

    return <PageClient page={pageData} />;
  } catch (error) {
    console.error("Error rendering page:", error);
    return notFound();
  }
};

export default SubCategoryPage;
