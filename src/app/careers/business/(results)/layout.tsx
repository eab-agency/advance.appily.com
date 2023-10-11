import { Header } from "@/components";
import { getSlugs } from "@/lib/getSlugs";
import { Link } from "@/types";

export default async function BusinessResultsLayout({
	children,
}: { children: React.ReactNode }) {
	const links: Link[] = await getSlugs("business");
	return (
		<>
			<Header />
			{children}
		</>
	);
}
