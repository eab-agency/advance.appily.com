import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  imageURL: '/assets/thumbnails/media-block.png',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'cornerStyle',
          type: 'select',
          label: 'Corner Style',
          admin: {
            width: '50%',
          },
          defaultValue: 'square',
          options: [
            {
              value: 'square',
              label: 'Square',
            },
            {
              value: 'slightly-rounded',
              label: 'Slightly Rounded',
            },
            {
              value: 'moderately-rounded',
              label: 'Moderately Rounded',
            },
            {
              value: 'very-rounded',
              label: 'Very Rounded',
            },
            {
              value: 'circular',
              label: 'Circular',
            },
          ],
        },
        {
          name: 'enableHighlight', // required
          type: 'checkbox', // required
          label: 'Highlight Media Element',
          defaultValue: false,
          admin: {
            width: '50%',
            style: {
              display: 'flex',
              flexDirection: 'column-reverse',
            },
            description: 'Enable this to highlight the media element with a shadow.',
          },
        },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
