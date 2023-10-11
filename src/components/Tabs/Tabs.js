/* eslint-disable react/no-danger */
"use client";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
// import 'react-tabs/style/react-tabs.css'
// import styles from '@/styles/global/components/Tabs.module.scss';

const TabComponent = ({ tabs, className }) => (
	<Tabs className={className}>
		<TabList>
			{tabs.map((tab, index) => (
				<Tab className={tab.icon} key={index}>
					<span>{tab.title}</span>
				</Tab>
			))}
		</TabList>

		{tabs.map((tab, index) => (
			<TabPanel className={tab.icon} key={index}>
				<div className="tab-copy">
					<h3>{tab.title}</h3>
					<div
						className="tab-content"
						dangerouslySetInnerHTML={{ __html: tab.content }}
					/>
				</div>
			</TabPanel>
		))}
	</Tabs>
);

export default TabComponent;
