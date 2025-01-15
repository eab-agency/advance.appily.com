

import { fetchHeader } from "@/app/(app)/graphql";
import styles from "@/styles/components/PageHeader.module.scss";
import Link from "next/link";
import { Header } from "../../../payload-types";
import MainLogo from "./MainLogo";
import { NavBar } from "./NavBar";

export default async function HeaderComponent() {
  let header: Header | null = null

  try {
    header = await fetchHeader();

  } catch (error) {
    console.error("Error fetching header:", error);
  };
  return (
    <>
      <header className={`${styles.pageHeader}`}>
        <div className={styles.container}>
          <Link href="/">
            <MainLogo />
          </Link>
          <NavBar links={header?.navItems} />
        </div>
      </header>
    </>
  )
}


