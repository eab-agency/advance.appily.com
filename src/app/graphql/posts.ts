import {
	CALLOUTSECTION,
	CALL_TO_ACTION,
	CAROUSELCARD,
	HIGHLIGHTEDCTA,
	MEDIA_BLOCK,
	SECTION,
	STATISTICS,
	TABSECTION,
	TESTIMONIAL,
} from "./blocks";
import { LINK_FIELDS } from "./link";
import { ANIMATION, MEDIA } from "./media";
import { META } from "./meta";

export const POST_DATA = `
        slug
        id
        title
        updatedAt
        publishedDate
        postFeaturedImage {
          ${MEDIA}
        }
        category{
          id 
          title
        }
        layout {
          ${CALL_TO_ACTION}
          ${SECTION}
          ${MEDIA_BLOCK}
          ${STATISTICS}
          ${TESTIMONIAL}
          ${HIGHLIGHTEDCTA}
          ${CALLOUTSECTION}
          ${TABSECTION}
          ${CAROUSELCARD}
        }
        ${META}

`

export const POSTS = `
  query {
    Posts (limit: 300){
      docs {
        slug
        title
        id
        createdAt
        publishedDate
        category {
          title
          id
        }
      }
    }
  }
`;

export const POST_SLUGS = `
  query Posts {
    Posts(limit: 300) {
      docs {
        slug
      }
    }
  }
`;

export const POST = `
  query Post($slug: String!) {
    Posts(where: { slug: { equals: $slug } }) {
      docs {
        id
        title
        updatedAt
        publishedDate
        postFeaturedImage {
          ${MEDIA}
        }
        category{
          id 
          title
        }
        layout {
          ${CALL_TO_ACTION}
          ${SECTION}
          ${MEDIA_BLOCK}
          ${STATISTICS}
          ${TESTIMONIAL}
          ${HIGHLIGHTEDCTA}
          ${CALLOUTSECTION}
          ${TABSECTION}
          ${CAROUSELCARD}
        }
        ${META}
      }
    }
  }
`;


export const FIRSTFIVEPOSTS = `
 query  {
  Posts (limit: 5){
    docs {
      ${POST_DATA}
    }
  }
}
`;



export const POSTS_BY_CATEGORY = `
query Posts ($category : JSON) {
  Posts(where: {category: {equals : $category}}) {
    docs {
      ${POST_DATA}
    }
  }
}
`;

export const POST_BY_TAG =  `
query Posts ($tag : JSON) {
  Posts(where: {tag: {equals : $tag}}) {
    docs {
      ${POST_DATA}
    }
  }
}
`;
