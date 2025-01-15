import type { Block } from 'payload'

import linkGroup from '../../fields/linkGroup'

// Note Komal: everywhere were we are using this component with the name of comparison, we should change it to iconCard
export const ComparisonBlock: Block = {
  labels: {
    singular: 'Icon Card',
    plural: 'Icon Cards',
  },
  imageURL: '/assets/thumbnails/icon-card.png',
  slug: 'comparison',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'icon',
      label: 'Light Mode Icon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'darkicon',
      label: 'Dark Mode Icon',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'richText', label: 'Description', type: 'richText' },
    linkGroup({
      appearances: ['primary', 'secondary', 'tertiary', 'default'],
    }),
  ],
}
