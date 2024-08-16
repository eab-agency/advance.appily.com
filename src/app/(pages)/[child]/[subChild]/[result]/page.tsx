import { fetchPage, fetchPages } from '@/app/graphql';
import { Blocks } from '@/components/Block';
import { notFound } from 'next/navigation';
import React from 'react';
import { Page } from '../../../../../../payload-types';
import { Hero } from '../../../../../blocks/HeroBlock';

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

// export async function generateMetadata({ params }: { params: { child: string; subChild: string, result: string } }): Promise<Metadata> {
// 	const { isEnabled: isDraftMode } = draftMode();
// 	const { child, subChild, result } = params;

// 	const slug = [child, subChild, result].filter(Boolean);
// 	let page: Page | null = null;

// 	try {
// 		page = await fetchPage(slug);
// 	} catch (error) {
// 		console.error('Error fetching page data:', error);
// 	}
// 	if (page) {
// 		return generateMeta({ doc: page });
// 	} else {
// 		return {
// 			title: 'Default Title',
// 			description: 'Default Description',
// 		};
// 	}
// }


const SubCategoryPage = async ({ params, searchParams }: any) => {
	const { child, subChild, result } = params;
	let pageData: Page | null = null
	const slug = [child, subChild, result].filter(Boolean);
	try {
		pageData = await fetchPage(slug);
	} catch (error) {
	}


	if (!pageData) {
		return notFound()
	}
	const hero = pageData?.hero;
	const layout = pageData?.layout;

	const addIdToTabSections = (blocks) => {
		console.log(blocks, 'blocks**')
		let idCounter = 1;
		return blocks?.map(block => {
			if (block.blockType === 'tabsection') {
				return {
					...block,
					id: `${idCounter++}`
				}
			}
			return block;
		});
	};

	const updatedBlocks = addIdToTabSections(layout);
	return (
		<React.Fragment>
			<Hero {...hero} />
			<Blocks blocks={updatedBlocks} />
		</React.Fragment>

	);
};

export default SubCategoryPage;