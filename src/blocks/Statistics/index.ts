//stat data number, title, richtext editor

import type { Block, Field } from 'payload'

import { backgroundColor } from '../../fields/backgroundColor'

export const statFields: Field[] = [
  {
    type: 'row',
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
    ],
  },
  { name: 'richText', label: 'Description', type: 'richText' },
]

export const Statistics: Block = {
  slug: 'statistics',
  imageURL: '/assets/thumbnails/statistics-block.png',
  fields: [
    {
      type: 'row',
      fields: [
        backgroundColor({ overrides: { admin: { width: '50' } } }),
        {
          name: 'layoutWidth',
          type: 'select',
          label: 'Layout Width',
          defaultValue: 'contained',
          options: [
            {
              value: 'full',
              label: 'Full Width',
            },
            {
              value: 'contained',
              label: 'Contained',
            },
            {
              value: 'narrow',
              label: 'Narrow',
            },
          ],
        },
      ],
    },
    {
      name: 'statistics',
      type: 'array',
      fields: statFields,
      maxRows: 8,
    },
    {
      name: 'source',
      type: 'text',
      label: 'Source',
    },
  ],
}
