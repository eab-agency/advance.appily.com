import type { Block } from 'payload'

import { backgroundColor } from '../../fields/backgroundColor'

export const CarouselSection: Block = {
  slug: 'Schoolcarousel',
  imageURL: '/assets/thumbnails/school-carousel-block.png',
  fields: [
    backgroundColor({ overrides: { name: 'carouselBackgroundColor' } }),
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'richText',
      label: 'Description',
      type: 'richText',
      required: false,
    },
    // {
    //   name: 'carouselCards',
    //   label: 'Carousel Cards',
    //   type: 'relationship',
    //   relationTo: 'carousel-cards',
    //   hasMany: true, // Allow selecting multiple carousel cards
    // },
  ],
}
