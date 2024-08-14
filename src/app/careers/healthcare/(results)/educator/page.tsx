/* eslint-disable react/no-unescaped-entities */
"use client";
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
import data from "@/data/results-educator.json";
import styles from "@/styles/components/FinalPage.module.scss";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Suspense } from "react";

import StatisticsSection from "@/blocks/StatisticsSection";

function TabsFallback() {
  return <>Tabs loading...</>;
}

export default function Page() {
  const { results: links } = dataLinks;
  const carouselRef = useRef(null);
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

        <section className="career-path rows-2">
          <div className="group cols-2">
            <div className="column">
              <div className="path-intro">
                <h2>
                  What's a common health care career path for The Educator?
                </h2>
                <p>
                  Occupations that align with The Educator’s career path tend to
                  teach people about behaviors that promote wellness, developing
                  strategies to improve the well-being of individuals and
                  communities.
                </p>
              </div>

              <div className="executive-path">
                <div className="pathwrapper">
                  <p>
                    A health education specialist’s duties differ based on where
                    they work:
                  </p>
                  <ul>
                    <li>
                      <strong>Healthcare facilities:</strong> Work one-on-one
                      with patients or their families to understand their
                      diagnoses and treatment options. Organize education
                      programs for the community about health-related topics.
                    </li>
                    <li>
                      <strong>Executives or administrators:</strong> Plan
                      strategies and policies to help organizations such as
                      hospital systems reach their goals.
                    </li>
                    <li>
                      <strong>Human resources manager:</strong> Plan,
                      coordinate, and direct the employee-focused functions of
                      organizations such as hospitals or clinics
                    </li>
                    <li>
                      <strong>Purchasing managers or agents:</strong> Buy
                      products and services such as medical supplies and
                      equipment for hospitals or clinics
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <figure className="column">
              <Image
                src="/images/non-profit-worker.jpg"
                width={600}
                height={600}
                alt="Non profit worker in a desk"
                className="highlighted-img"
              />
              <figcaption>Nonprofit Worker</figcaption>
            </figure>
          </div>
          <div className="group cols-2">
            <figure className="column">
              <Image
                src="/images/educator.jpg"
                width={600}
                height={600}
                alt="Medical educator in front of a whiteboard"
                className="highlighted-img"
              />
              <figcaption>Professor</figcaption>
            </figure>
            <div className="executive-path pathwrapper">
              <ul>
                <li>
                  <strong>Community health workers</strong> tend to have a more
                  local focus, deeply understanding the communities they serve.
                  They identify health-related issues, collect data, and discuss
                  health concerns with the community. They work with health
                  education specialists and social services to inform programs
                  that address the health and wellness needs of their community.
                </li>
                <li>
                  <strong>Medical educators</strong> often work in either
                  universities or hospitals to support medical students or
                  trainee doctors, or in a public health role in a local
                  authority. Most university-based medical educators have
                  transferred from a clinical career or continue to balance a
                  clinical career with a research and teaching career as
                  clinical academics.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <StatisticsSection statistics={data.stats} source={data.statsSource} statsLayoutWidth="contained" />

        <section className="best-degrees">
          <div className="group column">
            <div className="degrees-intro">
              <h2>What are the best health care degrees for The Educator?</h2>
              <p>
                The type of degree needed for various careers in The Educator’s
                path vary. Health education specialists usually need at least a
                bachelor’s degree, community health workers often only need a
                high school diploma, and medical educators often require at
                least a master’s degree.
              </p>
            </div>
            <Suspense fallback={<TabsFallback />}>
              <Tabs tabs={data.degreeTabs} className="degree-tabs" id="2" />
            </Suspense>
          </div>
        </section>

        <section className={styles.certificates}>
          <Accordion title="Does The Educator need a license, certification, or registration?">
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
                The need for a license or certification depends on the role.
              </p>
              <p>
                Employers may require or prefer that health education
                specialists obtain a Certified Health Education Specialist
                (CHES) credential or the Certified Diabetes Care and Education
                Specialist (CDCES) credential.
              </p>
              <p>
                Some states also offer certification for community health
                workers, which may include completing a training program on the
                job.
              </p>
              <p>
                If you’re interested in helping your resume stand out, many
                universities also offer a Certificate in Public Health that can
                often be completed online and either part-time or in half the
                time of a full master’s degree. A certificate is often
                hyper-focused on the skills you need to excel in your career.
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
