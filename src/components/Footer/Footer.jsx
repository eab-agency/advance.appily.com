"use client";

import { Button } from "@/components";
import styles from "@/styles/components/PageFooter.module.scss";
import Image from "next/image";

const Footer = () => {
  const privacyClick = () => {
    if (
      typeof window.OneTrust === "undefined" ||
      typeof window.OneTrust.ToggleInfoDisplay !== "function"
    ) {
      return;
    }
    window.OneTrust.ToggleInfoDisplay();
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
              <li>
                <Button
                  type="button"
                  className={styles.privacyButton}
                  onClick={privacyClick}
                  label="Privacy Settings"
                />
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
      </div>
    </footer>
  );
};

export default Footer;
