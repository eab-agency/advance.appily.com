import type { CollectionConfig } from 'payload'

import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import { partner } from '../../fields/partner'
import { slugField } from '../../fields/slug'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'
import { formatAppURL } from '../../hooks/revalidatePage'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
    preview: doc =>
      `${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/preview?url=${formatAppURL({ doc })}`,
    hidden: (args: { user: any }) => {
			const isEditorORAuthor = args.user?.roles[0] === 'blogEditor' || args.user?.roles[0] === 'blogAuthor';
      return isEditorORAuthor;
		},
  },
  hooks: {
    beforeChange: [populatePublishedDate],
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
      name: 'title',
      type: 'text',
      label: 'Partner Name',
      required: true,
    },
    partner,
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
}
