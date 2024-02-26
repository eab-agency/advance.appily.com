"use client";

import { Button } from "@/components";
import { useUser } from "@/context/context";
import styles from "@/styles/components/PageFooter.module.scss";
import Image from "next/image";

const Footer = () => {
  const { location } = useUser()
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
          <div className={styles.logoContainer}>
          <figure className={styles.logo}>
            <Image src="/images/appily-logo.svg" alt="Appily Logo" fill />
          </figure>
          <div className={styles.copyright}>
            <p>
              © {new Date().getFullYear()} All rights reserved.{" "}
              <a href="https://www.appily.com">www.Appily.com</a>
            </p>
          </div>
          </div>
          <nav className={styles.legalLinks}>
            <ul className="footer-col-1">
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
              {/* </ul>
              <ul className="footer-col-2"> */}
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
              {/* </ul>
              <ul className="footer-col-3"> */}

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
              {/* </ul>
              <ul className="footer-col-4"> */}
              <li>
                <Button
                  type="button"
                  className={styles.privacyButton}
                  onClick={privacyClick}
                  label="Privacy Preferences"
                />
              </li>
            </ul>

          </nav>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
