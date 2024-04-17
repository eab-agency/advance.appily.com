export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string;

type WindowWithDataLayer = Window & {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	dataLayer: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

export const pageview = (url: string) => {
	if (typeof window.dataLayer !== "undefined") {
		window.dataLayer.push({
			event: "pageview",
			page: url,
		});
	} else {
		console.log({
			event: "pageview",
			page: url,
		});
	}
};
