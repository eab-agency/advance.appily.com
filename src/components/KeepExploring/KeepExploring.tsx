"use client";
import { Button } from "@/components";
import Image from "next/image";
import React, { useEffect, useState, } from 'react';
import { BiLinkExternal } from "react-icons/bi";

interface KeepExploringProps {
  keepExploringData?: KeepExploringData;
  trackedElement?: React.RefObject<HTMLDivElement> | null;
}

interface KeepExploringData {
  title: string;
  description: string;
  image: string;
}


function KeepExploring({ keepExploringData, trackedElement }: KeepExploringProps) {

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
          <h2>What’s Next?</h2>
          <p>
            Now that you know what type of career path suits you and which type of degree can get you there, the next step is to find a school that can help you reach your goals. All of Appily’s partner schools are high-quality, accredited institutions with in-demand degree programs.
          </p>
          <Button type="button" onClick={handleClick} appearance="primary" className="button btn-primary" label="Explore Your School Matches" />
          {/* <a
            href="https://www.bls.gov/ooh/healthcare/home.htm"
            target="_blank"
            rel="noreferrer"
            className="button externalLink"
          >
            <span>
              Bureau of Labor Statistics{" "}
              <i>
                <BiLinkExternal />
              </i>
            </span>
          </a> */}
        </div>
      </div>
    </section>
  )
}

export default KeepExploring;

