/* eslint-disable react/no-unescaped-entities */
"use client";
// import computerWhiz from "@/assets/lotties/computerWhiz.json";
// import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";


import {
  Accordion,
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
import data from "@/data/AdcResults/results-business-plan.json";

export default function Page() {
  const carouselRef = useRef(null);
  const { setVertical, vertical } = useUser();
  useEffect(() => {
    setVertical("Business");
  }, []);
  return data ? (
    <>
      <div className="resultContent">
        <BuildPlanHero data={data.heroSection} />

        <SubNavPlan />

        <AccordionSection data={data.reasons} />

        <Stats stats={data.stats} source={data.statsSource} />

        <Testimonial testimonialData={data.testimonial} />

        <TabsSection data={data.fundingYourDegree} />

        <AccordionSection data={data.fileFafsa} />

        <Stats stats={data.fileFafsa.stats} source={data.fileFafsa.statsSource} />

        <section className="moreWaysToSave whyChoose">
          <div className="group center-aligned cols-2">
            <div className="column">
              <div className="intro">
                <h2>
                  3 More Ways to{" "}
                  <strong>Save Money on Your Degree</strong>
                </h2>
                <p>Finding ways to cover tuition and other college costs is important — but you may also consider these ways to decrease the amount that needs covering.</p>
              </div>
              <div className="accordion-group">
                {data.fileFafsa.moreWays.map((reason, index) => (
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
                  src="/images/build-plan/more-ways-to-save.jpg"
                  width={480}
                  height={480}
                  alt="Student filing their FAFSA"
                />
              </figure>
            </div>
          </div>
        </section>

        <LinkedCardsSection data={data.tools} />

        <TabsSection data={data.careersPaths} />

        <CareerPaths careerPaths={data.topCareers} />

        <Stats stats={data.topCareers.stats} source={data.topCareers.statsSource} />

        <TabsSection data={data.degreeGoals} />

        <CareerPaths careerPaths={data.bachelorDegrees} />

        <div
          id="explore-your-school-matches"
          className="carouselWithForm"
          ref={carouselRef}
        >
          <CarouselWithForm formId="7" />
        </div>

        <AccordionSection data={data.yourNextSteps} />

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
