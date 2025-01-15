import type { CollectionConfig } from 'payload'

export const UserMedia: CollectionConfig = {
  slug: 'user-media',
  upload: {
    staticDir:'media',
    imageSizes: [
			{
				name: "squareSmall",
				width: 280,
				height: 280,
				position: "centre",
        withoutEnlargement: false
			},
			{
				name: "squareMedium",
				width: 320,
				height: 320,
				position: "centre",
        withoutEnlargement: false
			}
		],
    adminThumbnail: "squareSmall",
		// mimeTypes: ["image/*"],
  },
  access: {
    read: ()=> true
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    // {
    //     name: 'uploaded_by',
    //     type: 'relationship',
    //     relationTo: 'users',
    //     required: true,
    //   },
  ],
}
