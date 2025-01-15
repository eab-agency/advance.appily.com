import type { Field } from "payload";

export const postFeaturedImage: Field = {
	name: "postFeaturedImage",
	label: false,
	type: "group",
	fields: [
		{
			name: "media",
			type: "upload",
			relationTo: "media",
			required: true,
		},
	],
};
