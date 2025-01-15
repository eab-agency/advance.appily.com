import type { Block } from 'payload'

export const SingleStatBlock: Block = {
  labels: {
    singular: 'Stat Card',
    plural: 'Stat Cards',
  },
  imageURL: '/assets/thumbnails/stat-card.png',
  slug: 'stats',
  fields: [
    {
      name: 'number',
      label: 'Number',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'richText',
      label: 'Description',
      type: 'richText',
    },
  ],
}
