import { GTM_ID } from "@/lib/gtm";
import { GoogleTagManager } from "@next/third-parties/google";
import { Metadata } from "next";
import React from "react";

import { Providers } from "../providers";
import { mergeOpenGraph } from "../seo/mergeOpenGraph";
import { mergeTwitter } from "../seo/mergeTwitter";

import "@/styles/styles.scss";

import FooterComponent from "../components/Footer";
import HeaderComponent from "../components/Header";

import isDevMode from "@/helpers/isDevMode";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="stylesheet" href="https://use.typekit.net/wba2ytz.css" />
        {/* <!-- OneTrust Cookies Consent Notice start for appily.com --> */}
        {/* <Script src="https://cdn.cookielaw.org/consent/f621c13f-1c94-43c9-8362-0f5d72c69f26/OtAutoBlock.js" />
        <Script
          src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
          data-domain-script="f621c13f-1c94-43c9-8362-0f5d72c69f26"
        />

        <Script
          id="otStubData"
          dangerouslySetInnerHTML={{
            __html: "function OptanonWrapper() {}",
          }}
        /> */}
        {/* <!-- OneTrust Cookies Consent Notice end for appily.com --> */}
      </head>
      {/* if isDevMode is false then load GoogleTagManager */}
      {!isDevMode() && <GoogleTagManager gtmId={GTM_ID} />}
      <body>
        <Providers>
          <HeaderComponent />
          {/* <LocationInDevMode /> */}
          <main className="layout-wrapper">{children}</main>
          <FooterComponent />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ""),
  openGraph: mergeOpenGraph(),
  twitter: mergeTwitter(),
  description: "Resources for Students Returning to School",
  verification: {
    google: "S6f1L3wpKhuwsB28x34ztRdt-hXMYsNJ0xEsK9xHOEQ",
  },
  title: {
    default: "Appily Advance",
    template: "%s | Appily Advance",
  },
  robots: {
    index: isDevMode() ? false : true,
    follow: isDevMode() ? false : true,
  },
};
