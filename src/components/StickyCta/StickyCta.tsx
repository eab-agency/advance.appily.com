"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components";
import styles from "@/styles/components/StickyCta.module.scss";

interface stickyProps {
  trackedElement?: React.RefObject<HTMLElement> | null;
}

const StickyCta: React.FC<stickyProps> = ({ trackedElement }) => {
  const [scrolled, setScrolled] = useState(false);
  const [posY, setPosY] = useState(0);

  useEffect(() => {
    if (trackedElement) {
      const trackedElementPosY = trackedElement.current?.offsetTop;
      setPosY(trackedElementPosY || 0);
    }
  }, [trackedElement]);

  useEffect(() => {
    const handleScroll = () => {
      const trigger = posY - 200;

      if (window.scrollY >= trigger) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posY, trackedElement]);

  const stickyCtaClass = `${styles.stickyCta} ${trackedElement && scrolled ? styles.scrolled : ""
    }`;

  const handleClick = () => {
    if (trackedElement) {
      window.scrollTo({
        top: posY,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={stickyCtaClass}>
      {trackedElement ? (
        <Button
          type="button"
          onClick={handleClick}
          appearance="primary"
          className="button btn-primary"
          label="Explore Your School Matches"
        />
      ) : (
        <Button
          type="button"
          label="Take the Quiz"
          href="/quiz-start"
          className="button btn-primary"
        />
      )}
    </div>
  );
};

export default StickyCta;
