import { Suspense } from "react";
import TabsComponent from "./TabsComponent";
import "@/styles/layouts/TabSection.scss";
import { sectionClassNames, SectionClassNamesProps } from "@/utilities/sectionClassNames";
import RichText from "@/components/RichText";

interface TabsSectionProps {
  tabs: {
    shortTitle: string;
  }[];
  className?: string;
  tabSectionBackgroundColor?: string;
  sectionHead?: boolean;
  sectionIntro?: string;
}

function TabsFallback() {
  return <>Tabs loading...</>;
}


export default function TabsSection({
  tabs,
  tabSectionBackgroundColor,
  sectionHead,
  sectionIntro,
}: TabsSectionProps) {
  const sectionClassProps: SectionClassNamesProps = { backgroundColor: tabSectionBackgroundColor };

  return (
    <section className={`tabsSection column ${sectionClassNames(sectionClassProps)}`}>
      {sectionHead && (
        <header className="center-aligned center-justified">
          <RichText content={sectionIntro} />
        </header>
      )}

      <Suspense fallback={<TabsFallback />}>
        <TabsComponent className="react-tabs" tabs={tabs} />
      </Suspense>
    </section>
  );
}
