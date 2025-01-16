import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    imageSizes: [
      {
        name: 'squareSmall',
        width: 280,
        height: 280,
        position: 'centre',
      },
      {
        name: 'squareMedium',
        width: 320,
        height: 320,
        position: 'centre',
      },
    ],
    adminThumbnail: 'squareSmall',
    // mimeTypes: ["image/*"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
    },
  ],
}
