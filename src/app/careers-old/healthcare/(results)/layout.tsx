/* eslint-disable simple-import-sort/imports */

import {Header} from '@components/Header'

export default async function HealthCareResultsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
