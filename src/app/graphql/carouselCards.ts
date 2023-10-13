export const CAROUSELCARDSNOTIN = `
query CarouselCardsNotIn($state: [String] $lead: [String]) {
  CarouselCards(where: {partnerState: { not_in: $state }, leadTypes: {in: $lead} } ) {
    docs {
      id
      partnerState
      title
      description
      leadTypes {
        title
      }
      image {
        id
        alt
        url
        width
        height
        mimeType
      }
      partner {
        title
         logo {
          url
          width
          height
          alt
        }
        contact {
          city
          state
        }
      }
        links {
            link {
              newTab
              url
              label
            }
          }
    }
  }
}
`;

export const CAROUSELCARDS = `
 query CarouselCards($state: [String], $lead: [String]) {
  CarouselCards(where: {partnerState: { in: $state }, leadTypes: {in: $lead} } ) {
    docs {
      id
      partnerState
      title
      description
      leadTypes {
        title
        id
      }
      image {
        id
        alt
        url
        width
        height
        mimeType
      }
      partner {
        title
         logo {
          url
          width
          height
          alt
        }
        contact {
          city
          state
        }
      }
        links {
            link {
              newTab
              url
              label
            }
          }
    }
  }
}
`;
