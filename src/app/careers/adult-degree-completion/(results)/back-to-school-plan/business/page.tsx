/* eslint-disable react/no-unescaped-entities */
"use client";
// import computerWhiz from "@/assets/lotties/computerWhiz.json";
// import Lottie from "lottie-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import {
  Accordion,
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
import data from "@/data/AdcResults/results-business-plan.json";
import dataLinks from "@/data/links-business.json";

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
        <section className="resultsHero">
          <div className="group">
            <div className="heroContent column">
              <div className="intro-title">
                <span>Your ideal role could be ...</span>
              </div>
              <h1>{data.title}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: data.detailedDescription }}
              />
            </div>
            <figure className="column">
              {/* <Lottie animationData={computerWhiz} loop={true} /> */}
              <Image
                src="/images/build-plan/business-plan.svg"
                alt="Your business back to school plan"
                width={400}
                height={400}
              />
            </figure>
          </div>
        </section>

        {links && <SubNav links={links} />}

        <section className="whyChoose">
          <div className="group center-aligned cols-2">
            <div className="column">
              <div className="intro">
                <h2>
                  Is Earning My Bachelor’s Degree{" "}
                  <strong>Really Worth It?</strong>
                </h2>
                {/* <p
                  dangerouslySetInnerHTML={{
                    __html: data.whyChoose.description,
                  }}
                />*/}
              </div>
              <div className="accordion-group">
                {data.reasons.map((reason, index) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <Accordion key={index} title={reason.title}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: reason.description,
                      }}
                    />
                  </Accordion>
                ))}
              </div>
            </div>
            <div className="column">
              <figure className="highlighted-img">
                <Image
                  src="/images/whats-the-difference-mba-specific-master.jpg"
                  width={480}
                  height={480}
                  alt="Man using a tablet device"
                />
              </figure>
            </div>
          </div>
        </section>

        <WhatDegrees whatDegreesData={data.degreeTabs} />

        <Tabs className="react-tabs" tabs={data.tabs} />

        <CareerPaths careerPaths={data.careerPaths} />

        <Stats stats={data.stats} source={data.statsSource} />

        <TextWithImage
          content={data.textWithImage.content}
          imagePath={data.textWithImage.imagePath}
          className="whatever-you-need"
          altText={data.textWithImage.altText}
        />

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
