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
import data from "@/data/results-executive.json";

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
                  What's a common health care career path for The Executive?
                </h2>
                <p>
                  Occupations that align with The Executive's career path tend
                  to establish plans and policies, direct business activities,
                  and oversee people, products, and services.
                </p>
              </div>
              <div className="executive-path">
                <ul>
                  <li>
                    <strong>
                      Administrative services and facilities managers:
                    </strong>{" "}
                    Plan, direct, and coordinate activities that help a health
                    care facility run efficiently
                  </li>
                  <li>
                    <strong>Executives or administrators:</strong> Plan
                    strategies and policies to help organizations such as
                    hospital systems reach their goals.
                  </li>
                  <li>
                    <strong>Human resources manager:</strong> Plan, coordinate,
                    and direct the employee-focused functions of organizations
                    such as hospitals or clinics
                  </li>
                  <li>
                    <strong>Purchasing managers or agents:</strong> Buy products
                    and services such as medical supplies and equipment for
                    hospitals or clinics
                  </li>
                </ul>
              </div>
            </div>
            <figure className="column">
              <Image
                src="/images/executive.jpg"
                width={478}
                height={284}
                alt="Executive woman smiling in front of a laptop"
                className="highlighted-img"
              />
              <figcaption>Healthcare administrator</figcaption>
            </figure>
          </div>
        </section>

        <StatisticsSection statistics={data.stats} source={data.statsSource} statsLayoutWidth="contained" />

        <section className="best-degrees">
          <div className="group column">
            <div className="degrees-intro">
              <h2>What are the best health care degrees for The Executive?</h2>
              <p>
                For many roles in The Executive’s career path, a bachelor’s
                degree is a minimum qualification. Master’s degrees are common
                and often preferred, especially for more senior management
                roles.
              </p>
            </div>
            <Suspense fallback={<TabsFallback />}>
              <Tabs className="degree-tabs" tabs={data.degreeTabs} id="2" />
            </Suspense>
          </div>
        </section>

        <section className="certificates">
          <Accordion
            title="Does The Executive need a license, certification, or
                        registration?"
          >
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
                All states require licensure for{" "}
                <strong>nursing home administrators.</strong> The process often
                involves a state-approved training program and national
                licensing exam, and varies by state.
              </p>
              <p>
                A license is <strong>not typically required</strong> in other
                areas of medical and health services management, although some
                positions do require a registered nurse or social worker
                license.
              </p>
              <p>
                While not required,{" "}
                <strong>certification can help your resume stand out</strong>{" "}
                among your peers. You could become certified in many of areas of
                practice, such as medical management or health information
                management.
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
