import type { Block, Field } from 'payload'

import { backgroundColor } from '../../fields/backgroundColor'
import { AccordionBlock } from '../../singleBlocks/AccordionBlock'
import { ButtonGroupBlock } from '../../singleBlocks/ButtonGroupBlock'
import { RichTextBlock } from '../../singleBlocks/RichTextBlock'
import { MediaBlock } from '../Media'

const contentBlocks: Field[] = [
  {
    name: 'blocks',
    type: 'blocks',
    required: true,
    blocks: [AccordionBlock, RichTextBlock, MediaBlock, ButtonGroupBlock],
  },
]

export const Tabsection: Block = {
  slug: 'tabsection',
  imageURL: '/assets/thumbnails/tabs-section-block.png',
  fields: [
    {
      type: 'row',
      fields: [backgroundColor({ overrides: { name: 'tabSectionBackgroundColor' } })],
    },
    {
      name: 'sectionHead',
      label: false,
      type: 'group',
      fields: [
        {
          name: 'showSectionHead',
          label: 'Show Section Head',
          type: 'checkbox',
        },
        {
          name: 'headContent',
          type: 'group',
          label: false,
          admin: {
            condition: (_, { showSectionHead } = {}) => showSectionHead,
          },
          fields: [...contentBlocks],
        },
      ],
    },
    {
      name: 'tabs',
      label: 'Tabs',
      type: 'array',
      fields: [
        {
          name: 'tabicon',
          label: 'Tab Icon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'useSameIcon',
          label: 'Use Same Icon as Main tab image/icon',
          type: 'checkbox',
        },
        {
          name: 'alternateImage',
          label: 'Alternate Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, { useSameIcon } = {}) => !useSameIcon,
          },
        },
        {
          name: 'shortTitle',
          label: 'Short Tab Title (Max 25 characters)',
          type: 'text',
          maxLength: 25, // Limit the characters of the title to 25
        },
        ...contentBlocks,
      ],
    },
    {
      name: 'sectionFooter',
      label: false,
      type: 'group',
      fields: [
        {
          name: 'showSectionFooter',
          label: 'Show Section Footer',
          type: 'checkbox',
        },
        {
          name: 'footerContent',
          type: 'group',
          label: false,
          admin: {
            condition: (_, { showSectionFooter } = {}) => showSectionFooter,
          },
          fields: [...contentBlocks],
        },
      ],
    },
  ],
}
