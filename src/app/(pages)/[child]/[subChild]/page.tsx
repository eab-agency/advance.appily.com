import React from 'react';
import { notFound } from 'next/navigation';
import {  fetchPages, fetchPage } from '@/app/graphql';
import { Page } from '../../../../../payload-types'
import { Hero } from '../../../../blocks/HeroBlock';
import { Blocks } from '@/components/Block';
import { PageClient } from './page.client'

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