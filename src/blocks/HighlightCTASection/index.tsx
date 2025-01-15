import type { Block } from 'payload'

import { backgroundColor } from '../../fields/backgroundColor'
import linkGroup from '../../fields/linkGroup'

export const HighlightCTA: Block = {
  labels: {
    singular: 'Highlight Section',
    plural: 'Highlight CTAs',
  },
  slug: 'highlightCTA',
  imageURL: '/assets/thumbnails/highlight-section-block.png',
  fields: [
    {
      type: 'row',
      fields: [
        backgroundColor({
          overrides: {
            name: 'highlightCtaBackgroundColor',
          },
        }),
        {
          name: 'imageAlignment',
          type: 'select',
          label: 'Image Alignment',
          defaultValue: 'left',
          options: [
            {
              label: 'Left',
              value: 'left',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'richText',
      label: 'Section Content',
      type: 'richText',
      required: false,
    },
    linkGroup({
      overrides: {
        label: 'Highlighted CTAs and Links',
        name: 'highlightedSectionCTALinks',
      },
      appearances: ['default', 'primary', 'secondary', 'tertiary'],
    }),
  ],
}
