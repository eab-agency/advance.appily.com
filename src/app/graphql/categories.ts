export const ALLCATEGORIES = 
`query {
    Categories (limit: 300){
      docs {
        title
        id
        slug
      }
    }
  }
`;

