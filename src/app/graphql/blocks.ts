import { FORM_FIELDS } from './form'
import { LINK_FIELDS } from './link'
import { MEDIA, MEDIA_FIELDS } from './media'
import { META } from './meta'

export const CALL_TO_ACTION = `
...on Cta {
  blockType
  ctaBackgroundColor
  richText
  links {
    link ${LINK_FIELDS()}
  }
}
`

export const PARTNER = `
...on Partner {
  partner {
    shortName
    acroynm
    region
    contact {
      state
    }
  }
}
`



export const MEDIA_BLOCK = `
...on MediaBlock {
  blockType
  mediaBlockBackgroundColor
  position
  ${MEDIA}
}
`

export const ARCHIVE_BLOCK = `
...on Archive {
  blockType
  introContent
  populateBy
  relationTo
  limit
  selectedDocs {
    relationTo
    value {
      ...on Page {
        id
        slug
        title
        publishedDate
      }
      ...on Post {
        id
        slug
        title
        publishedDate
      }
    }
  }
  populatedDocs {
    relationTo
    value {
      ...on Page {
        id
        slug
        title
        publishedDate
        ${META}
      }
      ...on Post {
        id
        slug
        title
        publishedDate
        ${META}
      }
    }
  }
  populatedDocsTotal
}
`

export const FORM_BLOCK = `
...on FormBlock {
  blockType
  enableIntro
  form ${FORM_FIELDS}
}
`

export const STATISTICS = `
...on Statistics {
  blockType
  statistics {
    number
    title
    richText
  }
}
`
export const TESTIMONIAL = `
...on Testimonial {
  blockType
  author
  authortitle
  richText
  alignment
}
`
export const ACCORDIONBLOCK =`
...on Accordion {
  blockType
  numberedItems
  accordions {
    title
    richText
    links {
      link ${LINK_FIELDS()}
    }
  }
}
`
export const CAREERBLOCK = `
...on Career {
  blockType
  colorSchema
  title
  image {
    ${MEDIA_FIELDS}
  }
  links {
    link ${LINK_FIELDS()}
  }
}
`
export const BUTTONGROUPBLOCK = `
...on ButtonGroup {
  blockType
  buttongroupLinks: links {
    link ${LINK_FIELDS()}
  }
}
`
export const RICHTEXTBLOCK = `
...on RichText {
  blockType
  richText
}
`
export const COMPARISONBLOCK = `
...on Comparison {
  blockType
  title
  richText
  icon {
    ${MEDIA_FIELDS}
  }
  comparisonLinks: links {
    link ${LINK_FIELDS()}
  }
}`

export const CONTENT = `
...on Content {
  blockType
  colorSchema
  enableHighlight
  rows{
    columns{
      size
      blocks {
        ${STATISTICS}
        ${TESTIMONIAL}
        ${ACCORDIONBLOCK}
        ${CAREERBLOCK}
        ${BUTTONGROUPBLOCK}
        ${RICHTEXTBLOCK}
        ${COMPARISONBLOCK}
        ${MEDIA_BLOCK}
      }
    }
  }
  columns{
    size
    blocks {
      ${STATISTICS}
      ${TESTIMONIAL}
      ${ACCORDIONBLOCK}
      ${CAREERBLOCK}
      ${BUTTONGROUPBLOCK}
      ${RICHTEXTBLOCK}
      ${COMPARISONBLOCK}
      ${MEDIA_BLOCK}
    }
  }
}
`