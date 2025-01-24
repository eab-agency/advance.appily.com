import { getSlugs } from "@/lib/getSlugs";
import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Link } from "@/types";
import { Metadata } from "next";

const title = "Back-to-School Plan | Business | Appily Advance";
const description =
  "Discover in-demand business careers and the bachelor's degrees that can help you succeed, plus tips for funding and finishing your undergraduate degree.";

export const metadata: Metadata = {
  openGraph: mergeOpenGraph({
    title: title,
    description: description,
  }),
  twitter: mergeTwitter({
    title: title,
    description: description,
  }),
  title: title,
  description: description,
  robots: {
    index: false,
    follow: false,
  }
};

export default async function BusinessResultsLayout({
  children,
}: { children: React.ReactNode }) {
  const links: Link[] = await getSlugs("degree-completion");
  return <>{children}</>;
}
