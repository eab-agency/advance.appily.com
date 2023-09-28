import { Header } from "@/components";
import { getSlugs } from "@/lib/getSlugs";

interface Link {
	href: string;
	label: string;
}

export default async function HealthCareResultsLayout({
	children,
}: { children: React.ReactNode }) {
	const links: Link[] = await getSlugs();

	return (
		<>
			<Header links={links} />
			{children}
		</>
	);
}
