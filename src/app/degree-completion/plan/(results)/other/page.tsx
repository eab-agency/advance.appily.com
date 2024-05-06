/* eslint-disable react/no-unescaped-entities */
"use client";
// import computerWhiz from "@/assets/lotties/computerWhiz.json";
// import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import {
  AccordionSection,
  CareerPaths,
  CarouselWithForm,
  LinkedCardsSection,
  Stats,
  StickyCta,
  SubNavPlan,
  TabsSection,
  Testimonial,
  TextWithImage,
} from "@/components";
import BuildPlanHero from "@/components/Heros/BuildPlanHero";
import { useUser } from "@/context/context";
import data from "@/data/AdcResults/results-other-plan.json";

export default function Page() {
  const carouselRef = useRef(null);
  const { setVertical, vertical } = useUser();
  useEffect(() => {
    setVertical("ADC");
  }, [setVertical]);
  return data ? (
    <>
      <div className="resultContent">
        <BuildPlanHero data={data.heroSection} />

        <SubNavPlan />

        <AccordionSection id="value-of-a-degree" data={data.reasons} />

        {/* <Stats stats={data.stats} source={data.statsSource} /> */}

        <Testimonial testimonialData={data.testimonial} />

        <TabsSection
          id="funding-your-degree"
          data={data.fundingYourDegree}
          className="no-content-media"
        />

        <AccordionSection data={data.fileFafsa} newTab={true} />

        <Stats
          stats={data.fileFafsa.stats}
          source={data.fileFafsa.statsSource}
        />

        <AccordionSection data={data.fileFafsa.moreWays} />

        <LinkedCardsSection data={data.tools} />

        <TabsSection id="career-paths" data={data.careersPaths} />

        <CareerPaths careerPaths={data.topCareers} />

        <TabsSection id="degrees-and-schools" data={data.degreeGoals} />

        <CareerPaths careerPaths={data.bachelorDegrees} />

        <div
          id="explore-your-school-matches"
          className="carouselWithForm"
          ref={carouselRef}
        >
          <CarouselWithForm formId="15" collectData={false} />
        </div>

        <AccordionSection id="your-next-steps" data={data.yourNextSteps} />

        <TabsSection data={data.topBarriers} />

        <AccordionSection data={data.stepsGuide} />

        <TextWithImage
          content={data.textWithImage.content}
          imagePath={data.textWithImage.imagePath}
          className="whatever-you-need"
          altText={data.textWithImage.altText}
        />
      </div>
      <StickyCta trackedElement={carouselRef} />
    </>
  ) : null;
}
