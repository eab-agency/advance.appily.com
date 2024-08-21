import {
  CALLOUTSECTION,
  CALL_TO_ACTION,
  CAROUSELCARD,
  GLOBAL_TOKEN,
  HIGHLIGHTEDCTA,
  MEDIA_BLOCK,
  SECTION,
  STATISTICS,
  STICKYCTASECTION,
  SUBNAVIGATION,
  TABSECTION,
  TESTIMONIAL
} from "./blocks";
import { LINK_FIELDS } from "./link";
import { ANIMATION, MEDIA } from "./media";
import { META } from "./meta";

export const PAGES = `
  query Pages {
    Pages(limit: 300)  {
      docs {
        slug
        breadcrumbs {
          url
          label
        }
      }
    }
  }
`;

export const PAGE = `
  query Page($slug: String ) {
    Pages(where: { slug: { equals: $slug} }) {
      docs {
        id
        title
        publishedDate
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
          ${MEDIA_BLOCK}
          ${STATISTICS}
          ${TESTIMONIAL}
          ${HIGHLIGHTEDCTA}
          ${CALLOUTSECTION}
          ${TABSECTION}
          ${CAROUSELCARD}
          ${SUBNAVIGATION}
          ${STICKYCTASECTION}
          ${GLOBAL_TOKEN}
        }
        ${META}
        breadcrumbs {
          url
          label
          id
        }
      }
    }
  }
`;
