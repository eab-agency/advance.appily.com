"use client";
import { Button } from "@/components";
import styles from "@/styles/components/PageFooter.module.scss";

function PrivacyLink() {
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
    <Button
      type="button"
      className={styles.privacyButton}
      onClick={privacyClick}
      label="Privacy Preferences"
    />
  );
}

export default PrivacyLink;
