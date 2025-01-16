import type { CarouselCard, Category, Footer, Header, Page, Post, Tag } from "../../../payload-types";
import {
	ALLCAROUSELCARDS,
	CAROUSELCARDS,
	CAROUSELCARDSNOTIN,
} from "./carouselCards";
import { ALLCATEGORIES } from "./categories";
import { FOOTER_QUERY, GLOBALS, HEADER_QUERY } from "./globals";
import { PAGE, PAGES } from "./pages";
import { FIRSTFIVEPOSTS, GET_CATEGORY_ID, POST, POSTS, POSTS_BY_CATEGORY, POST_BY_TAG } from "./posts";

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
	const { data } = await fetch(
		`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?lead-types`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			// next,
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
): Promise<CarouselCard[] | undefined> => {

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

	return undefined;
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
					lead: leadType ? [leadType] : ["Business"],
				},
			}),
		},
	).then(res => res.json());
	return data?.CarouselCards?.docs;
};

export async function fetchHeader(): Promise<Header> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: HEADER_QUERY,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0]?.message || 'GraphQL error fetching header');
    }

    return result.data?.Header;
  } catch (error) {
    console.error('Error fetching header:', error);
    throw error;
  }
}


  export async function fetchFooter(): Promise<Footer> {
try{
	const footer = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql`, {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  next: { revalidate: 5 },
	  body: JSON.stringify({
			query: FOOTER_QUERY,
	  }),
	})

	if (!footer.ok) {
		throw new Error(`HTTP error! Status: ${footer.status}`);
	}
	const result = await footer.json();

	if (result.errors) {
		throw new Error(result.errors[0]?.message || 'GraphQL error fetching header');
	}
	return result.data?.Footer;
}catch (error) {
	console.log(error,'err**')
	console.error('Error fetching header:', error);
	throw error;
}
	}

  

export const fetchGlobals = async (): Promise<{
	header: Header;
	footer: Footer;
  }> => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?globals`, {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
		query: GLOBALS,
	  }),
	});

	if (!response.ok) {
	  throw new Error('Failed to fetch global data');
	}

	const { data } = await response.json();

	return {
	  header: data?.Header,
	  footer: data?.Footer,
	};
  };


export const fetchPages = async (): Promise<
	Array<{ breadcrumbs: Page["breadcrumbs"]; slug: string, fullPath: string, updatedAt: string }>
> => {
	const { data, errors } = await fetch(
		`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?pages`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			next,
			// cache: "no-store",
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
	const slugSegments = incomingSlugSegments || ["index"];
	const slug = slugSegments.at(-1);
	const { data, errors } = await fetch(
		`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?page=${slug}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			// cache: "no-store",
			next,
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


export const fetchPosts = async (): Promise<Post[]> => {
	const currentDate = new Date();
   const { data } = await fetch(
	   `${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?posts`,
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
	   },
   ).then(res => res.json()).catch((err)=>{
		console.log(err,'err***')
	 });
   return data?.Posts?.docs;
};

export const fetchPost = async (slug: string): Promise<Post> => {
   const { data } = await fetch(
	   `${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?post=${slug}`,
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
	   },
   ).then(res => res.json());
   return data?.Posts?.docs[0];
};

export const fetchFirstFivePosts = async (): Promise<Post[]> => {
	const currentDate = new Date();
   const { data } = await fetch(
	   `${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?posts`,
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
	   },
   ).then(res => res.json()).catch((err)=>{
		console.log(err,'err***')
	 });
   return data?.Posts?.docs;
};


export const fetchAllCategories = async (): Promise<Category[]> => {
   const { data } = await fetch(
	   `${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?categories`,
	   {
		   method: "POST",
		   headers: {
			   "Content-Type": "application/json",
		   },
		   next,
		   body: JSON.stringify({
			   query: ALLCATEGORIES,
			   
		   }),
	   },
   ).then(res => res.json());
   return data?.Categories?.docs;
};

export const fetchCategoryIDByTitle = async (
	categorySlug?: Category['slug'],
): Promise<Post[]> => {
	const { data } = await fetch(
		`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?category=${categorySlug}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		  next,
			body: JSON.stringify({
				query: GET_CATEGORY_ID,
				variables: {
					categorySlug,
				},
			}),
		},
	
	).then(res => res.json());
	return data?.Categories?.docs;
};

export const fetchPostsByCategory = async (
	category?: Category['id'],
): Promise<Post[]> => {
	const { data } = await fetch(
		`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?posts`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			// next,
			body: JSON.stringify({
				query: POSTS_BY_CATEGORY,
				variables: {
					category, 
					status: 'published'
				},
			}),
		},
	
	).then(res => res.json());
	return data?.Posts?.docs;
};

// export const fetchAllTags = async (): Promise<Tag[]> => {
// 	const { data } = await fetch(
// 		`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?tags`,
// 		{
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			cache: "no-store",
// 			body: JSON.stringify({
// 				query: ALLTAGS,
				
// 			}),
// 		},
// 	).then(res => res.json());
// 	return data?.Tags?.docs;
//  };


 export const fetchPostsByTag = async (
	tag?: Tag['id'],
): Promise<Post[]> => {
	const { data } = await fetch(
		`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?posts`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			// next,
			body: JSON.stringify({
				query: POST_BY_TAG,
				variables: {
					tag,
				},
			}),
		},
	
	).then(res => res.json());
	return data?.Posts?.docs;
};