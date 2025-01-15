import NotFound from '@/app/(app)/not-found';
import configPromise from '@payload-config';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import { cache } from 'react';
import { Page } from '../../../../../payload-types';
import { PageClient } from './page.client';

export async function generateStaticParams() {
	// const pages = await fetchPages();
	// console.log(pages, 'pages**')
	// const paramsVal = pages.map(({ breadcrumbs }) => {
	// 	const slug = breadcrumbs?.[breadcrumbs.length - 1]?.url?.replace(/^\/|\/$/g, '').split('/');
	// 	return {
	// 		params: {
	// 			slug
	// 		}
	// 	};
	// });
	// return paramsVal;
	const payload = await getPayload({ config: configPromise })
	const pages = await payload.find({
		collection: 'pages',
		draft: false,
		limit: 1000,
		overrideAccess: false,
		pagination: false,
		select: {
			slug: true,
			breadcrumbs: true
		},
	})
	const params = pages?.docs?.map(({ breadcrumbs }) => {
		const slug = breadcrumbs?.[breadcrumbs.length - 1]?.url?.replace(/^\/|\/$/g, '').split('/');
		return {
			params: {
				slug
			}
		};
	});
	console.log()
	return params;
}

// export async function generateMetadata({ params }: { params: { child: string; subChild: string } }): Promise<Metadata> {
// 	const { child, subChild } = await params;

// 	const slug = [child, subChild].filter(Boolean);

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

type Args = {
	params: Promise<{
		subChild?: string
	}>
}
const SubCategoryPage = async ({ params: paramsPromise }: Args) => {
	let pageData: Page | null = null;
	const { subChild = '' } = await paramsPromise
	console.log(subChild, 'sub')
	try {
		pageData = await queryPageBySlug({
			subChild,
		});
		console.log(pageData, 'pageData***')
	} catch (error) {
		console.log(error, 'err')
	}


	if (!pageData) {
		return (
			<NotFound statusCode={404} />
		)
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

const queryPageBySlug = cache(async ({ subChild }: { subChild: string }) => {
	const { isEnabled: draft } = await draftMode()

	const payload = await getPayload({ config: configPromise })

	const result = await payload.find({
		collection: 'pages',
		draft: false,
		limit: 1,
		pagination: false,
		where: {
			slug: {
				equals: subChild,
			},
		},
	})
	return result.docs?.[0] || null
})