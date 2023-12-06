/* eslint-disable react/no-danger */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
// import 'react-tabs/style/react-tabs.css'
// import styles from '@/styles/global/components/Tabs.module.scss';

const TabComponent = ({ tabs, className, id = "0" }) => {
	const searchParams = useSearchParams();
	const selectedTabKey = `tab-${id}`;
	const selectedTab = Number(searchParams.get(selectedTabKey)) || 0;
	const router = useRouter();

	const handleSelect = index => {
		const currentParams = new URLSearchParams(searchParams.toString());
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
					<Tab className={tab.icon || "skills-icon"} key={index}>
						<span>{tab.title}</span>
					</Tab>
				))}
			</TabList>

			{tabs.map((tab, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<TabPanel className={tab.icon || "skills-icon"} key={index}>
					<div className="tab-copy">
						<h2>{tab.title}</h2>
						<div
							className="tab-content"
							dangerouslySetInnerHTML={{ __html: tab.content }}
						/>
					</div>
				</TabPanel>
			))}
		</Tabs>
	);
};

export default TabComponent;
