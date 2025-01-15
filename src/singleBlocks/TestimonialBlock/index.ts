//stat data number, title, richtext editor

import type { Block } from "payload";
// import richText from '../../fields/richText'

export const TestimonialBlock: Block = {
	labels: {
		singular: "Testimonial Card",
		plural: "Testimonial Cards",
	},
	imageURL: "/assets/thumbnails/testimonial-card.png",
	slug: "testimonial",
	fields: [
		{
			name: "author",
			label: "Author",
			type: "text",
		},
		// richText({}),
		{
			name: "richText",
			label: "Description",
			type: "richText",
		},
		{
			name: "authortitle",
			label: "Author Title",
			type: "text",
		},
		{
			name: "alignment",
			type: "select",
			label: "Alignment",
			defaultValue: "center",
			options: [
				{
					label: "Left",
					value: "left",
				},
				{
					label: "Center",
					value: "center",
				},
				{
					label: "Right",
					value: "right",
				},
			],
		},
	],
};
