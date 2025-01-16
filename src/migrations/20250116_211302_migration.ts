import { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-mongodb'
import { MongoClient } from 'mongodb'

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
    
    // Find all documents
    const mediaFiles = await mediaCollection.find({}).toArray()

    console.log(`Found ${mediaFiles.length} media files to update`)

    for (const file of mediaFiles) {
      try {
        if (!file.filename) continue

        const newKey = `media/${file.filename}`
        const newUrl = `https://${NEW_BUCKET}.s3.${NEW_REGION}.amazonaws.com/${newKey}`

        console.log(`Updating ${file.filename}:`)
        console.log(`  Setting URL to: ${newUrl}`)

        // Update the document directly in MongoDB
        await mediaCollection.updateOne(
          { _id: file._id },
          {
            $set: {
              url: newUrl,
            }
          }
        )
      } catch (err) {
        console.error(`Error updating file ${file.filename || file._id}:`, err)
      }
    }

    // Do the same for user-media if needed
    const userMediaCollection = db.collection('user-media')
    
    const userMediaFiles = await userMediaCollection.find({}).toArray()

    console.log(`Found ${userMediaFiles.length} user media files to update`)

    for (const file of userMediaFiles) {
      try {
        if (!file.filename) continue

        const newKey = `user-media/${file.filename}`
        const newUrl = `https://${NEW_BUCKET}.s3.${NEW_REGION}.amazonaws.com/${newKey}`

        console.log(`Updating ${file.filename}:`)
        console.log(`  Setting URL to: ${newUrl}`)

        await userMediaCollection.updateOne(
          { _id: file._id },
          {
            $set: {
              url: newUrl,
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
