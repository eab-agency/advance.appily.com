"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
// import { MdClose, MdMenu } from "react-icons/md";

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
					<NavItem href="#value-of-a-degree" setIsMenuOpen={setIsMenuOpen}>
						Value of a Degree
					</NavItem>
					<NavItem href="#funding-your-degree" setIsMenuOpen={setIsMenuOpen}>
						Funding Your Degree
					</NavItem>
					<NavItem href="#career-paths" setIsMenuOpen={setIsMenuOpen}>
						Career Path
					</NavItem>
					<NavItem href="#degrees-and-schools" setIsMenuOpen={setIsMenuOpen}>
						Degrees & Schools
					</NavItem>
					<NavItem href="#your-next-steps" setIsMenuOpen={setIsMenuOpen}>
						Your Next Steps
					</NavItem>
				</ul>
			</div>
		</nav>
	);
}

const NavItem = ({ href, children, setIsMenuOpen }) => {
	const pathname = useRouter();
	// const isActive = pathname === href;

	const scrollToWithOffset = id => {
		const element = document.querySelector(id);
		const windowWidth = window.innerWidth;
		const offsetRatio = 0.1;

		if (element) {
			const offset = windowWidth * offsetRatio;
			const offsetTop =
				windowWidth < 1100
					? element.offsetTop - 380
					: element.offsetTop - offset;

			window.scrollTo({
				top: offsetTop,
				behavior: "smooth",
			});
		}
	};

	const handleClick = useCallback(
		e => {
			e.preventDefault();
			const elementId = href.substring(1);
			scrollToWithOffset(`#${elementId}`);
			setIsMenuOpen(false);
		},
		[href, setIsMenuOpen],
	);

	const isActive = href => {
		if (pathname.includes(href)) {
			// console.log("pathname includes #");
			// console.log(pathname);
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
