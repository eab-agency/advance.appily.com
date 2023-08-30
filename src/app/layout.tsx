/* eslint-disable simple-import-sort/imports */
import { Analytics } from '@vercel/analytics/react'
import { Metadata } from 'next'
import React from 'react'

import { Providers } from '../providers'
import { mergeOpenGraph } from '../seo/mergeOpenGraph'

import '../css/app.scss'

// import { AdminBar } from '../components/AdminBar';
import Footer from '../components/Footer'
import Header from '../components/Header'
import styles from './layout.module.scss'

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* <AdminBar
              adminBarProps={{
                collection,
                id,
                preview,
                onPreviewExit,
              }}
            /> */}
        <Providers>
          <Header />
          <div className={styles.layout}>
            <main className={styles.layoutContainer}>
              {/* <LocationInDevMode /> */}
              <div className={styles.layoutContent}>{children}</div>
            </main>
            <Footer />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ''),
  openGraph: mergeOpenGraph(),
}
