"use client";
import React, { useEffect, useState } from "react";
import { CMSLink } from "@/components/Link";

import { Button } from "@/components";
import styles from "@/styles/components/StickyCta.module.scss";


interface stickyProps {
  trackedElement?: React.RefObject<HTMLElement> | null;
  ctaLabel?: string;
  stickyctaLinks?: { link: {
    type?: 'reference' | 'custom';
    newTab?: boolean;
    reference: {
      value: string;
      relationTo: 'pages';
    };
    url: string;
    label: string;
    appearance?: 'default' | 'primary' | 'secondary';
  };
  id?: string;
}[];
resultPage?: string;
}

const StickyCta: React.FC<stickyProps> = ({ trackedElement, ctaLabel, stickyctaLinks, resultPage }) => {

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
      
      {!resultPage ?  
         ( stickyctaLinks && stickyctaLinks?.length > 0 &&
            (stickyctaLinks || []).map(({ link }, index) => {
              return (
                <CMSLink key={index} {...link} className="button btn-primary btn-click-quiz" />
              )
            })
          ) : ( <Button
            type="button"
            onClick={handleClick}
            appearance="primary"
            className="button btn-primary"
            label="Explore Your School Matches"
          />) }
    </div>
  );
};

export default StickyCta;
