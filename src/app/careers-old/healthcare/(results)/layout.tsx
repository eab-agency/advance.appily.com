/* eslint-disable simple-import-sort/imports */

import {Header} from '@components'

export default async function HealthCareResultsLayout({ children }: { children: React.ReactNode }) {

const links = [
  {
    href: 'practitioner',
    label: 'Practitioner',
  },
  {
    href: 'analyst',
    label: 'Analyst',
  },
  {
    href: 'educator',
    label: 'Educator',
  },
  {
    href: 'executive',
    label: 'Executive',
  },
  {
    href: 'scientist',
    label: 'Scientist',
  },
]
  return (
    <>
      <Header links={links}/>
      {children}
    </>
  )
}
