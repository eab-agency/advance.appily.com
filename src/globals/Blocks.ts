import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { CarouselSection } from '../blocks/CarouselSection'
import { checkRole } from '../collections/Users/checkRole'
import { slugField } from '../fields/slug'
import { populatePublishedDate } from '../hooks/populatePublishedDate'
import { revalidatePage } from '../hooks/revalidatePage'
import { AccordionBlock } from '../singleBlocks/AccordionBlock'
import { ButtonGroupBlock } from '../singleBlocks/ButtonGroupBlock'
import { ComparisonBlock } from '../singleBlocks/ComparisonBlock'
import { ImageCardBlock } from '../singleBlocks/ImageCardBlock'
import { RichTextBlock } from '../singleBlocks/RichTextBlock'
import { SingleStatBlock } from '../singleBlocks/StatisticsBlock'
import { TestimonialBlock } from '../singleBlocks/TestimonialBlock'

export const GlobalToken: CollectionConfig = {
  slug: 'blocks',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'fullPath', 'updatedAt'],
    group: 'Globals',
  },
  hooks: {
    beforeChange: [populatePublishedDate],
    // afterRead: [populateArchiveBlock],
    afterChange: [revalidatePage],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: anyone,
    update: anyone,
    create: anyone,
    delete: anyone,
    admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: false,
    },
    {
      name: 'Block',
      type: 'blocks',
      required: true,
      blocks: [
        RichTextBlock,
        ImageCardBlock,
        ComparisonBlock,
        ButtonGroupBlock,
        SingleStatBlock,
        TestimonialBlock,
        AccordionBlock,
        CarouselSection,
      ],
    },
    slugField(),
  ],
}
