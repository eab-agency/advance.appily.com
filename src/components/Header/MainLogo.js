"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import logoDark from "../../../public/images/appily-logo-horizontal-white.svg";
import logoLight from "../../../public/images/appily-logo-horizontal-black.svg";

import styles from "@/styles/components/MainLogo.module.scss";

export default function MainLogo() {
	const [logo, setLogo] = useState(null);

	useEffect(() => {
		const matchColorMode = window.matchMedia("(prefers-color-scheme: dark)");

		const logoLight = "/images/appily-logo-horizontal-black.svg";
		const logoDark = "/images/appily-logo-horizontal-white.svg";

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
			{logo && (
				<Image
					src={logo}
					alt="Appily Advance Logo"
					width={100}
					height={19}
					priority={true}
				/>
			)}
		</figure>
	);
}
