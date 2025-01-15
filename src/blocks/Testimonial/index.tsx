//stat data number, title, richtext editor

import type { Block } from 'payload'

import { backgroundColor } from '../../fields/backgroundColor'
import linkGroup from '../../fields/linkGroup'

export const Testimonial: Block = {
  slug: 'testimonial',
  imageURL: '/assets/thumbnails/testimonial-section-block.png',
  fields: [
    {
      type: 'row',
      fields: [
        backgroundColor({}),
        {
          name: 'alignment',
          type: 'select',
          label: 'Content Alignment',
          defaultValue: 'center',
          options: [
            {
              label: 'Left',
              value: 'left',
            },
            {
              label: 'Center',
              value: 'center',
            },
            {
              label: 'Right',
              value: 'right',
            },
          ],
        },
      ],
    },
    {
      name: 'richText',
      label: 'Description',
      type: 'richText',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'author',
          label: 'Author',
          type: 'text',
        },
        {
          name: 'authortitle',
          label: 'Author Title',
          type: 'text',
        },
      ],
    },
    linkGroup({
      appearances: ['default', 'primary', 'secondary'],
    }),
  ],
}
