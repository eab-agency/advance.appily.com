"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";

import styles from "@/styles/components/SubNav.module.scss";

export function SubNavPlan() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className={styles.subNavigationPlan}>
			<div className={styles.group}>
				<button
					type="button"
					className={
						isMenuOpen ? styles.resultsBtnOpen : styles.resultsBtnClose
					}
					onClick={toggleMenu}
				>
					<h2>JUMP TO ...</h2>
				</button>
				<ul
					className={`${styles.subNavItems} ${
						isMenuOpen && styles.resultsOpen
					}`}
				>
					<NavItem href="#value-of-a-degree">Value of a Degree</NavItem>
					<NavItem href="#funding-your-degree">Funding Your Degree</NavItem>
					<NavItem href="#career-paths">Career Path</NavItem>
					<NavItem href="#degrees-and-schools">Degrees & Schools</NavItem>
					<NavItem href="#your-next-steps">Your Next Steps</NavItem>
				</ul>
			</div>
		</nav>
	);
}

const NavItem = ({ href, children }) => {
	const pathname = useRouter();
	// const isActive = pathname === href;

	const scrollToWithOffset = (id, offset) => {
		const element = document.querySelector(id);
		if (element) {
			const offsetTop = element.offsetTop - offset;
			window.scrollTo({
				top: offsetTop,
				behavior: "smooth",
			});
		}
	};

	const handleClick = e => {
		e.preventDefault();
		const elementId = href.substring(1);
		scrollToWithOffset(`#${elementId}`, 100);
	};

	const isActive = href => {
		if (pathname.includes(href)) {
			console.log("pathname includes #");
			console.log(pathname);
			return pathname === href;
		}
		// console.log("pathname does not include #");
		// return pathname === href;
	};

	return (
		<li className={isActive ? styles.linkActive : ""}>
			<button type="button" onClick={handleClick}>
				{children}
			</button>
		</li>
	);
};
