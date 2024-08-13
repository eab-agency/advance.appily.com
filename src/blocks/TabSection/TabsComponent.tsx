/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-danger */
"use client";
import { Media as Image } from "@/components/Media";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import AccordionSection from '@/components/commonComponent/AccordionGroup';
import ButtonGroup from '@/components/commonComponent/ButtonGroup';

// import 'react-tabs/style/react-tabs.css'
// import styles from '@/styles/global/components/Tabs.module.scss';

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
    )
  },
  accordion: (block) => <AccordionSection data={block} />,
  ButtonGroup: (block) => <ButtonGroup data={block} />,
};

const TabsComponent = ({ tabs, className, id = "0" }) => {
  const searchParams = useSearchParams();
  const selectedTabKey = `tab-${id}`;
  const selectedTab = Number(searchParams?.get(selectedTabKey)) || 0;
  const router = useRouter();
  const handleSelect = (index) => {
    const currentParams = new URLSearchParams(searchParams?.toString());
    currentParams.set(selectedTabKey, index);
    router.replace(`?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <Tabs
      className={className}
      selectedIndex={selectedTab}
      onSelect={handleSelect}
    >
      <TabList>
        {tabs.map((tab, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Tab key={index}>
            <Image resource={tab.tabicon} priority />
            <span>{tab.shortTitle}</span>
          </Tab>
        ))}
      </TabList>

      {tabs.map((tab, index) => {
        const { blocks, alternateImage, tabicon, useSameIcon } = tab;
        return (
          <TabPanel key={index}>
            {useSameIcon ?
              <Image resource={tabicon} /> :
              (alternateImage &&
                <Image resource={alternateImage} />)
            }
            <div className="tab-copy">
              {blocks?.map((block, blockIndex) => {
                return (
                  <Fragment key={blockIndex}>
                    {blockRenderers[block.blockType](block)}
                  </Fragment>
                );
              })}
            </div>
          </TabPanel>
        )
      })}
    </Tabs>
  );
};

export default TabsComponent;
