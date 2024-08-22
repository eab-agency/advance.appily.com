/* eslint-disable react/no-unescaped-entities */
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
import data from "@/data/results-analyst.json";

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
          <Tabs className="react-tabs" tabs={data.tabs} />
        </Suspense>

        <section className="career-path">
          <div className="group cols-2">
            <div className="column">
              <div className="path-intro">
                <h2>
                  What's a common health care career path for The Analyst?
                </h2>
                <p>
                  Occupations that align with The Analyst's career path advise
                  organizations on computerized healthcare systems and analyze
                  clinical data.
                </p>
              </div>
              <div className="executive-path">
                <ul>
                  <li>
                    <strong>Health information technologists</strong> apply
                    their knowledge of information technology and health care in
                    a variety of ways. Some specialize in the electronic health
                    records systems used for storing and retrieving patient data
                    while others analyze healthcare data for research or
                    evaluation of products and services.
                  </li>
                  <li>
                    <strong>Medical registrars</strong> create and maintain
                    databases of information, such as those used to track a
                    particular disease or condition. They may collect and
                    analyze information for facility, regional, and national
                    databases; review patients' records and pathology reports to
                    verify completeness and accuracy; assign classification
                    codes to represent the diagnosis and treatment; then track
                    treatment, survival, and recovery.
                  </li>
                  <li>
                    <strong>Bioinformatics specialists</strong> combine
                    knowledge of computer programming, big data, and biology for
                    careers that range from pharmaceutical and biotechnology
                    development to biological and environmental analysis.
                  </li>
                </ul>
              </div>
            </div>
            <figure className="column">
              <Image
                src="/images/analyst.jpg"
                width={600}
                height={600}
                alt="Medical professional with computer"
                className="highlighted-img"
              />
              <figcaption>Medical professional with computer</figcaption>
            </figure>
          </div>
        </section>

        <StatisticsSection statistics={data.stats} source={data.statsSource} statsLayoutWidth="contained" />

        <section className="best-degrees">
          <div className="group column">
            <div className="degrees-intro">
              <h2>What are the best health care degrees for The Analyst?</h2>
              <p>
                The degree necessary for careers in The Analyst's path varies
                depending on responsibilities. An associate's degree is a
                minimum requirement, with many roles preferring a bachelor's or
                master's degree.
              </p>
            </div>
            <Suspense fallback={<TabsFallback />}>
              <Tabs tabs={data.degreeTabs} className="degree-tabs" />
            </Suspense>
          </div>
        </section>

        <section className="certificates">
          <Accordion title="Does The Analyst need a license, certification, or registration?">
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
                Employers may prefer to hire health information technologists
                and medical registrars who have certification, or they may
                expect applicants to earn certification after being hired.
              </p>
              <p>
                Credentials for a variety of specializations are available from
                professional organizations, including the Registered Health
                Information Technician (RHIT), the Certified Documentation
                Improvement Practitioner (CDIP), and the Certified Health Data
                Analyst (CHDA).
              </p>
            </div>
          </Accordion>
        </section>
        {/* <WhatDegrees whatDegreesData={data.degreeTabs} /> */}

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
