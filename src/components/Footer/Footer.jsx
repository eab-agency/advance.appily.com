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
				<div className={styles.legalInfo}>
				<figure className={styles.logo}>
					<Image src="/images/appily-logo.svg" alt="Appily Logo" fill />
				</figure>
				<div className={styles.legalLinks}>
                        <ul>
                            <li>
                                <a
                                    href="https://www.appily.com/about"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.appily.com/terms-and-conditions"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Terms and Conditions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.appily.com/privacy-policy"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://privacy.eab.com/appily-cs-tours-CA"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    California Privacy Notice
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.appily.com/your-privacy-rights"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Do Not Sell or Share My Personal Information
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.appily.com/data"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Data Attribution
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.appily.com/your-privacy-rights"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Personal Information Protection
                                </a>
                            </li>
                        </ul>
                    </div>
				<div className={styles.copyright}>
					<p>
						© {new Date().getFullYear()} All rights reserved.{" "}
						<a href="https://www.appily.com">www.Appily.com</a>
					</p>
				</div>
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
