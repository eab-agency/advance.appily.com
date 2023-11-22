/* eslint-disable react/no-unescaped-entities */
"use client";
import veryReady from "@/assets/lotties/very-ready-dark-mode.json";
import AdcResultsHero from "@/components/Heros/AdcResultsHero";
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
import heroData from "@/data/AdcResults/adc-readyness-results.json";
import data from "@/data/AdcResults/results-not-ready.json";
import dataLinks from "@/data/links-business.json";

export default function Page() {
  const carouselRef = useRef(null);
  const { results: links } = dataLinks;
  const { setVertical, vertical } = useUser();
  useEffect(() => {
    setVertical("adc");
  }, []);


  return data ? (
    <>
      <div className="resultContent">
        <AdcResultsHero
          data={heroData.veryReady}
          animationData={veryReady}
        />

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
