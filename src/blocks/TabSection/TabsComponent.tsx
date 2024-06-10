/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-danger */
"use client";
import RichText from "@/components/RichText";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Media as Image } from "@/components/Media";

// import 'react-tabs/style/react-tabs.css'
// import styles from '@/styles/global/components/Tabs.module.scss';

const TabsComponent = ({ tabs, className, id = "0" }) => {
  console.log(tabs, "**");
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

      {tabs.map((tab, index) => (
        <TabPanel key={index}>
          <Image
            resource={tab.useSameIcon ? tab.tabicon : tab.alternateImage}
            priority
          />
          <div className="tab-copy">
            <h2>{tab.contentTitle}</h2>
            <RichText content={tab.description} />
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
};

export default TabsComponent;
