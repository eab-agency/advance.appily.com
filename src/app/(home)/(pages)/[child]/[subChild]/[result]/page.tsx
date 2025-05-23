import { fetchPage, fetchPages } from "@/app/graphql";
import { generateMeta } from "@/seo/generateMeta";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Page } from "../../../../../../../payload-types";
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
  params: { child: string; subChild: string; result: string };
}): Promise<Metadata> {
  const { child, subChild, result } = await params;

  const slug = [child, subChild, result].filter(Boolean);
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

const SubCategoryPage = async ({ params, searchParams }: any) => {
  const { child, subChild, result } = await params;
  let pageData: Page | null = null;
  const slug = [child, subChild, result].filter(Boolean);

  try {
    pageData = await fetchPage(slug);
  } catch (error) {}

  if (!pageData) {
    return notFound();
  }

  return (
    // <React.Fragment>
    // 	<Hero {...hero} />
    // 	<Blocks blocks={updatedBlocks} />
    // </React.Fragment>
    <PageClient page={pageData} />
  );
};

export default SubCategoryPage;
