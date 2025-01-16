import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'
import { MongoClient } from 'mongodb'

const OLD_BUCKET = 'payload-tenant-bucket-us-east-1'
const OLD_PREFIX = 'us-east-1:84dc1501-20b0-c4a1-91c2-0cdc43912dd1/prod'
const NEW_BUCKET = String(process.env.S3_BUCKET)
const NEW_REGION = String(process.env.S3_REGION)

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  if (!process.env.DATABASE_URI) {
    throw new Error('DATABASE_URI environment variable must be set')
  }

  if (!process.env.S3_BUCKET || !process.env.S3_REGION) {
    throw new Error('Required environment variables S3_BUCKET and S3_REGION must be set')
  }

  // Connect directly to MongoDB
  const client = await MongoClient.connect(process.env.DATABASE_URI)
  const db = client.db()

  try {
    // Update media collection
    const mediaCollection = db.collection('media')
    
    // Find all documents that need updating
    const mediaFiles = await mediaCollection.find({
      url: { $regex: OLD_BUCKET }
    }).toArray()

    console.log(`Found ${mediaFiles.length} media files to update`)

    for (const file of mediaFiles) {
      try {
        // Extract filename from the old URL
        const filename = file.filename || file.url.split('/').pop()
        if (!filename) continue

        const newKey = `media/${filename}`
        const newUrl = `https://${NEW_BUCKET}.s3.${NEW_REGION}.amazonaws.com/${newKey}`

        console.log(`Updating ${filename}:`)
        console.log(`  From: ${file.url}`)
        console.log(`  To: ${newUrl}`)

        // Update the document directly in MongoDB
        await mediaCollection.updateOne(
          { _id: file._id },
          {
            $set: {
              url: newUrl,
              filename: filename
            },
            $unset: {
              cloudStorage: "",
              cloudStorageData: "",
              payloadCloudStorage: ""
            }
          }
        )
      } catch (err) {
        console.error(`Error updating file ${file.filename || file._id}:`, err)
      }
    }

    // Update user-media collection
    const userMediaCollection = db.collection('user-media')
    
    const userMediaFiles = await userMediaCollection.find({
      url: { $regex: OLD_BUCKET }
    }).toArray()

    console.log(`Found ${userMediaFiles.length} user media files to update`)

    for (const file of userMediaFiles) {
      try {
        const filename = file.filename || file.url.split('/').pop()
        if (!filename) continue

        const newKey = `user-media/${filename}`
        const newUrl = `https://${NEW_BUCKET}.s3.${NEW_REGION}.amazonaws.com/${newKey}`

        console.log(`Updating ${filename}:`)
        console.log(`  From: ${file.url}`)
        console.log(`  To: ${newUrl}`)

        await userMediaCollection.updateOne(
          { _id: file._id },
          {
            $set: {
              url: newUrl,
              filename: filename
            },
            $unset: {
              cloudStorage: "",
              cloudStorageData: "",
              payloadCloudStorage: ""
            }
          }
        )
      } catch (err) {
        console.error(`Error updating file ${file.filename || file._id}:`, err)
      }
    }

    console.log('Migration completed')
  } finally {
    // Close the MongoDB connection
    await client.close()
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  console.log('No down migration provided to prevent data loss')
}
