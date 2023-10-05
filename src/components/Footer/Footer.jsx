"use client";

import Image from "next/image";
import React from "react";
import { MdHelpOutline, MdOutlinePrivacyTip } from "react-icons/md";
import { Reoverlay } from "reoverlay";

import { HelpModal, PrivacyModal } from "@/components/Modals";
import styles from "@/styles/components/PageFooter.module.scss";

const Footer = () => {
	const helpClick = () => {
		Reoverlay.showModal(HelpModal, {});
	};
	const privacyClick = () => {
		Reoverlay.showModal(PrivacyModal, {});
	};

	return (
		<footer className={styles.pageFooter}>
			<div className={styles.wrapper}>
				<figure className={styles.logo}>
					<Image src="/images/appily-logo.svg" alt="Appily Logo" fill />
				</figure>
				<div className="copyright">
					<p>
						© {new Date().getFullYear()} All rights reserved.{" "}
						<a href="https://www.appily.com">www.Appily.com</a>
					</p>
				</div>
				<div className="help-privacy">
					<ul>
						<li>
							<button
								type="button"
								className={styles.helpPrivBtn}
								onClick={helpClick}
							>
								<MdHelpOutline />
								Help
							</button>
						</li>
						<li>
							<button
								type="button"
								className={styles.helpPrivBtn}
								onClick={privacyClick}
							>
								<MdOutlinePrivacyTip />
								Privacy
							</button>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
