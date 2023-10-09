"use client";

import styles from "@/styles/components/PageFooter.module.scss";
import Image from "next/image";
import React from "react";
import { MdOutlinePrivacyTip } from "react-icons/md";

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
