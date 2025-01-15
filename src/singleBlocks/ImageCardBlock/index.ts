//stat data number, title, richtext editor

import type { Block } from "payload";
import { backgroundColor } from "../../fields/backgroundColor";
import linkGroup from "../../fields/linkGroup";

export const ImageCardBlock: Block = {
	labels: {
		singular: "Image Card",
		plural: "Image Cards",
	},
	imageURL: "/assets/thumbnails/image-card.png",
	slug: "imageCard",
	fields: [
		backgroundColor({ overrides: { name: "imageCardBlockBackgroundColor" } }),
		{
			name: "title",
			label: "Title",
			type: "text",
		},
		{
			name: "richText",
			label: "Description",
			type: "richText",
			// required: true,
			// editor: lexicalEditor({})
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		linkGroup({
			appearances: ["primary", "secondary"],
		}),
	],
};
