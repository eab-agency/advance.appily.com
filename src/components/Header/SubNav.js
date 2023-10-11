"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { MdClose, MdMenu } from "react-icons/md";

import styles from "@/styles/components/SubNav.module.scss";

export function SubNav({ links }) {
	const pathname = usePathname();

	// const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Note: AO - Prevent scrolling when the menu is open.

	// const toggleMenu = () => {
	// 	if (isMenuOpen) {
	// 		setIsMenuOpen(false);
	// 		// pageBody.style.overflow = 'visible';
	// 	} else {
	// 		setIsMenuOpen(true);
	// 		// pageBody.style.overflow = 'hidden';
	// 	}
	// };

	return (
		<nav className={styles.subNavigation}>
			{/* <button
				type="button"
				className={isMenuOpen ? styles.hamburgerOpen : styles.hamburgerClose}
				onClick={toggleMenu}
			>
				{isMenuOpen ? <MdClose /> : <MdMenu />}
			</button> */}
			<h2>Explore Results</h2>
			<ul className={styles.subNavItems}>
				{links.map(({ href, label }) => {
					const isActive = pathname === href;
					return (
						<li key={`${href}${label}`}>
							<Link
								href={href}
								className={isActive ? styles.active : styles.nonActive}
								// onClick={toggleMenu}
							>
								{label}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
