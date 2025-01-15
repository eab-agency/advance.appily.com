import type { CollectionConfig } from 'payload'
import { slugField } from '../../fields/slug'

 export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'title',
    group:'Blog'
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    slugField()
  ],
}

