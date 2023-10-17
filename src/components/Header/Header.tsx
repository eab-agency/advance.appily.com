import styles from "@/styles/components/PageHeader.module.scss";
import { Link as LinkType } from "@/types";
import Link from "next/link";
import React from "react";
import MainLogo from "./MainLogo";
import { NavBar } from "./NavBar";

interface HeaderProps {
	links?: LinkType[] | undefined; // replace string[] with the actual type of your links
}

export const Header: React.FC<HeaderProps> = ({ links }) => {
	return (
		<header className={`${styles.pageHeader} ${links ? "" : styles.noNav}`}>
			<div className={styles.container}>
				<Link href="/">
					<MainLogo />
				</Link>
				{links && <NavBar links={links} />}
			</div>
		</header>
	);
};
