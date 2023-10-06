import { Header } from '@/components'
import React from 'react'

export default async function HealthCareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
