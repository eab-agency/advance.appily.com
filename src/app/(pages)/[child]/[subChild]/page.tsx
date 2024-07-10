import React from 'react';
import { notFound } from 'next/navigation';
import {  fetchPages, fetchPage } from '@/app/graphql';
import { Page } from '../../../../../payload-types'
import { Hero } from '../../../../blocks/HeroBlock';
import { Blocks } from '@/components/Block';
import { PageClient } from './page.client'
import { Metadata } from "next";
import { draftMode } from 'next/headers'
import { generateMeta } from "@/seo/generateMeta";

export async function generateStaticParams() {
	const pages = await fetchPages();
	const paramsVal = pages.map(({ breadcrumbs }) => {
	  const slug = breadcrumbs?.[breadcrumbs.length - 1]?.url?.replace(/^\/|\/$/g, '').split('/');
	  return {
		params: {
			slug
		}
	  };
	});
	return paramsVal;
  }
  
  export async function generateMetadata({ params }: { params: { child: string; subChild: string } }): Promise<Metadata> {
	const { isEnabled: isDraftMode } = draftMode();
	const { child, subChild } = params;
  
    const slug = [child, subChild].filter(Boolean);
  
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

  
  const SubCategoryPage = async({ params, searchParams }: any) => {
	const { child, subChild } = params; 
	let pageData: Page | null = null
    const slug = [child, subChild].filter(Boolean);
	try {
		pageData  = await fetchPage(slug);
	  } catch (error) {
	  }
	  
	
	if (!pageData) {
		return notFound()
	  }
	const hero = pageData?.hero;
	const layout = pageData?.layout;
  return (
// 	<React.Fragment>
// 	<Hero {...hero} />	
// 	<Blocks blocks={layout} />

//   </React.Fragment>
 <PageClient page={pageData} />

  );
};

export default SubCategoryPage;