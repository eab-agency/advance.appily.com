import { Tabs } from "@/components/Tabs"

interface TabsSectionProps {
  id?: string
  data: {
    title: string
    description?: string
    tabsList: {
      title: string
      content: string
    }[]
  }
  className?: string
}

export default function TabsSection({ id, data, className }: TabsSectionProps) {
  return (
    <section id={id} className={`${className} tabsSection column bg-none`}>
      <header className="center-aligned centered-content center-justified">
        <h2>{data.title}</h2>
        {data.description && <div
          dangerouslySetInnerHTML={{ __html: data.description }}
        />}
      </header>
      <Tabs className="react-tabs" tabs={data.tabsList} />
    </section>
  )
}
