import "@/styles/layouts/TabSection.scss";
import {
  sectionClassNames,
  SectionClassNamesProps,
} from "@/utilities/sectionClassNames";
import { Fragment, Suspense } from "react";
import TabsComponent from "./TabsComponent";

import AccordionSection from "@/components/commonComponent/AccordionGroup";
import ButtonGroup from "@/components/commonComponent/ButtonGroup";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";

interface TabsSectionProps {
  id?: string;
  tabs: {
    shortTitle: string;
  }[];
  className?: string;
  tabSectionBackgroundColor?: string;
  sectionHead: {
    showSectionHead: boolean;
    headContent: {
      blocks: {
        blockType: string;
        richText?: string;
        buttonGroup?: {
          buttons: {
            text: string;
            link: string;
            type: string;
          }[];
        };
      }[];
    };
  };
  sectionFooter: {
    showSectionFooter: boolean;
    footerContent: {
      blocks: {
        blockType: string;
        richText?: string;
        buttonGroup?: {
          buttons: {
            text: string;
            link: string;
            type: string;
          }[];
        };
      }[];
    };
  };
}

function TabsFallback() {
  return <>Tabs loading...</>;
}

const blockRenderers = {
  richText: (block) => <RichText content={block.richText} />,
  mediaBlock: (block) => {
    const { media, cornerStyle, enableHighlight } = block;
    return (
      <Media
        resource={media}
        cornerStyle={cornerStyle}
        enableHighlight={enableHighlight}
        priority
      />
    );
  },
  accordion: (block) => <AccordionSection data={block} />,
  ButtonGroup: (block) => <ButtonGroup data={block} />,
};

export default function TabsSection({
  id,
  tabs,
  tabSectionBackgroundColor,
  sectionHead,
  sectionFooter,

}: TabsSectionProps) {
  const sectionClassProps: SectionClassNamesProps = {
    backgroundColor: tabSectionBackgroundColor,
  };
  const { headContent, showSectionHead } = sectionHead;
  const { footerContent, showSectionFooter } = sectionFooter;
  return (
    <section
      className={`tabsSection column ${sectionClassNames(sectionClassProps)}`}
    >
      {showSectionHead && (
        <header className="tabsSection__head">
          {headContent.blocks?.map((block, blockIndex) => {
            return (
              <Fragment key={blockIndex}>
                {blockRenderers[block.blockType](block)}
              </Fragment>
            );
          })}
        </header>
      )}

      <Suspense fallback={<TabsFallback />}>
        <TabsComponent className="react-tabs" tabs={tabs} id={id} />
      </Suspense>

      {showSectionFooter && (
        <footer className="tabsSection__footer">
          {footerContent.blocks?.map((block, blockIndex) => {
            return (
              <Fragment key={blockIndex}>
                {blockRenderers[block.blockType](block)}
              </Fragment>
            );
          })}
        </footer>
      )}
    </section>
  );
}
