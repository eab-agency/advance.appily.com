import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import React from "react";

import { Providers } from "../providers";
import { mergeOpenGraph } from "../seo/mergeOpenGraph";

import "@/styles/styles.scss";

import Footer from "../components/Footer";

export default async function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/wba2ytz.css" />
      </head>
      <body>
        <Providers>
          <main className="layout-wrapper">
            {children}
          </main>
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
