//stat data number, title, richtext editor

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const RichTextBlock: Block = {
  slug: 'richText',
  imageURL: '/assets/thumbnails/richtext-block.png',
  fields: [
    {
      name: 'richText',
      label: 'Content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({}),
    },
  ],
}
