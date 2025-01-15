import type { CollectionConfig } from 'payload'

import { admins } from '../../access/admins'
import { isAdminorBlogAuthor } from '../../access/isAdmingOrBlogAuthor'
import { isAdminOrSelf } from '../../access/isAdminOrSelf'
import { isAdmin } from './access/admin'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'

export const UserFields: CollectionConfig['fields'] = [
  {
    name: 'name',
    type: 'text',
  },
  {
    name: 'userImage',
    type: 'upload',
    relationTo: 'user-media',
    required: false,
    label: 'User Image',
  },
  {
    name: 'bio',
    type: 'text',
  },
  {
    name: 'roles',
    type: 'select',
    hasMany: true,
    saveToJWT: true,
    hooks: {
      beforeChange: [ensureFirstUserIsAdmin],
    },
    defaultValue: ['blogEditor'],
    options: [
      {
        label: 'admin',
        value: 'admin',
      },
      {
        label: 'Blog Author',
        value: 'blogAuthor',
      },
      {
        label: 'Blog Editor',
        value: 'blogEditor',
      },
    ],
    access: {
      read: () => true,
      create: isAdmin,
      update: isAdmin,
    },
  },
]

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'roles'],
  },
  access: {
    read: () => true,
    create: isAdminorBlogAuthor,
    update: isAdminOrSelf,
    delete: admins,
    // admin: ({ req: { user } }) => checkRole(['admin'], user),
  },
  auth: true,
  fields: UserFields,
  timestamps: true,
}

export default Users
