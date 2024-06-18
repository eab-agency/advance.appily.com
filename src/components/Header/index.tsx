

import styles from "@/styles/components/PageHeader.module.scss";
import { Link as LinkType } from "@/types";
import Link from "next/link";
import React from "react";
import MainLogo from "./MainLogo";
import { NavBar } from "./NavBar";
import { fetchGlobals, fetchHeader } from "@/app/graphql";
import { Header } from "../../../payload-types";

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


