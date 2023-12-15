"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "@/styles/components/MainLogo.module.scss";

export default function MainLogo() {
	const [logo, setLogo] = useState(null);

	useEffect(() => {
		const matchColorMode = window.matchMedia("(prefers-color-scheme: dark)");

		const logoLight = "/images/appily-advance-logo-light.svg";
		const logoDark = "/images/appily-advance-logo-dark.svg";

		const handleLogoChange = e => {
			setLogo(e.matches ? logoDark : logoLight);
		};

		matchColorMode.addEventListener("change", handleLogoChange);

		setLogo(matchColorMode.matches ? logoDark : logoLight);

		return () => {
			matchColorMode.removeEventListener("change", handleLogoChange);
		};
	}, []);

	return (
		<figure className={styles["main-logo"]}>
			{logo && <Image src={logo} alt="Appily Logo" width={100} height={19} />}
		</figure>
	);
}
