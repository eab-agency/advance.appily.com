import type { Block } from 'payload'

export const GlobalBlocks: Block = {
  slug: 'globalBlock',
  labels: {
    singular: 'Global Block',
    plural: 'Global Blocks',
  },
  imageURL: '/assets/thumbnails/globals-block.png',
  fields: [
    {
      name: 'globalBlocks',
      type: 'relationship',
      relationTo: 'blocks',
      hasMany: false,
    },
  ],
}
