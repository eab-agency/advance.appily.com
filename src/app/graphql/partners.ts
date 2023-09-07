
export const PARTNERS = `
  query Partners {
     CarouselCards {
    docs {
      id
      title
      partner {
        ... on Partner {
          partner {
            shortName
            acroynm
            region
            contact {
              state
            }
          }
        }
      }
    }
  }
  }
`
