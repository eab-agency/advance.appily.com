import type { CollectionConfig } from 'payload'

import { slugField } from '../../fields/slug'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'fullPath',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        afterRead: [
          async ({ data }) => {
            return `/blog/${data?.slug}`
          },
        ],
      },
    },
    slugField(),
  ],
}
