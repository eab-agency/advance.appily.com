"use client";
import React, { useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";

import { Button } from "@/components";
import styles from "@/styles/global/components/StickyCta.module.scss";

const StickyCta = ({ trackedElement }) => {
	const [scrolled, setScrolled] = useState(false);
	const [posY, setPosY] = useState(0);

	useEffect(() => {
		const trackedElementPosY = trackedElement.current.offsetTop;
		setPosY(trackedElementPosY);
	}, [trackedElement]);

	useEffect(() => {
		const handleScroll = () => {
			const trigger = posY - 200;

			if (window.scrollY >= trigger) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [posY, trackedElement]);

	const stickyCtaClass = `${styles.stickyCta} ${
		scrolled ? styles.scrolled : ""
	}`;

	const handleClick = () => {
		window.scrollTo({
			top: posY,
			behavior: "smooth",
		});
	};

	return (
		<div className={stickyCtaClass}>
			<Button type="button" onClick={handleClick} appearance="primary">
				<span>Explore Your School Matches</span>
				<i>
					<MdChevronRight />{" "}
				</i>
			</Button>
		</div>
	);
};

export default StickyCta;
