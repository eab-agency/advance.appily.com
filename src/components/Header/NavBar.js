"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { MdClose, MdMenu } from "react-icons/md";

import styles from "@/styles/components/NavBar.module.scss";
import { CMSHeaderLink } from "./HeaderLink";

export function NavBar({ links }) {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Note: AO - Prevent scrolling when the menu is open.

	const toggleMenu = () => {
		if (isMenuOpen) {
			setIsMenuOpen(false);
			// pageBody.style.overflow = 'visible';
		} else {
			setIsMenuOpen(true);
			// pageBody.style.overflow = 'hidden';
		}
	};

	return (
		<nav className={styles.navigation}>
			<button
				type="button"
				className={isMenuOpen ? styles.hamburgerOpen : styles.hamburgerClose}
				onClick={toggleMenu}
				aria-label={isMenuOpen ? "Close menu" : "Open menu"}
			>
				{isMenuOpen ? <MdClose /> : <MdMenu />}
			</button>
			<ul className={isMenuOpen ? styles.menuOpen : styles.menuClosed}>
				{links?.map(({ link },index) => {
					// const isActive = pathname === href;
					return (
						<li key={index}>
							<CMSHeaderLink key={index} {...link} 
							onClick={toggleMenu}
							appearance={'default'}
							// className={isActive ? styles.active : styles.nonActive} 
							/>
						</li>
					);
				})}
				<li>
					<Link
						href="https://www.appily.com/"
						target="_blank"
						rel="noopener noreferrer"
						className={styles.externalLink}
					>
						First-Time Freshmen <FiExternalLink />
					</Link>
				</li>
			</ul>
		</nav>
	);
}
