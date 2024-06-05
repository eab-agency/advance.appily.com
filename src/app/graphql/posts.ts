import {
	CALLOUTSECTION,
	CALL_TO_ACTION,
	CAROUSELCARD,
	FORM_BLOCK,
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

export const POSTS = `
  query {
    Posts (limit: 300){
      docs {
        slug
        title
        id
        createdAt
        publishedDate
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
`

export const POST = `
  query Post($slug: String!) {
    Posts(where: { slug: { equals: $slug } }) {
      docs {
        id
        title
        hero {
          type
          richText
          links {
            link ${LINK_FIELDS()}
          }
          title
          ${MEDIA}
          ${ANIMATION}
        }
        layout {
          ${CALL_TO_ACTION}
          ${SECTION}
          ${FORM_BLOCK}
          ${MEDIA_BLOCK}
          ${STATISTICS}
          ${TESTIMONIAL}
          ${HIGHLIGHTEDCTA}
          ${CALLOUTSECTION}
          ${TABSECTION}
          ${CAROUSELCARD}
        }
      }
    }
  }
`;