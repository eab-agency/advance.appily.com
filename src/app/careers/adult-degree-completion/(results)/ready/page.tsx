/* eslint-disable react/no-unescaped-entities */
"use client";
import computerWhiz from "@/assets/lotties/computerWhiz.json";
import Lottie from "lottie-react";
import { useEffect, useRef } from "react";

import {
  CareerPaths,
  CarouselWithForm,
  ChoosingRightSchoolBusinessDegree,
  KeepExploring,
  Stats,
  StickyCta,
  SubNav,
  Tabs,
  TextWithImage,
  WhatDegrees,
} from "@/components";
import { useUser } from "@/context/context";
import dataLinks from "@/data/links-business.json";
import data from "@/data/results-computer-whiz.json";

export default function Page() {
  const carouselRef = useRef(null);
  const { results: links } = dataLinks;
  const { setVertical, vertical } = useUser();
  useEffect(() => {
    setVertical("Business");
  }, []);
  return data ? (
    <>
      <div className="resultContent">
        <section className="adcResultsHero">
          <h1>When it comes to college, you're <strong>Extremely Ready</strong></h1>

          <p>
            Congratulations! Your results indicate that you're extremely prepared to dive back into the academic world. You've showcased strengths in key areas such as time management, motivation, and support systems, which are crucial for success in higher education. </p>

          <p>Remember, while you're well-prepared, every educational journey comes with its unique challenges. Stay adaptive, keep that confidence high, and embark on this exciting chapter!
          </p>
        </section>

        {/* <section className="resultsHero">
          <div className="group">
            <div className="heroContent column">
              <div className="intro-title">
                <span>Your ideal role could be  ...</span>
              </div>
              <h1>{data.title}</h1>
              <p>{data.detailedDescription}</p>
            </div>
            <figure className="column">
              <Lottie animationData={computerWhiz} loop={true} />
            </figure>
          </div>
        </section> */}

        {links && <SubNav links={links} />}

        <Tabs className="react-tabs" tabs={data.tabs} />

        <CareerPaths careerPaths={data.careerPaths} />

        <Stats stats={data.stats} source={data.statsSource} />

        <TextWithImage
          content={data.textWithImage.content}
          imagePath={data.textWithImage.imagePath}
          className="whatever-you-need"
          altText={data.textWithImage.altText}
        />
        <WhatDegrees whatDegreesData={data.degreeTabs} />

        <div
          id="explore-your-school-matches"
          className="carouselWithForm"
          ref={carouselRef}
        >
          <CarouselWithForm formId="7" />
        </div>
        <ChoosingRightSchoolBusinessDegree />

        <KeepExploring trackedElement={carouselRef} />
      </div>
      <StickyCta trackedElement={carouselRef} />
    </>
  ) : null;
}
