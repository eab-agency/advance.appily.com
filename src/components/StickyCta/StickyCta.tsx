"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components";
import styles from "@/styles/components/StickyCta.module.scss";

import { useUser } from "@/context/context";
import { usePathname } from "next/navigation";

interface stickyProps {
  trackedElement?: React.RefObject<HTMLElement> | null;
  ctaLabel?: string;
}

const StickyCta: React.FC<stickyProps> = ({ trackedElement, ctaLabel }) => {
  const { matchedSchools } = useUser();

  const [scrolled, setScrolled] = useState(false);
  const [posY, setPosY] = useState(0);

  const currentPath = usePathname();

  let quizRoute;
  if (currentPath?.includes("business")) {
    quizRoute = "/careers/business/quiz";
  } else if (currentPath?.includes("degree-completion")) {
    quizRoute = "https://my.appily.com/register/adult/buildplanquiz1";
  } else if (currentPath?.includes("education")) {
    quizRoute = "/careers/education/quiz";
  } else {
    quizRoute = "/careers/healthcare/quiz";
  }

  useEffect(() => {
    if (trackedElement) {
      const trackedElementPosY = trackedElement.current?.offsetTop;
      setPosY(trackedElementPosY || 0);
    }
  }, [trackedElement]);

  useEffect(() => {
    const handleScroll = () => {
      const trigger = posY - 200;
      const postTrigger = posY + 600;

      if (window.scrollY >= trigger && window.scrollY <= postTrigger) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posY, trackedElement]);

  const stickyCtaClass = `${styles.stickyCta} ${
    trackedElement && scrolled ? styles.scrolled : ""
  }`;

  const handleClick = () => {
    if (trackedElement) {
      window.scrollTo({
        top: posY,
        behavior: "smooth",
      });
    }
  };

  if (matchedSchools.length === 0) {
    return null; // Return null to show nothing
  }

  const ctaText = ctaLabel || "Take the Quiz";

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
          label={ctaText}
          href={quizRoute}
          className="button btn-primary btn-click-quiz"
        />
      )}
    </div>
  );
};

export default StickyCta;
