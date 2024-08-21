/* eslint-disable react/no-unescaped-entities */
"use client";
import moneyMaestro from "@/assets/lotties/moneyMaestro.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { Suspense } from "react";

import data from "@/data/results-money-maestro.json";
import { useEffect, useRef } from "react";

import {
  CareerPaths,
  CarouselWithForm,
  ChoosingRightSchoolBusinessDegree,
  KeepExploring,
  StickyCta,
  SubNav,
  Tabs,
  TextWithImage,
  WhatDegrees,
} from "@/components";
import { useUser } from "@/context/context";
import dataLinks from "@/data/links-business.json";

import StatisticsSection from "@/blocks/StatisticsSection";

function TabsFallback() {
  return <>Tabs loading...</>;
}

export default function Page() {
  const carouselRef = useRef(null);
  const { results: links } = dataLinks;
  const { setVertical, vertical } = useUser();
  useEffect(() => {
    setVertical("Business");
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
                dangerouslySetInnerHTML={{ __html: data.detailedDescription }}
              />
            </div>
            <figure className="column">
              <Lottie animationData={moneyMaestro} loop={true} />
            </figure>
          </div>
        </section>

        {links && <SubNav links={links} />}

        <Suspense fallback={<TabsFallback />}>
          <Tabs className="react-tabs" tabs={data.tabs} />
        </Suspense>

        <CareerPaths careerPaths={data.careerPaths} />

        <StatisticsSection statistics={data.stats} source={data.statsSource} statsLayoutWidth="contained" />

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
          <CarouselWithForm formId="7" collectData={false} />
        </div>

        <ChoosingRightSchoolBusinessDegree />
        <KeepExploring trackedElement={carouselRef} />
      </div>
      <StickyCta trackedElement={carouselRef} />
    </>
  );
}
