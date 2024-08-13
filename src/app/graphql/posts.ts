
import { MEDIA_FIELDS } from "./media";
import { META } from "./meta";

export const POST_DATA = `
        slug
        id
        title
        updatedAt
        publishedDate
        postFeaturedImage {
          ${MEDIA_FIELDS}
        }
        richText
        createdBy {
          id
          name
          roles
          email
          bio
          userImage {
            mimeType
            url
            filename
            filesize
            alt
            sizes{
              squareSmall{
                width
                height
                url
              }
              squareMedium{
                width
                height
                url
              }
            }
          }
        }
        category{
          id
          title
        }
        ${META}

`

export const POSTS = `
  query {
    Posts (limit: 300){
      docs {
        slug
        title
        id
        richText
        createdAt
        publishedDate
        updatedAt
        createdBy {
          id
          name
          roles
          email
          bio
          userImage {
            mimeType
            url
            filename
            filesize
            alt
            sizes{
              squareSmall{
                width
                height
                url
              }
              squareMedium{
                width
                height
                url
              }
            }
          }
        }
        category {
          title
          id
        }
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
`;

export const POST = `
  query Post($slug: String!) {
    Posts(where: { slug: { equals: $slug } }) {
      docs {
        id
        title
        updatedAt
        publishedDate
        postFeaturedImage {
          ${MEDIA_FIELDS}
        }
        richText
        createdBy {
          id
          name
          roles
          email
          bio
          createdAt
          userImage {
            mimeType
            url
            filename
            filesize
            alt
            sizes{
              squareSmall{
                width
                height
                url
              }
              squareMedium{
                width
                height
                url
              }
            }
          }
        }
        category{
          id
          title
        }
        ${META}
      }
    }
  }
`;


export const FIRSTFIVEPOSTS = `
 query  {
  Posts (limit: 5){
    docs {
      ${POST_DATA}
    }
  }
}
`;

export const GET_CATEGORY_ID = `
query Categories ($categoryTitle: [String]) {
  Categories (where: {title: {in: $categoryTitle}}) {
    docs {
      id
      title
    }
  }
}
`;

export const POSTS_BY_CATEGORY = `
query Posts ($category : JSON) {
  Posts(where: {category: {equals : $category}}) {
    docs {
      ${POST_DATA}
    }
  }
}
`;

export const POST_BY_TAG =  `
query Posts ($tag : JSON) {
  Posts(where: {tag: {equals : $tag}}) {
    docs {
      ${POST_DATA}
    }
  }
}
`;
