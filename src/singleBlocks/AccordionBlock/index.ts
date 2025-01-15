import type { Block, Field } from 'payload'

import { MediaBlock } from '../../blocks/Media'
import { ButtonGroupBlock } from '../../singleBlocks/ButtonGroupBlock'
import { RichTextBlock } from '../../singleBlocks/RichTextBlock'

const contentBlocks: Field[] = [
  {
    name: 'blocks',
    type: 'blocks',
    label: 'Content Blocks',
    required: true,
    blocks: [RichTextBlock, MediaBlock, ButtonGroupBlock],
  },
]

const AccordionFields: Field[] = [
  {
    name: 'title',
    label: 'Title',
    required: true,
    type: 'text',
  },
  ...contentBlocks,
]

export const AccordionBlock: Block = {
  slug: 'accordion',
  imageURL: '/assets/thumbnails/accordion.png',
  fields: [
    {
      name: 'numberedItems',
      label: 'Numbered Items',
      type: 'checkbox',
    },
    {
      name: 'accordions',
      type: 'array',
      label: 'Accordion Items',
      fields: AccordionFields,
    },
  ],
}
