import { CALL_TO_ACTION, SECTION, FORM_BLOCK, MEDIA_BLOCK, STATISTICS,TESTIMONIAL, HIGHLIGHTEDCTA, CALLOUTSECTION, TABSECTION, CAROUSELCARD } from './blocks'
import { LINK_FIELDS } from './link'
import { MEDIA , ANIMATION} from './media'
import { META } from './meta'

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
`

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
          ${FORM_BLOCK}
          ${MEDIA_BLOCK}
          ${STATISTICS}
          ${TESTIMONIAL}
          ${HIGHLIGHTEDCTA}
          ${CALLOUTSECTION}
          ${TABSECTION}
          ${CAROUSELCARD}
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
`
