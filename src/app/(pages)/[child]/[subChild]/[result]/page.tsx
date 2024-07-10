import React from 'react';
import { notFound } from 'next/navigation';
import {  fetchPages, fetchPage } from '@/app/graphql';
import { Page } from '../../../../../../payload-types'
import { Hero } from '../../../../../blocks/HeroBlock';
import { Blocks } from '@/components/Block';
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
  
  export async function generateMetadata({ params }: { params: { child: string; subChild: string, result: string } }): Promise<Metadata> {
	const { isEnabled: isDraftMode } = draftMode();
	const { child, subChild , result} = params; 
  
	const slug = [child, subChild, result].filter(Boolean);  
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
	const { child, subChild , result} = params; 
	let pageData: Page | null = null
    const slug = [child, subChild, result].filter(Boolean);
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
	<React.Fragment>
	<Hero {...hero} />	
	<Blocks blocks={layout} />

  </React.Fragment>

  );
};

export default SubCategoryPage;