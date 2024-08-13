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
import data from "@/data/results/education/advocate.json";

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
                src="/images/education/education_advocate.svg"
                width={478}
                height={284}
                alt="The Advocate"
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
