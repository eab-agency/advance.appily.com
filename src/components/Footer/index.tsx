'use client'
import { fetchFooter } from "@/app/graphql";
import { Button } from "@/components";
import styles from "@/styles/components/PageFooter.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Footer } from "../../../payload-types";
import { CMSLink } from "../Link";

const FooterComponent = () => {
  const [footer, setFooter] = useState<Footer | null>(null);

  useEffect(() => {
    const getFooter = async () => {
      try {
        const footerData = await fetchFooter();
        setFooter(footerData);
      } catch (error) {
        console.error('Failed to fetch footer:', error);
      }
    };

    getFooter();
  }, []);

  const privacyClick = () => {
    if (
      typeof window.OneTrust === "undefined" ||
      typeof window.OneTrust.ToggleInfoDisplay !== "function"
    ) {
      return;
    }
    window.OneTrust.ToggleInfoDisplay();
  };

  const navItems = footer?.navItems || [];

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
              {navItems && navItems?.length > 0 && (navItems.map(({ link }, index) => (
                <li key={index}>
                  {/* @ts-ignore */}
                  <CMSLink
                    {...link}
                    appearance={'default'}
                  />
                </li>
              )))}
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

export default FooterComponent;
