import { CollectionBeforeChangeHook } from "payload"

export const populatePublishedDate: CollectionBeforeChangeHook = ({ data, req, operation }) => {
  console.log(operation,req,data,'data**')
  if (operation === 'create' || operation === 'update') {
    console.log(req,'req****')
    if (req.body && !data.publishedDate) {
      const now = new Date()
      return {
        ...data,
        publishedDate: now,
      }
    }
  }

  return data
}
