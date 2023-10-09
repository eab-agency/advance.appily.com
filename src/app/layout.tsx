import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import React from "react";

import { Providers } from "../providers";
import { mergeOpenGraph } from "../seo/mergeOpenGraph";

import "@/styles/styles.scss";

import Script from "next/script";
import Footer from "../components/Footer";

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
			</head>
			<body>
				<Providers>
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
};
