import Image from "next/image";
import React from 'react'
import { BiLinkExternal } from "react-icons/bi";

interface KeepExploringProps {
  keepExploringData?: KeepExploringData;
}

interface KeepExploringData {
  title: string;
  description: string;
  image: string;
}


function KeepExploring({ keepExploringData }: KeepExploringProps) {

  return (
    <section className="keepExploring">
      <div className="group column">
        <figure className="backgroundImage">
          <Image
            src="/images/ready-to-find-your-role.jpg"
            width={900}
            height={900}
            alt="Take our free quiz"

          />
        </figure>
        <div className="contentWrapper">
          <h2>Keep exploring</h2>
          <p>
            Much of the career, education, and salary information above was
            sourced from the Bureau of Labor Statistics. You can find
            state-specific job outlooks and salary details as well as even
            more information on related careers on their website.
          </p>
          <a
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
          </a>
        </div>
      </div>
    </section>
  )
}

export default KeepExploring;

