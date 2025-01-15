//stat data number, title, richtext editor

import type { Block } from 'payload'

import { backgroundColor } from '../../fields/backgroundColor'
import linkGroup from '../../fields/linkGroup'

export const CalloutSection: Block = {
  slug: 'callout',
  imageURL: '/assets/thumbnails/callout-section-block.png',
  fields: [
    backgroundColor({ overrides: { name: 'callOutBackgroundColor' } }),
    {
      type: 'row',
      fields: [
        {
          name: 'kicker',
          label: 'Kicker - Pretitle',
          type: 'text',
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'richText',
      label: 'Description',
      type: 'richText',
      required: false,
    },
    linkGroup({
      overrides: {
        name: 'calloutLinks',
      },
      appearances: ['default', 'primary', 'secondary', 'tertiary'],
    }),
  ],
}
