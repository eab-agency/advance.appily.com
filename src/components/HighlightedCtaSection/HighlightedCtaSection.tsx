"use client";
import { Button } from "@/components";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, } from 'react';
import { BiLinkExternal } from "react-icons/bi";

interface highlightedCtaSectionProps {
  highlightedCtaSectionData?: highlightedCtaSectionData;
  trackedElement?: React.RefObject<HTMLDivElement> | null;
}

interface highlightedCtaSectionData {
  title: string;
  description: string;
  image: string;
}

export default function HighlightedCtaSection({ highlightedCtaSectionData, trackedElement }: highlightedCtaSectionProps) {

  const [scrolled, setScrolled] = useState(false);
  const [posY, setPosY] = useState(0);

  useEffect(() => {
    if (trackedElement?.current) {
      const trackedElementPosY = trackedElement.current.offsetTop;
      setPosY(trackedElementPosY);
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

  const handleClick = () => {
    window.scrollTo({
      top: posY,
      behavior: "smooth",
    });
  };

  return (
    <section className="keepExploring">
      <div className="group column">
        <figure className="backgroundImage">
          <Image
            src="/images/ready-to-find-your-role-wide.jpg"
            width={900}
            height={900}
            alt="Take our free quiz"

          />
        </figure>
        <div className="contentWrapper">
          <h2>Ready to Make a Plan?</h2>
          <p>
            No matter where you&apos;re at right now, a tailored plan can make all the difference. From pinpointing the right degree to uncovering financial aids and job prospects, we&apos;re here to help guide your next steps.
          </p>
          <Button href="build-plan-quiz" className="button btn-primary" label="Make My Back-to-School Plan" />
        </div>
      </div>
    </section>
  )
}
