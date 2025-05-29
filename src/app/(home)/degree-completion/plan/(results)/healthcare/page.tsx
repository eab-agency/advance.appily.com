/* eslint-disable react/no-unescaped-entities */
"use client";
// import computerWhiz from "@/assets/lotties/computerWhiz.json";
// import Lottie from "lottie-react";

import {
  AccordionSection,
  CareerPaths,
  LinkedCardsSection,
  SubNavPlan,
  TabsSection,
  Testimonial,
  TextWithImage,
} from "@/components";
import BuildPlanHero from "@/components/Heros/BuildPlanHero";
import data from "@/data/AdcResults/results-health-plan.json";

import StatisticsSection from "@/blocks/StatisticsSection";

export default function Page() {
  return data ? (
    <>
      <div className="resultContent">
        <BuildPlanHero data={data.heroSection} />

        <SubNavPlan />

        <AccordionSection id="value-of-a-degree" data={data.reasons} />

        <StatisticsSection
          statistics={data.stats}
          source={data.statsSource}
          statsLayoutWidth="contained"
        />

        <Testimonial testimonialData={data.testimonial} />

        <TabsSection
          id="funding-your-degree"
          data={data.fundingYourDegree}
          className="no-content-media"
        />

        <AccordionSection data={data.fileFafsa} newTab={true} />

        <StatisticsSection
          statistics={data.fileFafsa.stats}
          source={data.fileFafsa.statsSource}
          statsLayoutWidth="contained"
        />

        <AccordionSection data={data.fileFafsa.moreWays} />

        <LinkedCardsSection data={data.tools} />

        <TabsSection id="career-paths" data={data.careersPaths} />

        <CareerPaths careerPaths={data.topCareers} />

        <StatisticsSection
          statistics={data.topCareers.stats}
          source={data.topCareers.statsSource}
          statsLayoutWidth="contained"
        />

        <TabsSection id="degrees-and-schools" data={data.degreeGoals} />

        <CareerPaths careerPaths={data.bachelorDegrees} />

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
    </>
  ) : null;
}
