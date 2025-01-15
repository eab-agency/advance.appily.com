//stat data number, title, richtext editor

import type { Block } from 'payload'

import linkGroup from '../../fields/linkGroup'

export const ButtonGroupBlock: Block = {
  slug: 'ButtonGroup',
  imageURL: '/assets/thumbnails/button-group-block.png',
  fields: [
    linkGroup({
      appearances: ['default', 'primary', 'secondary', 'tertiary'],
    }),
  ],
}
