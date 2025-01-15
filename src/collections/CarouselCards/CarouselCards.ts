import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { SlateToLexicalFeature } from '@payloadcms/richtext-lexical/migrate'
import type { CollectionConfig } from 'payload'
import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import linkGroup from '../../fields/linkGroup'
import { populatePartnerState } from '../../hooks/populatePartnerState'
import { formatAppURL } from '../../hooks/revalidatePage'

export const CarouselCards: CollectionConfig = {
  slug: 'carousel-cards',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['admintitle', 'leadTypes', 'partner'],
    preview: doc =>
      `${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/preview?url=${formatAppURL({ doc })}`,
    hidden: (args: { user: any }) => {
      const isEditorORAuthor = args.user?.roles[0] === 'blogEditor' || args.user?.roles[0] === 'blogAuthor';
      return isEditorORAuthor;
    }
  },
  hooks: {
    beforeChange: [populatePartnerState],
  },
  access: {
    read: anyone,
    update: admins,
    create: admins,
    delete: admins,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'admintitle',
      type: 'text',
      label: 'Title (Internal)',
      admin: {
        position: 'sidebar',
        description:
          'This title is only used in the admin panel. It will not be displayed on the front end. Use it to differentiate between carousel cards with the same partner.',
      },
    },
    {
      name: 'partner',
      type: 'relationship',
      relationTo: 'partners',
      label: 'Associated Partner',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'leadTypes',
      type: 'relationship',
      relationTo: 'lead-types',
      label: 'Lead Type',
      required: true,
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'partnerState',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },
    // richText({
    //   name: 'description',
    //   admin: {
    //     elements: ['link'],
    //   },
    // }),
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          SlateToLexicalFeature({})
        ],
      }),
    },
    linkGroup({
      appearances: false,
      overrides: {
        maxRows: 1,
      },
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
