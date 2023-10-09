import Image from "next/image";
import styles from "../styles/modules/PageFooter.module.scss";

export default function PageFooter() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles["page-footer"]}>
			<div className={styles.wrapper}>
				<div className={styles.logoLegal}>
					<figure className={styles.logo}>
						<Image src="/images/appily-logo-dark.svg" alt="Appily Logo" fill />
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
							<li>
								<a
									href="#"
									rel="noreferrer"
									onClick={e => {
										e.preventDefault();
										window.OneTrust.ToggleInfoDisplay();
									}}
								>
									Privacy Preferences
								</a>
							</li>
						</ul>
					</div>
					<div className="copyright">
						<p>
							© {currentYear} All rights reserved.{" "}
							<a href="https://www.appily.com" target="_blank" rel="noreferrer">
								www.Appily.com
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
