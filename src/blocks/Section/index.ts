import type { Block, Field } from 'payload'

import { backgroundColor } from '../../fields/backgroundColor'
import { AccordionBlock } from '../../singleBlocks/AccordionBlock'
import { ButtonGroupBlock } from '../../singleBlocks/ButtonGroupBlock'
import { ComparisonBlock } from '../../singleBlocks/ComparisonBlock'
import { ImageCardBlock } from '../../singleBlocks/ImageCardBlock'
import { RichTextBlock } from '../../singleBlocks/RichTextBlock'
import { SingleStatBlock } from '../../singleBlocks/StatisticsBlock'
import { TestimonialBlock } from '../../singleBlocks/TestimonialBlock'
import { MediaBlock } from '../Media'

const columnFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'size',
        type: 'text',
        label: 'Column Size (%)',
        required: true,
        validate: async (val: string | string[] | null | undefined) => {
          if (val === undefined || val === null) {
            return 'Value is required.';
          }
      
          // Handle array values (assuming it should not be an array for this field)
          if (Array.isArray(val)) {
            return 'Invalid value. Only a single value is allowed.';
          }
      
          // Validate single string values
          const regex = /^(\d+(\.\d+)?%?)$/;
          const isValid = regex.test(val);
      
          if (!isValid) {
            return 'Please enter a valid column size (e.g., 50%, 100, 25.5%).';
          }
      
          return true; // Validation passed
        },
      },
      {
        name: 'halignment',
        type: 'select',
        label: 'Blocks Horizontal Alignment',
        defaultValue: 'left',
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
      {
        name: 'valignment',
        type: 'select',
        label: 'Blocks Vertical Alignment',
        defaultValue: 'top',
        options: [
          {
            label: 'Top',
            value: 'top',
          },
          {
            label: 'Center',
            value: 'center',
          },
          {
            label: 'Bottom',
            value: 'bottom',
          },
        ],
      },
      {
        name: 'extendToBorders',
        type: 'checkbox',
        label: 'Extend to borders',
        defaultValue: false,
        admin: {
          description: 'Enable this to extend the column to the borders of the section.',
          style: {
            display: 'flex ',
            flexDirection: 'column-reverse',
          },
        },
      },
    ],
  },

  {
    name: 'blocks',
    type: 'blocks',
    label: 'Add Block',
    required: true,
    blocks: [
      SingleStatBlock,
      TestimonialBlock,
      ImageCardBlock,
      ComparisonBlock,
      AccordionBlock,
      RichTextBlock,
      MediaBlock,
      ButtonGroupBlock,
    ],
  },
]

export const Section: Block = {
  slug: 'section',
  imageURL: '/assets/thumbnails/section-block.png',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Layout type',
          defaultValue: 'column',
          options: [
            {
              value: 'row',
              label: 'Rows',
            },
            {
              value: 'column',
              label: 'Columns',
            },
          ],
        },
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
      type: 'row',
      fields: [
        backgroundColor({}),
        {
          name: 'enableHighlight', // required
          type: 'checkbox', // required
          label: 'Highlight Sections',
          defaultValue: false,
          admin: {
            style: {
              display: 'flex',
              flexDirection: 'column-reverse',
            },
            description: 'Enable this to highlight the section with a decorative shape.',
          },
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      fields: [
        {
          name: 'columns',
          type: 'array',
          fields: columnFields,
        },
      ],
      admin: {
        condition: (_, { type } = {}) => ['row'].includes(type),
      },
    },
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
      admin: {
        condition: (_, { type } = {}) => ['column'].includes(type),
      },
    },
  ],
}
