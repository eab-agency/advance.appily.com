import { fetchPage, fetchPages } from '@/app/graphql';
import { Blocks } from '@/components/Block';
import { notFound } from 'next/navigation';
import React from 'react';
import { Page } from '../../../../payload-types'
import { Hero } from '../../../blocks/HeroBlock';

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

  const CategoryPage = async({ params, searchParams }: any) => {
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
	const {hero , layout} = pageData;
  return (
    <React.Fragment>
      <Hero {...hero} />
      <Blocks blocks={layout} />
    </React.Fragment>
  );
};

export default CategoryPage;
