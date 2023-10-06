import { Header } from "@/components";
import { getSlugs } from "@/lib/getSlugs";

interface Link {
  href: string;
  label: string;
}

export default async function BusinessResultsLayout({
  children,
}: { children: React.ReactNode }) {
  const links: Link[] = await getSlugs("business");

  return (
    <>
      {/* <Header links={links} /> */}
      <Header />
      {children}
    </>
  );
}
