import React from 'react';
import { notFound } from 'next/navigation';
import {  fetchPages, fetchPage } from '@/app/graphql';
import { Page } from '../../../../../payload-types'
// import  {Hero } from '../../../blocks/HeroBlock';

export async function generateStaticParams() {
	const pages = await fetchPages();
  
	const a = pages.map(({ breadcrumbs }) => {
	  const slug = breadcrumbs?.[breadcrumbs.length - 1]?.url?.replace(/^\/|\/$/g, '').split('/');
	  return {
		params: {
			slug
		}
	  };
	});
	return a;
  }
  
  const SubCategoryPage = async({ params, searchParams }: any) => {
	const { category, subCategory } = params; 
	let pageData: Page | null = null
    const slug = [category, subCategory].filter(Boolean);
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
	{/* <Hero {...hero} />	 */}
  </React.Fragment>
  );
};

export default SubCategoryPage;