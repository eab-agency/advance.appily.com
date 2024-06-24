import { Tabs } from "@/components/Tabs";
import { Suspense } from "react";

interface TabsSectionProps {
  id?: string;
  data: {
    title: string;
    description?: string;
    tabsList: {
      title: string;
      content: string;
    }[];
  };
  className?: string;
}

function TabsFallback() {
  return <>Tabs loading...</>;
}

export default function TabsSection({ id, data, className }: TabsSectionProps) {
  return (
    <section id={id} className={`${className} tabsSection column bg-none`}>
      <header className="center-aligned centered-content center-justified">
        <h2>{data.title}</h2>
        {data.description && (
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        )}
      </header>

      <Suspense fallback={<TabsFallback />}>
        <Tabs className="react-tabs" tabs={data.tabsList} id={id} />
      </Suspense>
    </section>
  );
}
