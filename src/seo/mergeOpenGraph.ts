import type { Metadata } from "next";

const defaultOpenGraph: Metadata["openGraph"] = {
	type: "website",
	siteName: "Appily-Advance",
	description: "Resources for Students Returning to School",
	title: {
		default: "Appily Advance",
		template: "%s | Appily Advance",
	},
	images:
		"https://appily-advance-git-qa-eab-agency.vercel.app/images/og-twitter-default.png",
};

export const mergeOpenGraph = (
	og?: Metadata["openGraph"],
): Metadata["openGraph"] => {
	return {
		...defaultOpenGraph,
		...og,
		images: og?.images ? og.images : defaultOpenGraph.images,
	};
};
