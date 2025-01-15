import type { CollectionConfig } from 'payload'

import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import { formatAppURL } from '../../hooks/revalidatePage'

export const LeadTypes: CollectionConfig = {
  slug: 'lead-types',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title'],
    preview: doc =>
      `${process.env.PAYLOAD_PUBLIC_SITE_URL}/api/preview?url=${formatAppURL({ doc })}`,
    hidden: (args: { user: any }) => {
			const isEditorORAuthor = args.user?.roles[0] === 'blogEditor' || args.user?.roles[0] === 'blogAuthor';
      return isEditorORAuthor;
		},
  },
  access: {
    read: anyone,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
  ],
}
