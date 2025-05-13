import type { CarouselCard, Category, Footer, Header, Page, Post, Tag } from "../../../payload-types";
import { safeFetch } from '../../utilities/security';
import {
  ALLCAROUSELCARDS,
  CAROUSELCARDS,
  CAROUSELCARDSNOTIN,
} from "./carouselCards";
import { ALLCATEGORIES } from "./categories";
import { FOOTER_QUERY, GLOBALS, HEADER_QUERY } from "./globals";
import { PAGE, PAGES } from "./pages";
import { FIRSTFIVEPOSTS, GET_CATEGORY_ID, POST, POSTS, POSTS_BY_CATEGORY, POST_BY_TAG, POST_SLUGS } from "./posts";

const next: { revalidate: number | false | undefined } = {
	revalidate: 5,
};


// fetch all the lead types and their ids
export const fetchLeadTypes = async (): Promise<
	{
		id: string;
		title: string;
	}[]
> => {
	const response = await safeFetch(
		process.env.NEXT_PUBLIC_CMS_URL,
		'/api/graphql?lead-types',
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			next,
			body: JSON.stringify({
				query: `
					query LeadTypes {
						LeadTypes {
							docs {
								id
								title
							}
						}
					}
				`,
			}),
		}
	);

	const { data } = await response.json();
	return data?.LeadTypes?.docs;
};

export const fetchCarouselCards = async (): Promise<CarouselCard[]> => {
	const response = await safeFetch(
		process.env.NEXT_PUBLIC_CMS_URL,
		'/api/graphql?carousel-cards',
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			next,
			body: JSON.stringify({
				query: ALLCAROUSELCARDS,
			}),
		}
	);

	const { data } = await response.json();
	return data?.CarouselCards?.docs;
};

export const fetchCarouselCardsByStateAndLeadType = async (
	incomingLocations?: string[],
	leadTypeId?: string,
): Promise<CarouselCard[] | undefined> => {

	if (leadTypeId) {
		const response = await safeFetch(
			process.env.NEXT_PUBLIC_CMS_URL,
			`/api/graphql?carousel-cards`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				next,
				body: JSON.stringify({
					query: CAROUSELCARDS,
					variables: {
						state: incomingLocations,
						lead: [leadTypeId],
					},
				}),
			},
		);

		const { data } = await response.json();
		return data?.CarouselCards?.docs;
	}

	return undefined;
};

export const fetchReaminingCarouselCards = async (
	incomingLocationsToFilterOut?: string[],
	leadType?: string,
): Promise<CarouselCard[]> => {
	const response = await safeFetch(
		process.env.NEXT_PUBLIC_CMS_URL,
		`/api/graphql?carousel-cards`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			next,
			body: JSON.stringify({
				query: CAROUSELCARDSNOTIN,
				variables: {
					state: incomingLocationsToFilterOut,
					lead: leadType ? [leadType] : ["Business"],
				},
			}),
		},
	);

	const { data } = await response.json();
	return data?.CarouselCards?.docs;
};

export async function fetchHeader(): Promise<Header> {
	const response = await safeFetch(
		process.env.NEXT_PUBLIC_CMS_URL,
		`/api/graphql`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			next: { revalidate: 10 },
			body: JSON.stringify({
				query: HEADER_QUERY,
			}),
		}
	);

	const { data, errors } = await response.json();
	if (errors) throw new Error(errors[0]?.message || 'Error fetching header');
	return data?.Header;
}

export async function fetchFooter(): Promise<Footer> {
	const response = await safeFetch(
		process.env.NEXT_PUBLIC_CMS_URL,
		`/api/graphql`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			next: { revalidate: 10 },
			body: JSON.stringify({
				query: FOOTER_QUERY,
			}),
		}
	);

	const { data, errors } = await response.json();
	if (errors) throw new Error(errors[0]?.message || 'Error fetching footer');
	return data?.Footer;
}

export const fetchGlobals = async (): Promise<{
	header: Header;
	footer: Footer;
  }> => {
	const response = await safeFetch(
		process.env.NEXT_PUBLIC_CMS_URL,
		`/api/graphql?globals`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				query: GLOBALS,
			}),
		}
	);

	const { data, errors } = await response.json();
	if (errors) throw new Error(errors[0]?.message || 'Error fetching global data');
	return {
		header: data?.Header,
		footer: data?.Footer,
	};
};


export const fetchPages = async (): Promise<
	Array<{ breadcrumbs: Page["breadcrumbs"]; slug: string, fullPath: string, updatedAt: string }>
> => {
	const response = await safeFetch(
		process.env.NEXT_PUBLIC_CMS_URL,
		`/api/graphql?pages`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			next,
			body: JSON.stringify({
				query: PAGES,
			}),
		}
	);

	const { data, errors } = await response.json();
	if (errors) throw new Error(errors[0]?.message || 'Error fetching pages');
	return data.Pages.docs;
};

