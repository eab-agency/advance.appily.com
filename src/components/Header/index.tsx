import styles from "@/styles/components/PageHeader.module.scss";
import Link from "next/link";
import React from "react";
import MainLogo from "./MainLogo";
import { NavBar } from "./NavBar";
import { fetchHeader } from "@/app/graphql";
import { Header } from "../../../payload-types";

export default async function HeaderComponent() {
  const header: Header = await fetchHeader();

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
  );
}
