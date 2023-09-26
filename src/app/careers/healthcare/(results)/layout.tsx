import {Header} from '@/components'

interface Link {
  href: string;
  label: string;
}

export default async function HealthCareResultsLayout({ children }: { children: React.ReactNode }) {

const links: Link[] = [
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
