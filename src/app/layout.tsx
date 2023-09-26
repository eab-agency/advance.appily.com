import { Analytics } from '@vercel/analytics/react'
import { Metadata } from 'next'
import React from 'react'

import { Providers } from '../providers'
import { mergeOpenGraph } from '../seo/mergeOpenGraph'

import '@/styles/app.scss'

import Footer from '../components/Footer'
import styles from './layout.module.scss'

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className={styles.layout}>
            <main className={styles.layoutContainer}>
              <div className={styles.layoutContent}>{children}</div>
            </main>
          </div>
            <Footer />
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
