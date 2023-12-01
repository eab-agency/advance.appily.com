import { Metadata } from "next";
export default async function ResultsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}

export const metadata: Metadata = {
	robots: {
		index: false,
		follow: true,
		nocache: true,
		googleBot: {
			index: false,
			follow: false,
			noimageindex: true,
		},
	},
};
