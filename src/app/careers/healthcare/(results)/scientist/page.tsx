"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Suspense } from "react";

import {
  Accordion,
  CarouselWithForm,
  KeepExploring,
  StickyCta,
  SubNav,
  Tabs,
} from "@/components";
import { useUser } from "@/context/context";
import dataLinks from "@/data/links-healthcare.json";
import data from "@/data/results-scientist.json";

import StatisticsSection from "@/blocks/StatisticsSection";

function TabsFallback() {
  return <>Tabs loading...</>;
}

export default function Page() {
  const carouselRef = useRef(null);
  const { results: links } = dataLinks;
  const { setVertical, vertical } = useUser();
  useEffect(() => {
    setVertical("Health Care");
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
            {/* <figure className="column">
              <Lottie animationData={computerWhiz} loop={true} />
            </figure> */}
          </div>
        </section>

        {links && <SubNav links={links} />}
        <Suspense fallback={<TabsFallback />}>
          <Tabs className="react-tabs" tabs={data.tabs} id="1" />
        </Suspense>

        <section className="career-path">
          <div className="group cols-2">
            <div className="column">
              <div className="path-intro">
                <h2>
                  What’s a common health care career path for The Scientist?
                </h2>
                <p>
                  Occupations that align with The Scientist’s career path
                  conduct research aimed at improving overall human health. They
                  often use clinical trials and other investigative methods to
                  research their findings.
                </p>
              </div>
              <div className="executive-path">
                <ul>
                  <li>
                    <strong>Medical laboratory scientists</strong> perform
                    complex tests on patient samples to find data that plays an
                    important role in identifying and treating cancerimport
                    heart disease, diabetes, and other medical conditions.
                  </li>
                  <li>
                    <strong>Clinical pharmacologist</strong> research new drug
                    therapies for health problems such as seizure disorders and
                    Alzheimer’s disease.
                  </li>
                  <li>
                    <strong>Medical pathologists</strong> research the human
                    body and tissues, such as how cancer progresses or how
                    certain issues relate to genetics.
                  </li>
                  <li>
                    <strong>Toxicologists</strong> study the negative impacts of
                    chemicals and pollutants on human health
                  </li>
                </ul>
              </div>
            </div>
            <figure className="column">
              <Image
                src="/images/scientist.jpg"
                width={478}
                height={284}
                alt="Scientist looking at microscope"
                className="highlighted-img"
              />
              <figcaption>Medical professional in a lab</figcaption>
            </figure>
          </div>
        </section>

        <StatisticsSection statistics={data.stats} source={data.statsSource} statsLayoutWidth="contained" />

        <section className="best-degrees">
          <div className="group column">
            <div className="degrees-intro">
              <h2>What are the best health care degrees for The Scientist?</h2>
              <p>
                For many roles in The Scientist’s career path, a Ph.D. (often in
                biology or life sciences) or a medical degree is required. Some
                positions will also accept a master’s degree if the candidate
                also has experience.
              </p>
            </div>
            <Suspense fallback={<TabsFallback />}>
              <Tabs tabs={data.degreeTabs} className="degree-tabs" id="2" />
            </Suspense>
          </div>
        </section>

        <section className="certificates">
          <Accordion title="Does The Scientist need a license, certification, or registration?">
            <figure>
              <Image
                src="/images/certificate-image.svg"
                width={478}
                height={284}
                alt="Medical records"
              />
            </figure>
            <div>
              <p>
                Medical scientists mostly conduct research and don’t usually
                need licenses or certifications. However, those who practice
                medicine, such as by treating patients in clinical trials or in
                private practice, must be licensed as physicians or other
                healthcare practitioners.
              </p>
            </div>
          </Accordion>
        </section>

        <div
          id="explore-your-school-matches"
          className="carouselWithForm"
          ref={carouselRef}
        >
          <CarouselWithForm formId="3" collectData={false} />
        </div>
        <KeepExploring />
      </div>
      <StickyCta trackedElement={carouselRef} />
    </>
  );
}
