import { Tabs } from "@/components/Tabs";
import { Suspense } from "react";
import Tabscomponent from ".";
import TabsComponent from "./TabsComponent";

interface TabsSectionProps {
	
		tabs: {
			shortTitle: string;
			
		}[];
	className?: string;
}

function TabsFallback() {
	return <>Tabs loading...</>;
}

export default function TabsSection({ tabs }: TabsSectionProps) {
	return (
		<section  className={` tabsSection column bg-none`}>
			<header className="center-aligned centered-content center-justified">
			</header>
            <TabsComponent className="react-tabs" tabs={tabs}   />
		</section>
	);
}