export const fetchPage = async (
	incomingSlugSegments?: string[],
): Promise<Page | null> => {
	const slugSegments = incomingSlugSegments || ["index"];
	const slug = slugSegments.at(-1);

	try {
		const response = await safeFetch(
			process.env.NEXT_PUBLIC_CMS_URL,
			`/api/graphql?page=${slug}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				next: { revalidate: 10 },
				body: JSON.stringify({
					query: PAGE,
					variables: {
						slug,
					},
				}),
			}
		);

		const { data, errors } = await response.json();
		if (errors) throw new Error(errors[0]?.message || 'Error fetching page');

		const pagePath = `/${slugSegments.join("/")}`;
		return data.Pages?.docs.find(({ breadcrumbs }: Page) => {
			if (!breadcrumbs) return false;
			const { url } = breadcrumbs[breadcrumbs.length - 1];
			return url === pagePath;
		}) || null;
	} catch (error) {
		console.error('Error in fetchPage:', error);
		return null;
	}
}

export const fetchPostSlugs = async (): Promise<{ slug: string }[]> => {
	try {
		const response = await safeFetch(
			process.env.NEXT_PUBLIC_CMS_URL,
			`/api/graphql?posts`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query: POST_SLUGS,
					variables: {}, // No variables are needed for this query
				}),
			}
		);

		const { data, errors } = await response.json();
		if (errors) throw new Error(errors[0]?.message || 'Error fetching post slugs');
		return data?.Posts?.docs || []; // Return an empty array if no data is found
	} catch (error) {
		console.error("Error fetching post slugs:", error);
		return [];
	}
};

export const fetchPosts = async (): Promise<Post[]> => {
	const currentDate = new Date();
	const response = await safeFetch(
		process.env.NEXT_PUBLIC_CMS_URL,
		`/api/graphql?posts`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			next,
			body: JSON.stringify({
				query: POSTS,
				variables: {
					publishedOn: currentDate,
					status: "published"
				},
			}),
		}
	);

	const { data, errors } = await response.json();
	if (errors) throw new Error(errors[0]?.message || 'Error fetching posts');
	return data?.Posts?.docs;
};

export const fetchPost = async (slug: string): Promise<Post> => {
	const response = await safeFetch(
		process.env.NEXT_PUBLIC_CMS_URL,
		`/api/graphql?post=${slug}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			next,
			body: JSON.stringify({
				query: POST,
				variables: {
					slug,
				},
			}),
		}
	);

	const { data, errors } = await response.json();
	if (errors) throw new Error(errors[0]?.message || 'Error fetching post');
	return data?.Posts?.docs[0];
};

export const fetchFirstFivePosts = async (): Promise<Post[]> => {
	const currentDate = new Date();
	const response = await safeFetch(
		process.env.NEXT_PUBLIC_CMS_URL,
		`/api/graphql?posts`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			next,
			body: JSON.stringify({
				query: FIRSTFIVEPOSTS,
				variables: {
					publishedOn: currentDate,
					status: "published"
				},
			}),
		}
	);

	const { data, errors } = await response.json();
	if (errors) throw new Error(errors[0]?.message || 'Error fetching first five posts');
	return data?.Posts?.docs;
};

export const fetchAllCategories = async (): Promise<Category[]> => {
	const response = await safeFetch(
		process.env.NEXT_PUBLIC_CMS_URL,
		`/api/graphql?categories`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			next,
			body: JSON.stringify({
				query: ALLCATEGORIES,
			}),
		}
	);

	const { data, errors } = await response.json();
	if (errors) throw new Error(errors[0]?.message || 'Error fetching categories');
	return data?.Categories?.docs;
};

export const fetchCategoryIDByTitle = async (
	categorySlug?: Category['slug'],
): Promise<Post[]> => {
	const response = await safeFetch(
		process.env.NEXT_PUBLIC_CMS_URL,
		`/api/graphql?category=${categorySlug}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: GET_CATEGORY_ID,
				variables: {
					categorySlug,
				},
			}),
		},
	);

	const { data } = await response.json();
	return data?.Categories?.docs;
};

export const fetchPostsByCategory = async (
	category?: Category['id'],
): Promise<Post[]> => {
	const response = await safeFetch(
		process.env.NEXT_PUBLIC_CMS_URL,
		`/api/graphql?posts`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: POSTS_BY_CATEGORY,
				variables: {
					category,
					status: 'published'
				},
			}),
		},
	);

	const { data, errors } = await response.json();
	if (errors) throw new Error(errors[0]?.message || 'Error fetching posts by category');
	return data?.Posts?.docs;
};

export const fetchPostsByTag = async (
	tag?: Tag['id'],
): Promise<Post[]> => {
	const response = await safeFetch(
		process.env.NEXT_PUBLIC_CMS_URL,
		`/api/graphql?posts`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: POST_BY_TAG,
				variables: {
					tag,
				},
			}),
		},
	);

	const { data, errors } = await response.json();
	if (errors) throw new Error(errors[0]?.message || 'Error fetching posts by tag');
	return data?.Posts?.docs;
};
