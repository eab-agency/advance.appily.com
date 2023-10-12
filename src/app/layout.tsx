import { GTM_ID } from "@/lib/gtm";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import React from "react";

import data from "@/data/careers-business.json";
import { Providers } from "../providers";
import { mergeOpenGraph } from "../seo/mergeOpenGraph";

import "@/styles/styles.scss";

import { Footer, Header } from "@/components";
import Script from "next/script";

export default async function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="stylesheet" href="https://use.typekit.net/wba2ytz.css" />
				{/* <!-- OneTrust Cookies Consent Notice start for appily.com --> */}
				<Script
					src="https://cdn.cookielaw.org/consent/f621c13f-1c94-43c9-8362-0f5d72c69f26/OtAutoBlock.js"
					strategy="beforeInteractive"
				/>
				<Script
					src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
					data-domain-script="f621c13f-1c94-43c9-8362-0f5d72c69f26"
				/>
				<Script
					id="otStubData"
					dangerouslySetInnerHTML={{
						__html: "function OptanonWrapper() {}",
					}}
				/>
				{/* <!-- OneTrust Cookies Consent Notice end for appily.com --> */}
				<Script
					id="gtag-base"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
					}}
				/>
			</head>
			<body>
				<Providers>
					<Header links={data.links} />
					<main className="layout-wrapper">{children}</main>
					<Footer />
				</Providers>
				<Analytics />
			</body>
		</html>
	);
}

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ""),
	openGraph: mergeOpenGraph(),
	description: "Resources for Students Returning to School",
	title: {
		default: "Appily Advance",
		template: "%s | Appily Advance",
	},
};
