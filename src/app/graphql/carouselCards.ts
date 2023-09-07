export const CAROUSELCARDSNOTIN = `
query CarouselCards($state: [String]) {
  CarouselCards(where: {partnerState: { not_in: $state } } ) {
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
`

export const CAROUSELCARDS = `
query CarouselCards($state: [String]) {
  CarouselCards(where: {partnerState: { in: $state } } ) {
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
`
