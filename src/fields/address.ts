import type { Field } from 'payload'

import { state } from './state'

export const address: Field = {
  name: 'contact',
  label: 'Address',
  type: 'group',
  fields: [
    {
      name: 'street1',
      type: 'text',
      label: 'Street',
      required: true,
    },
    {
      name: 'street2',
      type: 'text',
      label: 'Street 2',
    },
    {
      name: 'city',
      type: 'text',
      label: 'City',
      required: true,
    },
    state,
    {
      name: 'zip',
      type: 'text',
      label: 'Zip',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
      label: 'Country',
    },
  ],
}
