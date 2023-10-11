import styles from "@/styles/components/PageHeader.module.scss";
import React from "react";
import MainLogo from "./MainLogo";
import { NavBar } from "./NavBar";

interface HeaderProps {
	links?: Link[] | undefined; // replace string[] with the actual type of your links
}

interface Link {
	href: string;
	label: string;
}

export const Header: React.FC<HeaderProps> = ({ links }) => {
	return (
		<header className={`${styles.pageHeader} ${links ? "" : styles.noNav}`}>
			<div className={styles.container}>
				<MainLogo />
				{links && <NavBar links={links} />}
			</div>
		</header>
	);
};
