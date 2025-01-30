import { GTM_ID } from "@/lib/gtm";
import { GoogleTagManager } from "@next/third-parties/google";
import { Metadata } from "next";
import React from "react";

import { mergeOpenGraph } from "@/seo/mergeOpenGraph";
import { mergeTwitter } from "@/seo/mergeTwitter";

import "./styles/global.css";

import AWSRumInitializer from "@/components/AWSRumInit";
import isDevMode from "@/helpers/isDevMode";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="stylesheet" href="https://use.typekit.net/wba2ytz.css" />
      </head>
      {!isDevMode() && <GoogleTagManager gtmId={GTM_ID} />}
      <body>
          <AWSRumInitializer /> {/* Use the client component here */}
          <main className="layout-wrapper">{children}</main>
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
