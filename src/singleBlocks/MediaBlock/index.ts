//stat data number, title, richtext editor

//! Note: Komal it seems that this block is not being used anywhere in the project. This is not the Media block used. This is a different block. If this is not in used then we can remove this block from the project.

import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  fields: [
    {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
  ],
}
