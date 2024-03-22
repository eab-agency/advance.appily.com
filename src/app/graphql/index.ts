import type { CarouselCard, Page, Post } from "../../../payload-types";
import {
	ALLCAROUSELCARDS,
	CAROUSELCARDS,
	CAROUSELCARDSNOTIN,
} from "./carouselCards";
import { GLOBALS } from "./globals";
import { PAGE, PAGES } from "./pages";
import { POST, POSTS } from "./posts";

const next: { revalidate: false } = {
	revalidate: false,
};

// fetch all the lead types and their ids
export const fetchLeadTypes = async (): Promise<
	{
		id: string;
		title: string;
	}[]
> => {
	const { data } = await fetch(
		`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?lead-types`,
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
		},
	).then(res => res.json());

	return data?.LeadTypes?.docs;
};

export const fetchCarouselCards = async (): Promise<CarouselCard[]> => {
	const { data } = await fetch(
		`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?carousel-cards`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			next,
			body: JSON.stringify({
				query: ALLCAROUSELCARDS,
			}),
		},
	).then(res => res.json());

	return data?.CarouselCards?.docs;
};

export const fetchCarouselCardsByStateAndLeadType = async (
	incomingLocations?: string[],
	leadTypeId?: string,
): Promise<CarouselCard[]> => {
	// console.log("🟡🟡🟡🟡 ~ file: index.ts:45 ~ leadTypeId:", leadTypeId);

	if (leadTypeId) {
		const { data } = await fetch(
			`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?carousel-cards`,
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
		).then(res => res.json());

		return data?.CarouselCards?.docs;
	}
};

export const fetchReaminingCarouselCards = async (
	incomingLocationsToFilterOut?: string[],
	leadType?: string,
): Promise<CarouselCard[]> => {
	const { data } = await fetch(
		`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?carousel-cards`,
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
					lead: [leadType] || ["Business"],
				},
			}),
		},
	).then(res => res.json());
	return data?.CarouselCards?.docs;
};

// export const fetchGlobals = async (): Promise<{
//   header: Header
//   footer: Footer
// }> => {
//   const { data } = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?globals`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     next,
//     body: JSON.stringify({
//       query: GLOBALS,
//     }),
//   }).then(res => res.json())

//   return {
//     header: data.Header,
//     footer: data.Footer,
//   }
// }

export const fetchPages = async (): Promise<
	Array<{ breadcrumbs: Page["breadcrumbs"]; slug: string }>
> => {
	const { data, errors } = await fetch(
		`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?pages`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			cache: "no-store",
			body: JSON.stringify({
				query: PAGES,
			}),
		},
	).then(res => res.json());

	if (errors) {
		console.error(JSON.stringify(errors)); // eslint-disable-line no-console
		throw new Error();
	}

	return data.Pages.docs;
};

export const fetchPage = async (
	incomingSlugSegments?: string[],
): Promise<Page | null> => {
	const slugSegments = incomingSlugSegments || ["home"];
	const slug = slugSegments.at(-1);
	const { data, errors } = await fetch(
		`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?page=${slug}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			cache: "no-store",
			body: JSON.stringify({
				query: PAGE,
				variables: {
					slug,
				},
			}),
		},
	).then(res => res.json());

	if (errors) {
		console.error(JSON.stringify(errors)); // eslint-disable-line no-console
		throw new Error();
	}

	const pagePath = `/${slugSegments.join("/")}`;

	const page = data.Pages?.docs.find(({ breadcrumbs }: Page) => {
		if (!breadcrumbs) return false;
		const { url } = breadcrumbs[breadcrumbs.length - 1];
		return url === pagePath;
	});

	if (page) {
		return page;
	}

	return null;
};

// export const fetchPosts = async (): Promise<Post[]> => {
// 	const currentDate = new Date();
// 	const { data } = await fetch(
// 		`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?posts`,
// 		{
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			next,
// 			body: JSON.stringify({
// 				query: POSTS,
// 				variables: {
// 					publishedOn: currentDate,
// 				},
// 			}),
// 		},
// 	).then(res => res.json());

// 	return data?.Posts?.docs;
// };

// export const fetchPost = async (slug: string): Promise<Post> => {
// 	const { data } = await fetch(
// 		`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?post=${slug}`,
// 		{
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			next,
// 			body: JSON.stringify({
// 				query: POST,
// 				variables: {
// 					slug,
// 				},
// 			}),
// 		},
// 	).then(res => res.json());

// 	return data?.Posts?.docs[0];
// };
