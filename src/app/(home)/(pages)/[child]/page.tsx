import { fetchPage, fetchPages } from "@/app/graphql";
import { generateMeta } from "@/seo/generateMeta";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Page } from "../../../../../payload-types";
import { PageClient } from "./page.client";

export async function generateStaticParams() {
  const pages = await fetchPages();

  const paramsVal = pages.map(({ breadcrumbs }) => {
    const slug = breadcrumbs?.[breadcrumbs.length - 1]?.url
      ?.replace(/^\/|\/$/g, "")
      .split("/");
    return {
      params: {
        slug,
      },
    };
  });
  return paramsVal;
}

export async function generateMetadata({
  params,
}: {
  params: { child: string; subChild: string };
}): Promise<Metadata> {
  const { child, subChild } = await params;
  let slug: string[] = [];

  slug = [child, subChild].filter(Boolean);
  if (slug.length === 0) {
    slug.push("index");
  }
  let page: Page | null = null;

  try {
    page = await fetchPage(slug);
  } catch (error) {
    console.error("Error fetching page data:", error);
  }
  if (page) {
    return generateMeta({ doc: page });
  } else {
    return {
      title: "Default Title",
      description: "Default Description",
    };
  }
}

async function getPageData(slug: string) {
  try {
    const pageReq = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/pages?where[slug][equals]=${slug}&depth=0&limit=300`,
      {
        next: {
          revalidate: 300, // Revalidate every 120 seconds
        },
      }
    );
    if (!pageReq.ok) {
      throw new Error(`Failed to fetch page data: ${pageReq.statusText}`);
    }

    const pageData = await pageReq.json();
    const { docs } = pageData;
    const [doc] = docs;

    return {
      ...doc,
      collection: "pages",
      collectionLabels: {
        singular: "page",
        plural: "pages",
      },
    };
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
}


const CategoryPage = async ({ params, searchParams }: any) => {
  const { child, subChild } = await params;

  let pageData: Page | null = null;
  let slug: string[] = [];

  slug = [child, subChild].filter(Boolean);
  if (slug.length === 0) {
    slug.push("index");
  }

  try {
    // First try using the fetchPage utility
    pageData = await fetchPage(slug);

    // If that doesn't return data, try the direct API call
    if (!pageData) {
      pageData = await getPageData(slug.join("/"));
    }
  } catch (error) {
    console.error("Error fetching page:", error);
  }

  if (!pageData || !pageData.id) {
    return notFound();
  }

  return <PageClient page={pageData} />;
};

export default CategoryPage;
