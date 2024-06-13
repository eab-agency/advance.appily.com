import { FORM_FIELDS } from "./form";
import { LINK_FIELDS } from "./link";
import { MEDIA, MEDIA_FIELDS } from "./media";
import { META } from "./meta";

export const CALL_TO_ACTION = `
...on Cta {
  blockType
  ctaBackgroundColor
  richText
  links {
    link ${LINK_FIELDS()}
  }
}
`;

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
`;

export const MEDIA_BLOCK = `
...on MediaBlock {
  blockType
  cornerStyle
  enableHighlight
  ${MEDIA}
}
`;

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
`;

export const FORM_BLOCK = `
...on FormBlock {
  blockType
  enableIntro
  form ${FORM_FIELDS}
}
`;

export const STATISTICS = `
...on Statistics {
  blockType
  statsBackgroundColor: backgroundColor
  statsLayoutWidth: layoutWidth
  statistics {
    number
    title
    richText
  }
  source
}
`;

export const STATS = `
...on Stats {
  blockType
  number
    title
    richText
}
`;

export const TESTIMONIAL = `
...on Testimonial {
  blockType
  author
  authortitle
  richText
  alignment
}
`;
export const ACCORDIONBLOCK = `
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
`;

export const IMAGECARDBLOCK = `
...on ImageCard {
  blockType
  imageCardBlockBackgroundColor
  title
  richText
  image {
    ${MEDIA_FIELDS}
  }
  links {
    link ${LINK_FIELDS()}
  }
}
`;

export const HIGHLIGHTEDCTA = `
...on HighlightCTA {
  blockType
  highlightCtaBackgroundColor
  richText
  imageAlignment
  image {
    ${MEDIA_FIELDS}
  }
  highlightedSectionCTALinks {
    link ${LINK_FIELDS()}
  }
}
`;
export const CALLOUTSECTION = `
...on Callout {
  blockType
  callOutBackgroundColor
  calloutTitle
  richText
  calloutLinks {
    link ${LINK_FIELDS()}
  }
}
`;
export const TABSECTION = `
...on Tabsection {
  blockType
  tabSectionBackgroundColor
  tabs {
    tabicon {
      ${MEDIA_FIELDS}
    }
    shortTitle
    contentTitle
    description
    tabButtongroup {
      link ${LINK_FIELDS()}
    }
    useSameIcon
    alternateImage {
      ${MEDIA_FIELDS}
    }
  }
}
`;

export const BUTTONGROUPBLOCK = `
...on ButtonGroup {
  blockType
  buttongroupLinks: links {
    link ${LINK_FIELDS()}
  }
}
`;
export const RICHTEXTBLOCK = `
...on RichText {
  blockType
  richText
}
`;
export const COMPARISONBLOCK = `
...on Comparison {
  blockType
  title
  richText
  icon {
    ${MEDIA_FIELDS}
  }
  darkicon{
    ${MEDIA_FIELDS}
  }
  comparisonLinks: links {
    link ${LINK_FIELDS()}
  }
}`;

export const CAROUSELCARD = `
...on Schoolcarousel {
  blockType
  title
  richText
  carouselBackgroundColor
}`;

export const SECTION = `
...on Section {
  blockType
  type
  backgroundColor
  enableHighlight
  layoutWidth
  rows{
    columns{
      size
      halignment
      valignment
      extendToBorders
      blocks {
        ${STATS}
        ${TESTIMONIAL}
        ${ACCORDIONBLOCK}
        ${IMAGECARDBLOCK}
        ${BUTTONGROUPBLOCK}
        ${RICHTEXTBLOCK}
        ${COMPARISONBLOCK}
        ${MEDIA_BLOCK}
      }
    }
  }
  columns{
    size
    halignment
    valignment
    extendToBorders
    blocks {
      ${STATS}
      ${TESTIMONIAL}
      ${ACCORDIONBLOCK}
      ${IMAGECARDBLOCK}
      ${BUTTONGROUPBLOCK}
      ${RICHTEXTBLOCK}
      ${COMPARISONBLOCK}
      ${MEDIA_BLOCK}
    }
  }
}
`;

export const SUBNAVIGATION = `
...on SubNavigation {
  blockName
  blockType
  subNavBackgroundColor
  navigationItem{
    title
    url
    id
  }
}
`;
