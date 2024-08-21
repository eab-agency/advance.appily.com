import { getSlugs } from "@/lib/getSlugs";
import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Link } from "@/types";
import { Metadata } from "next";

const title = "Your ideal role in healthcare";
const description =
  "Discover your ideal role in healtcare and find schools that offer degrees to help you reach your goals.";

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

export default async function HealthCareResultsLayout({
  children,
}: { children: React.ReactNode }) {
  const links: Link[] = await getSlugs("healthcare");

  return (
    <>
      {children}
    </>
  );
}
