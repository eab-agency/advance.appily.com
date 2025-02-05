import { fetchPage, fetchPages } from "@/app/graphql";
import { generateMeta } from "@/seo/generateMeta";
import { Metadata } from "next";
import { draftMode } from "next/headers";
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

export const getStaticProps = async ({ params: { slug } }) => {
  let props = {};

  try {
    const pageReq = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/pages?where[slug][equals]=${slug}&depth=0&limit=300`
    );
    if (!pageReq.ok) {
      throw new Error(`Failed to fetch page data: ${pageReq.statusText}`);
    }

    const pageData = await pageReq.json();
    const { docs } = pageData;
    const [doc] = docs;

    props = {
      ...doc,
      collection: "pages",
      collectionLabels: {
        singular: "page",
        plural: "pages",
      },
    };
  } catch (error) {
    console.error("Error fetching page data:", error);
    // Optionally, you could set a default state or log the error to an error tracking service
  }
  return {
    props,
    revalidate: 120, // Revalidate every 60 seconds
  };
};

export async function generateMetadata({
  params,
}: {
  params: { child: string; subChild: string };
}): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode();
  const { child, subChild } = params;
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

const CategoryPage = async ({ params, searchParams }: any) => {
  const { child, subChild } = params;

  let pageData: Page | null = null;
  let slug: string[] = [];

  slug = [child, subChild].filter(Boolean);
  if (slug.length === 0) {
    slug.push("index");
  }

  try {
    pageData = await fetchPage(slug);
  } catch (error) {}

  if (!pageData) {
    return notFound();
  }
  if (pageData) {
  }
  // const {hero , layout} = pageData;
  // return (
  //   <React.Fragment>
  //     <Hero {...hero} />
  //     <Blocks blocks={layout} />
  //   </React.Fragment>
  // );
  return <PageClient page={pageData} />;
};

export default CategoryPage;
