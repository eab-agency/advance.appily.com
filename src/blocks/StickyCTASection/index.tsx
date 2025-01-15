import type { Block } from 'payload'

import { backgroundColor } from '../../fields/backgroundColor'
import linkGroup from '../../fields/linkGroup'

export const StickyCTA: Block = {
  slug: 'stickyCTA',
  labels: {
    singular: 'Sticky CTA',
    plural: 'Sticky CTAs',
  },
  imageURL: '/assets/thumbnails/sticky-cta-block.png',
  fields: [
    backgroundColor({ overrides: { name: 'stickyCTABackgroundColor' } }),
    {
      name: 'resultPage',
      type: 'checkbox',
      label: 'Result Page',
      defaultValue: false,
      admin: {
        description: 'Check this if this page is a result page.',
        style: {
          display: 'flex',
          flexDirection: 'column-reverse',
        },
      },
    },
    linkGroup({
      overrides: {
        name: 'stickyctaLinks',
        maxRows: 1,
      },
      appearances: ['default', 'primary', 'secondary'],
    }),
  ],
}
