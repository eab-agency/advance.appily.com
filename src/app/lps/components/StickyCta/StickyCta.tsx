"use client";
import { Button } from "@/components";
import styles from "@/styles/components/StickyCta.module.scss";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface stickyProps {
  scrolToElement?: React.RefObject<HTMLElement> | null;
  ctaLabel?: string;
  trackedElement?: string;
}

const StickyCta: React.FC<stickyProps> = ({ scrolToElement, ctaLabel, trackedElement }) => {
  const [scrolled, setScrolled] = useState(false);
  const [posY, setPosY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const currentPath = usePathname();

  let quizRoute;
  if (currentPath?.includes("business")) {
    quizRoute = "https://my.appily.com/register/adult/businesscareers1/degree";
  } else if (currentPath?.includes("nursing")) {
    quizRoute = "https://my.appily.com/register/adult/healthcarecareers1/degree";
  } else if (currentPath?.includes("medical")) {
    quizRoute = "https://my.appily.com/register/adult/healthcarecareers1/degree";
  } else if(currentPath?.includes("mba")){
    quizRoute="https://my.appily.com/register/adult/businesscareers1/degree";
  }
  else {
    quizRoute = "https://my.appily.com/register/adult/healthcarecareers1/degree";
  }

  useEffect(() => {
    if (trackedElement) {
      const element = document.querySelector(trackedElement);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              setIsHidden(entry.isIntersecting);
            });
          },
          { threshold: 0.1 }
        );

        observer.observe(element);
        return () => observer.disconnect();
      }
    }
  }, [trackedElement]);

  useEffect(() => {
    if (scrolToElement) {
      const trackedElementPosY = scrolToElement.current?.offsetTop;
      setPosY(trackedElementPosY || 0);
    }
  }, [scrolToElement]);

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
  }, [posY, scrolToElement]);

  const stickyCtaClass = `${styles.stickyCta} ${
    scrolToElement && scrolled ? styles.scrolled : ""
  } ${isHidden ? styles.hidden : ""} border border-t-brand-darkteal`;

  const handleClick = () => {
    if (scrolToElement) {
      window.scrollTo({
        top: posY,
        behavior: "smooth",
      });
    }
  };

  const ctaText = ctaLabel || "Take the Quiz";

  return (
    <div className={stickyCtaClass}>
      {scrolToElement ? (
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
