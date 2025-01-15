import type { Field } from 'payload'

import linkGroup from './linkGroup'

export const hero: Field = {
  name: 'hero',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Type of Hero Layout',
      required: true,
      defaultValue: 'landingPage',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Landing Page',
          value: 'landingPage',
        },
        {
          label: 'Result Page',
          value: 'resultPage',
        },
      ],
    },
    {
      name: 'title',
      label: 'Pre Title',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['resultPage'].includes(type),
      },
    },
    {
      name: 'richText',
      label: 'Hero content, includes the H1 title and a brief introduction. ',
      type: 'richText',
    },
    linkGroup({
      overrides: {
        maxRows: 5,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        condition: (_, { type } = {}) => ['landingPage'].includes(type),
      },
    },
    {
      name: 'animation',
      label: 'Lottie Animation JSON',
      type: 'upload',
      required: true,
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => ['resultPage'].includes(type),
      },
    },
  ],
}
