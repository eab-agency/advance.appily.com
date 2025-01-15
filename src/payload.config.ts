// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { Categories } from './collections/Blog/Categories'
import { Posts } from './collections/Blog/Posts'
import { Tags } from './collections/Blog/Tag'
import { CarouselCards } from './collections/CarouselCards'
import { LeadTypes } from './collections/LeadTypes'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Partners } from './collections/Partners'
import { UserMedia } from './collections/UserMedia'
import Users from './collections/Users'
import { GlobalToken } from './globals/Blocks'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)



// const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
//   const url = getServerSideURL()

//   return doc?.slug ? `${url}/${doc.slug}` : url
// }

export default buildConfig({
  
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Appily',
    },
  },
  collections: [
    Posts,
    Categories,
    Tags,
    Pages,
    Media,
    Partners,
    CarouselCards,
    LeadTypes,
    Users,
    UserMedia,
    GlobalToken,
  ],
  globals: [Header, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  cors: [process.env.PAYLOAD_PUBLIC_SERVER_URL || ''],
  plugins: [
    nestedDocsPlugin({
      collections: ['pages'],
      generateLabel: (_, doc) =>  doc?.title as string,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    // seoPlugin({
    //   collections: [
    //     'pages', 'posts'
    //   ],
    //   generateTitle,
    //   // generateURL
    // }),
    redirectsPlugin({
      collections:['pages', 'posts']
    }),
    s3Storage({
      collections: {
        media: true,
        "user-media": true
      },
      bucket: process.env.S3_BUCKET as string,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION,
      },
    }),
    seoPlugin({
      collections: ['pages','posts'],
      uploadsCollection: 'media',
    }),
    payloadCloudPlugin(),
  ],
})
