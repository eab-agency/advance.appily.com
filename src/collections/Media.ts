import path from 'path'
import type { CollectionConfig } from 'payload'
import { fileURLToPath } from 'url'

     const filename = fileURLToPath(import.meta.url)
     const dirname = path.dirname(filename)
export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
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
