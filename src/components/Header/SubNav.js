"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";

import styles from "@/styles/components/SubNav.module.scss";

export function SubNav({ links }) {
	const pathname = usePathname();

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		if (isMenuOpen) {
			setIsMenuOpen(false);
		} else {
			setIsMenuOpen(true);
		}
	};

	return (
		<nav className={styles.subNavigation}>
			<div className={styles.group}>
				<button
					type="button"
					className={
						isMenuOpen ? styles.resultsBtnOpen : styles.resultsBtnClose
					}
					onClick={toggleMenu}
				>
					<h2>Explore Results</h2>
				</button>
				<ul
					className={`${styles.subNavItems} ${
						isMenuOpen && styles.resultsOpen
					}`}
				>
					{links.map(({ href, label }) => {
						const isActive = pathname === href;
						return (
							<li key={`${href}${label}`}>
								<Link
									href={href}
									className={isActive ? styles.active : styles.nonActive}
								>
									{label}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}
5;
