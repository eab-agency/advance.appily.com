import { fetchPage, fetchPages } from "@/app/graphql";
import { notFound } from "next/navigation";
import React from "react";
import { Page } from "../../../../payload-types";
import { PageClient } from "./page.client";
import { Metadata } from "next";
import { draftMode } from 'next/headers'
import { generateMeta } from "@/seo/generateMeta";

export async function generateStaticParams() {
  const pages = await fetchPages();

  const paramsVal = pages.map(({ breadcrumbs }) => {
    const slug = breadcrumbs?.[breadcrumbs.length - 1]?.url?.replace(/^\/|\/$/g, '').split('/');
    return {
      params: {
        slug,
      },
    };
  });
  return paramsVal;
}


export async function generateMetadata({ params }: { params: { category: string; subCategory: string } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode();
  const { category, subCategory } = params;

  const slug = [category, subCategory].filter(Boolean);

  let page: Page | null = null;

  try {
    page = await fetchPage(slug);
  } catch (error) {
    console.error('Error fetching page data:', error);
  }
  if (page) {
    return generateMeta({doc:page});
  } else {
    return {
      title: 'Default Title',
      description: 'Default Description',
    };
  }
}

const CategoryPage = async ({ params, searchParams }: any) => {
  const { child, subChild } = params;
  let pageData: Page | null = null

  const slug = [child, subChild].filter(Boolean);
  try {
    pageData = await fetchPage(slug);
  } catch (error) {
  }


  if (!pageData) {
    return notFound()
  }
  // const {hero , layout} = pageData;
  // return (
  //   <React.Fragment>
  //     <Hero {...hero} />
  //     <Blocks blocks={layout} />
  //   </React.Fragment>
  // );
  return <PageClient page={pageData} />
};

export default CategoryPage;
