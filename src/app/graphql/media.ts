export const MEDIA_FIELDS = `
mimeType
filename
width
height
alt
caption
url
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
`;

export const MEDIA = `media {
  ${MEDIA_FIELDS}
}`;

export const ANIMATION_FIELDS = `
mimeType
filename
width
height
alt
url
`;

export const ANIMATION = `animation {
  ${ANIMATION_FIELDS}
}`;
