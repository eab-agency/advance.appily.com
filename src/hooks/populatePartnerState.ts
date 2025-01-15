import type { CollectionBeforeChangeHook } from 'payload'
import payload from 'payload'

export const populatePartnerState: CollectionBeforeChangeHook = async ({ data, operation }) => {
  if (operation === 'create' || operation === 'update') {
    const partners = await payload.find({
      collection: 'partners',
      where: {
        id: {
          equals: data.partner,
        },
      },
    })

    if (partners?.docs) {
      return {
        ...data,
        partnerState: partners.docs?.[0].contact.state,
      }
    }
  }

  return data
}
