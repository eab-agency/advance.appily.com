"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components";
import styles from "@/styles/components/StickyCta.module.scss";

const StickyCta = ({ trackedElement}) => {
	const [scrolled, setScrolled] = useState(false);
	const [posY, setPosY] = useState(0);
  const [quizLink, setQuizLink] = useState('');

	useEffect(() => {
		const trackedElementPosY = trackedElement.current.offsetTop;
		setPosY(trackedElementPosY);
    // const quizLinkt = quizLink;

    const trackedElementClass =
    trackedElement.current.className.toLowerCase();

setQuizLink(trackedElementClass);

console.log(trackedElementClass)
console.log(trackedElement)


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

  if (quizLink.includes('quiz')) {
    return (
        <div className={stickyCtaClass}>
            <Button
                type="primary"
                label="Take the Quiz"
                href="/careers/healthcare/quiz-start"
                className={styles.button}
            />
        </div>
    );
}

	return (
		<div className={stickyCtaClass}>
			<Button type="button" onClick={handleClick} appearance="primary" className="button btn-primary" label="Explore Your School Matches" />
		</div>
	);
};

export default StickyCta;
