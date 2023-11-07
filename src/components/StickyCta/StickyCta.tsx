"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components";
import styles from "@/styles/components/StickyCta.module.scss";

import { useUser } from "@/context/context";
import { usePathname, useRouter } from "next/navigation";

interface stickyProps {
	trackedElement?: React.RefObject<HTMLElement> | null;
}

const StickyCta: React.FC<stickyProps> = ({ trackedElement }) => {
	const { matchedSchools } = useUser();

	const [scrolled, setScrolled] = useState(false);
	const [posY, setPosY] = useState(0);

	const currentPath = usePathname();

	const quizRoute = currentPath?.includes("business")
		? "/careers/business/quiz"
		: "/careers/healthcare/quiz";

	useEffect(() => {
		if (trackedElement) {
			const trackedElementPosY = trackedElement.current?.offsetTop;
			setPosY(trackedElementPosY || 0);
		}
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
		trackedElement && scrolled ? styles.scrolled : ""
	}`;

	const handleClick = () => {
		if (trackedElement) {
			window.scrollTo({
				top: posY,
				behavior: "smooth",
			});
		}
	};

	if (matchedSchools.length === 0) {
		return null; // Return null to show nothing
	}

	return (
		<div className={stickyCtaClass}>
			{trackedElement ? (
				<Button
					type="button"
					onClick={handleClick}
					appearance="primary"
					className="button btn-primary"
					label="Explore Your School Matches"
				/>
			) : (
				<Button
					type="button"
					label="Take the Quiz"
					href={quizRoute}
					className="button btn-primary"
				/>
			)}
		</div>
	);
};

export default StickyCta;