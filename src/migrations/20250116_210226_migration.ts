import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'

const OLD_BUCKET = 'payload-tenant-bucket-us-east-1'
const OLD_PREFIX = 'us-east-1:84dc1501-20b0-c4a1-91c2-0cdc43912dd1/prod'
const NEW_BUCKET = String(process.env.S3_BUCKET)
const NEW_REGION = String(process.env.S3_REGION)

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  if (!process.env.S3_BUCKET || !process.env.S3_REGION) {
    throw new Error('Required environment variables S3_BUCKET and S3_REGION must be set')
  }

  // Media collection
  const mediaFiles = await payload.find({
    collection: 'media',
    limit: 1000,
  })

  console.log(`Checking ${mediaFiles.docs.length} media files`)

  for (const file of mediaFiles.docs) {
    try {
      let filename = file.filename
      if (!filename && file.url) {
        filename = file.url.split('/').pop()
      }
      if (!filename) continue

      if (file.url?.includes(OLD_BUCKET)) {
        const newKey = `media/${filename}`
        const newUrl = `https://${NEW_BUCKET}.s3.${NEW_REGION}.amazonaws.com/${newKey}`

        console.log(`Updating ${filename}:`)
        console.log(`  From: ${file.url}`)
        console.log(`  To: ${newUrl}`)

        await payload.update({
          collection: 'media',
          id: file.id,
          data: {
            url: newUrl,
            filename: filename,
          },
        })
      }
    } catch (err) {
      console.error(`Error updating file ${file.filename || file.id}:`, err)
    }
  }

  // User Media collection
  const userMediaFiles = await payload.find({
    collection: 'user-media',
    limit: 1000,
  })

  console.log(`Checking ${userMediaFiles.docs.length} user media files`)

  for (const file of userMediaFiles.docs) {
    try {
      let filename = file.filename
      if (!filename && file.url) {
        filename = file.url.split('/').pop()
      }
      if (!filename) continue

      if (file.url?.includes(OLD_BUCKET)) {
        const newKey = `user-media/${filename}`
        const newUrl = `https://${NEW_BUCKET}.s3.${NEW_REGION}.amazonaws.com/${newKey}`

        console.log(`Updating ${filename}:`)
        console.log(`  From: ${file.url}`)
        console.log(`  To: ${newUrl}`)

        await payload.update({
          collection: 'user-media',
          id: file.id,
          data: {
            url: newUrl,
            filename: filename,
          },
        })
      }
    } catch (err) {
      console.error(`Error updating file ${file.filename || file.id}:`, err)
    }
  }

  console.log('Migration completed')
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  console.log('No down migration provided to prevent data loss')
}
