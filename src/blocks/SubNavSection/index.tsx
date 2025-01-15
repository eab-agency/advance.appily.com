import type { Block, Field } from 'payload'

import { backgroundColor } from '../../fields/backgroundColor'

export const buttonGroupField: Field[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    required: true,
  },
  {
    name: 'pageReference',
    label: 'Page Reference',
    type: 'relationship',
    relationTo: 'pages',
    required: true,
  },
]

// export const navigationField: Field[] = [

//   {
//     name: 'title',
//     label: 'Title',
//     type: 'text',
//     required: true
//   },

// ]
export const SubNav: Block = {
  labels: {
    singular: 'Sub Navigation',
    plural: 'Sub Navigations',
  },
  slug: 'subNavigation',
  imageURL: '/assets/thumbnails/sub-navigation-block.png',
  fields: [
    backgroundColor({ overrides: { name: 'subNavBackgroundColor' } }),
    {
      label: 'Nav Item',
      name: 'navigationItem',
      type: 'array',
      fields: buttonGroupField,
    },
  ],
}
