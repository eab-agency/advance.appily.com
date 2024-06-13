const CAROUSELQUERY = `
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
  `;

export const CAROUSELCARDSNOTIN = `
query CarouselCardsNotIn($state: [JOSN] $lead: [JSON]) {
  CarouselCards(limit: 4, where: {partnerState: { not_in: $state }, leadTypes: {in: $lead} } ) {
    ${CAROUSELQUERY}
}
`;

export const ALLCAROUSELCARDS = `
 query CarouselCards {
  CarouselCards(limit: 5) {
    ${CAROUSELQUERY}
}
`;

export const CAROUSELCARDS = `
 query CarouselCards($state: [String], $lead: [String]) {
  CarouselCards(limit: 5, where: {partnerState: { in: $state }, leadTypes: {in: $lead} } ) {
    ${CAROUSELQUERY}
}
`;
