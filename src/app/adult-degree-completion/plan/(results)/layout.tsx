import { getSlugs } from "@/lib/getSlugs";
import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Link } from "@/types";
import { Metadata } from "next";

const title = "Are you ready to return to school?";
const description =
  "Discover your readiness for a successful return to education and find schools that offer degrees to help you reach your goals.";

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
};

export default async function BusinessResultsLayout({
  children,
}: { children: React.ReactNode }) {
  const links: Link[] = await getSlugs("adult-degree-completion");
  return (
    <>
      {children}
    </>
  );
}
