import type { Metadata } from "next";

const defaultX: Metadata["twitter"] = {
	card: "summary_large_image",
	site: "@site",
	creator: "@creator",
	title: "Appily Advance",
	description: "Resources for Students Returning to School",
	images:
		"https://appily-advance-git-qa-eab-agency.vercel.app/images/og-twitter-default.png",
};

export const mergeTwitter = (
	x?: Metadata["openGraph"],
): Metadata["openGraph"] => {
	return {
		...defaultX,
		...x,
		images: x?.images ? x.images : defaultX.images,
	};
};
