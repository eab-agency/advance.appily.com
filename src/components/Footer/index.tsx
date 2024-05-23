"use client";
import styles from "@/styles/components/PageFooter.module.scss";
import Image from "next/image";
import { CMSLink } from "../Link";
import { Footer } from "../../../payload-types";
import { fetchFooter } from "@/app/graphql";
import PrivacyLink from "./PrivacyLink";
import { useEffect, useState } from "react";

const FooterComponent = () => {
  const [footer, setFooter] = useState<Footer | null>(null);

  useEffect(() => {
    const getFooter = async () => {
      try {
        const footerData = await fetchFooter();
        setFooter(footerData);
      } catch (error) {
        console.error("Failed to fetch footer:", error);
      }
    };

    getFooter();
  }, []);

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
              {navItems?.map(({ link }, index) => {
                return (
                  <li key={index}>
                    <CMSLink
                      key={index}
                      {...link}
                      appearance={"default"}
                      // className={isActive ? styles.active : styles.nonActive}
                    />
                  </li>
                );
              })}
              <li>
                <PrivacyLink />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
