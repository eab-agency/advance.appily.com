
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
          slug
        }
        ${META}

`

export const POSTS = `
  query Posts ($status: Post__status_Input) {
    Posts (limit: 300, where: {_status: {equals: $status}}){
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
          slug
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
          slug
        }
        ${META}
      }
    }
  }
`;

export const FIRSTFIVEPOSTS = `
 query Posts($status: Post__status_Input) {
  Posts (limit: 5, where: {_status: {equals: $status}}) {
    docs {
      ${POST_DATA}
    }
  }
}
`;

export const GET_CATEGORY_ID = `
query Categories ($categorySlug: String) {
  Categories (where: {slug: {equals: $categorySlug}}) {
    docs {
      id
      title
      slug
    }
  }
}
`;

export const POSTS_BY_CATEGORY = `
query Posts ($category : JSON, $status: Post__status_Input) {
  Posts(where: {category: {equals : $category}, _status: {equals: $status}}) {
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
