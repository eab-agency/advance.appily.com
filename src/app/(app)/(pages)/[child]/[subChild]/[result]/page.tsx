import NotFound from '@/app/(app)/not-found';
import { generateMeta } from '@/seo/generateMeta';
import configPromise from '@payload-config';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import { cache } from 'react';
import { Page } from '../../../../../../payload-types';
import { PageClient } from './page.client';

export async function generateStaticParams() {
	// const pages = await fetchPages();

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
	return params;
}
type Args = {
	params: Promise<{
		result: string
	}>
}
export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
	const { result } = await paramsPromise
	let page: Page | null = null;

	page = await queryPageBySlug({ result })
	if (page) {
		return generateMeta({ doc: page })
	} else {
		return {
			title: "Default Title",
			description: "Default Description",
		};
	}
}

const SubCategoryPage = async ({ params: paramsPromise }: Args) => {
	let pageData: Page | null = null;
	const { result = '' } = await paramsPromise
	console.log(result, 'sub')
	try {
		pageData = await queryPageBySlug({
			result,
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

const queryPageBySlug = cache(async ({ result }: { result: string }) => {
	const { isEnabled: draft } = await draftMode();
	const payload = await getPayload({ config: configPromise });

	if (!result) {
		throw new Error('Slug is undefined or empty');
	}

	try {
		const data = await payload.find({
			collection: 'pages',
			draft,
			limit: 1,
			pagination: false,
			overrideAccess: draft,
			where: {
				slug: {
					equals: result,
				},
			},
		});
		if (!data.docs?.length) {
			console.warn('No pages found for slug:', result);
			return null;
		}
		return data.docs[0];
	} catch (error) {
		console.error('Error querying Payload CMS:', error);
		throw new Error(`Failed to fetch page for slug: ${result}`);
	}
});
