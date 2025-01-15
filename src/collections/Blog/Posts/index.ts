import { anyone } from '@/access/anyone'
import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import lastModifiedBy from '../../../fields/lastModifiedBy'
import { slugField } from '../../../fields/slug'
import { AccordionBlock } from '../../../singleBlocks/AccordionBlock'
import { ButtonGroupBlock } from '../../../singleBlocks/ButtonGroupBlock'


export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    
    livePreview: {
      url: async ({ data }) => {
        const baseUrl = process.env.PAYLOAD_PUBLIC_SITE_URL || ''
        const slug = data?.fullPath || ''
        // let categorySlug = ''
        // const fullPath = false
        // // If there's a category relationship and an ID, fetch the category slug
        // if (data?.category && Array.isArray(data.category) && data.category.length > 0) {
        //   const categoryId = data.category[0] // Assuming you're using the first category
        //   categorySlug = await getCategorySlugById(categoryId, fullPath)
        // }
        // Construct the URL including the category slug and post slug
        return slug  == '' ? `` : `${baseUrl}/${data?.fullPath}`
      },
    },
    group: 'Blog',
  },
  versions: {
    drafts: true,
  },
  access: {
    read: anyone,
  //  update: isAdminOrAuthorOrEditor,
    create: anyone,
  // delete: isAdminOrAuthorOrEditor,
  },
  fields: [
    {
      name: 'fullPath',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            // Mutate the sibling data to prevent DB storage
            delete siblingData.fullPath
          },
        ],
        // afterRead: [
        //   async ({ data, req }) => {
            
        //     if (data?.category && Array.isArray(data?.category)) {
        //       const categoryID = data?.category[0];
    
        //       if (categoryID) {
        //         const category = await req.payload.findByID({
        //           collection: 'categories', // Adjust this to your category collection slug
        //           id: categoryID,
        //         });
    
        //         if (category && category.slug) {
        //           const fullPath = `/blog/${category.slug}/${data?.slug}`;
        //                             return {
        //              fullPath, 
        //           };
        //         }
        //       }
        //     }

        //     //  return data; // Return unmodified data if no category or slug is found
        //   },
        // ],
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'richText',
      label: 'Content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [ButtonGroupBlock, AccordionBlock],
          }),
        ],
      }),
    },
    lastModifiedBy(),
    {
      name: 'postFeaturedImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Category',
      required: true,
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tag',
      type: 'relationship',
      relationTo: 'tags',
      label: 'Tag',
      required: false,
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
}

