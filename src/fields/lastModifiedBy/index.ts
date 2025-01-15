import type { Field } from 'payload';

const lastModifiedBy = (): Field => ({
  name: 'lastModifiedBy',
  type: 'text',
  label: 'Last Modified By',
  admin: {
    readOnly: true,
    position: 'sidebar',
    className: 'field__last-modified-by',
  },
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (data) {
          data.lastModifiedBy = req?.user?.email;
        }
        
      },
    ],
  },
})

export default lastModifiedBy
