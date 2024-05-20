import { Button } from "@/components";
import styles from "@/styles/components/PageFooter.module.scss";
import Image from "next/image";
import { CMSLink } from "../Link";
import { Footer } from "../../../payload-types";
import {  fetchFooter } from "@/app/graphql";

const FooterComponent = async () => {
  // const privacyClick = () => {
  //   if (
  //     typeof window.OneTrust === "undefined" ||
  //     typeof window.OneTrust.ToggleInfoDisplay !== "function"
  //   ) {
  //     return;
  //   }
  //   window.OneTrust.ToggleInfoDisplay();
  // };
  let footer: Footer | null = null;

  try {
    footer = await fetchFooter()
  } catch (error) {
    // When deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // So swallow the error here and simply render the footer without nav items if one occurs
    // in production you may want to redirect to a 404  page or at least log the error somewhere
    // console.error(error)
  }

  const navItems = footer?.navItems || []
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
            {navItems?.map(({ link },index) => {
              return (
                <li key={index}>
                <CMSLink key={index}
                {...link} 
                appearance={'default'}
                // className={isActive ? styles.active : styles.nonActive} 
                />
              </li>
              )
				})}
              {/* <li>
                <Button
                  type="button"
                  className={styles.privacyButton}
                  onClick={privacyClick}
                  label="Privacy Preferences"
                />
              </li> */}
            </ul>

          </nav>
        </div>

      </div>
    </footer>
  );
};

export default FooterComponent;