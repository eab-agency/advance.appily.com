/* eslint-disable react/no-unescaped-entities */
"use client";
import creativeMarketer from "@/assets/lotties/creativeMarketer.json";
import Lottie from "lottie-react";
import Image from "next/image";
import { Suspense, useState } from "react";
import { useEffect, useRef } from "react";

import {
  CareerPaths,
  CarouselWithForm,
  IconCard,
  KeepExploring,
  StickyCta,
  SubNav,
  Tabs,
  TextWithImage,
  WhatDegrees,
} from "@/components";

import { useUser } from "@/context/context";
import dataLinks from "@/data/links-education.json";
import data from "@/data/results/education/educator.json";

import StatisticsSection from "@/blocks/StatisticsSection";

function TabsFallback() {
  return <>Tabs loading...</>;
}

export default function Page() {
  const carouselRef = useRef(null);
  const { results: links } = dataLinks;
  const { setVertical, vertical } = useUser();
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
  }, []);

  useEffect(() => {
    setVertical("Education");
  }, [setVertical]);
  return (
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
                dangerouslySetInnerHTML={{
                  __html: data.detailedDescription,
                }}
              />
            </div>
            <figure className="column">
              <Image
                src="/images/education/education_educator.svg"
                width={478}
                height={284}
                alt="The Educator"
              />
              {/* <Lottie animationData={creativeMarketer} loop={true} /> */}
            </figure>
          </div>
        </section>

        {links && <SubNav links={links} />}

        <Suspense fallback={<TabsFallback />}>
          <Tabs className="react-tabs" tabs={data.tabs} />
        </Suspense>

        <CareerPaths careerPaths={data.careerPaths} />

        <StatisticsSection statistics={data.stats} source={data.statsSource} statsLayoutWidth="contained" />

        <WhatDegrees whatDegreesData={data.degreeTabs} />

        <section className="comparison">
          <div className="group column center-aligned center-justified">
            <div className="intro-text">
              <h2
                dangerouslySetInnerHTML={{
                  __html: data.introComparison.title,
                }}
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: data.introComparison.description,
                }}
              />
            </div>

            <div className="infograph row cols-2">
              <IconCard
                title={data.introComparison.cards[0].card.title}
                iconUrl={
                  themeMode === "dark"
                    ? data.introComparison.cards[0].card.iconLight
                    : data.introComparison.cards[0].card.iconDark
                }
                iconAlt="ROI (Return on Investment) icon"
                className="roi-card"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.introComparison.cards[0].card.description,
                  }}
                />
              </IconCard>

              <IconCard
                title={data.introComparison.cards[1].card.title}
                iconUrl={
                  themeMode === "dark"
                    ? data.introComparison.cards[1].card.iconLight
                    : data.introComparison.cards[1].card.iconDark
                }
                iconAlt="Career Opportunities icon"
                className="career-card"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.introComparison.cards[1].card.description,
                  }}
                />
              </IconCard>
            </div>
          </div>
        </section>

        {/* <div
					id="explore-your-school-matches"
					className="carouselWithForm"
					ref={carouselRef}
				>
					<CarouselWithForm formId="7" collectData={false} />
				</div> */}
        <TextWithImage
          content={data.textWithImage.content}
          imagePath={data.textWithImage.imagePath}
          className="whatever-you-need"
          altText={data.textWithImage.altText}
        />
        {/* <KeepExploring trackedElement={carouselRef} /> */}
      </div>

      {/* <StickyCta trackedElement={carouselRef} /> */}
    </>
  );
}
