/* eslint-disable react/no-unescaped-entities */
"use client";
import fearlessLeader from "@/assets/lotties/fearlessLeader.json";
import Lottie from "lottie-react";
import { useRef } from "react";
import { BiLinkExternal } from "react-icons/bi";
import useSWR from "swr";

import {
  Accordion,
  CareerPaths,
  CarouselWithForm,
  Stats,
  StickyCta,
  Tabs,
  TextWithImage,
} from "@/components";

import data from "@/data/results-creative-marketer.json";

export default function Page() {
  const carouselRef = useRef(null);

  return (
    <>
      
      <div className="resultContent">
        <section className="resultsHero">
          <div className="group">
            <div className="heroContent column">
              <div className="intro-title">Your ideal role could be ...</div>
              <h1>{data.title}</h1>
              <p>{data.detailedDescription}</p>
            </div>
            <figure className="column">
            <Lottie animationData={fearlessLeader} loop={true} />
              </figure>
          </div>
        </section>

        <Tabs className="react-tabs" tabs={data.tabs} />

        <CareerPaths careerPaths={data.careerPaths} />

        <Stats stats={data.stats} source={data.statsSource} />

        <TextWithImage
          content={data.textWithImage.content}
          imagePath={data.textWithImage.imagePath}
          className="whatever-you-need"
        />

        <section>
          <h3>{data.degreeTabs.title}</h3>
          <p>{data.degreeTabs.description}</p>
          {data.degreeTabs.degrees.map(degree => (
            <Accordion title={degree.title}>
              <div dangerouslySetInnerHTML={{ __html: degree.content }} />
            </Accordion>
          ))}
        </section>

        <div
          id="explore-your-school-matches"
          className="carouselWithForm"
          ref={carouselRef}
        >
          <CarouselWithForm formId="3" />
        </div>

        <section className="keepExploring">
          <div className="sourceContent">
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
              className="button btn-secondary"
            >
              Bureau of Labor Statistics{" "}
              <i>
                <BiLinkExternal />
              </i>
            </a>
          </div>
        </section>
      </div>

      <StickyCta trackedElement={carouselRef} />
    </>
  );
};
