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

    return pages
      .map(({ breadcrumbs }) => {
        if (!breadcrumbs || breadcrumbs.length === 0) return null;
        const url = breadcrumbs[breadcrumbs.length - 1]?.url;
        if (!url) return null;

        const slug = url.replace(/^\/|\/$/g, "").split("/");
        if (!slug || slug.length === 0) return null;

        return {
          child: slug[0] ?? "",
          subChild: slug[1] ?? "",
        };
      })
      .filter(
        (params): params is { child: string; subChild: string } =>
          params !== null
      );
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
