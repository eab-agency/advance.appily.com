import type { Field } from 'payload'

import { address } from './address'
import linkGroup from './linkGroup'

export const partner: Field = {
  type: 'row',
  fields: [
    {
      name: 'shortName',
      type: 'text',
      label: 'Short Name',
      required: true,
      admin: {
        placeholder: 'Morgan State, Virginia, etc',
        description: 'The short name of the university.',
        width: '50%',
      },
    },
    {
      name: 'acroynm',
      type: 'text',
      label: 'Acroynm',
      admin: {
        placeholder: 'MSU, UVA, UMBC, etc',
        width: '50%',
      },
    },
    address,
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        width: '100%',
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
      admin: {
        width: '50%',
      },
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      admin: {
        width: '50%',
      },
    },
    linkGroup({
      appearances: false,
      overrides: {
        maxRows: 1,
      },
    }),
  ],
}
