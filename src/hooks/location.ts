import type { FieldHook } from 'payload'
import payload from 'payload'

export const getLocationPartner: FieldHook = async ({ data, operation, siblingData }) => {
  if (operation === 'read') {
    const partners = await payload.find({
      collection: 'partners',
      where: {
        id: {
          equals: data?.partner,
        },
      },
    })

    if (partners?.docs) {
      return partners.docs?.[0].contact.state
    }
  }
  return null
}
