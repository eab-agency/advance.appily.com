/* eslint-disable react/no-unescaped-entities */
"use client";
// import computerWhiz from "@/assets/lotties/computerWhiz.json";
// import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";


import {
  Accordion,
  Button,
  CareerPaths,
  CarouselWithForm,
  ChoosingRightSchoolBusinessDegree,
  KeepExploring,
  Stats,
  StickyCta,
  SubNavPlan,
  Tabs,
  Testimonial,
  TextWithImage,
  WhatDegrees,
} from "@/components";
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
        <section className="resultsHero">
          <div className="group">
            <div className="heroContent column">
              <div className="intro-title">
                <span>Your Back-to-School Plan</span>
              </div>
              <h1>{data.title}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: data.detailedDescription }}
              />
            </div>
            <figure className="column">
              {/* <Lottie animationData={computerWhiz} loop={true} /> */}
              <Image
                src="/images/build-plan/business-plan.svg"
                alt="Your business back to school plan"
                width={400}
                height={400}
              />
            </figure>
          </div>
        </section>

        <SubNavPlan />

        <section id="value-of-a-degree" className="whyChoose">
          <div className="group center-aligned cols-2">
            <div className="column">
              <div className="intro">
                <h2>
                  Is Earning My Bachelor’s Degree{" "}
                  <strong>Really Worth It?</strong>
                </h2>
                {/* <p
                  dangerouslySetInnerHTML={{
                    __html: data.whyChoose.description,
                  }}
                />*/}
              </div>
              <div className="accordion-group">
                {data.reasons.map((reason, index) => (
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
                  src="/images/build-plan/value-of-a-degree.jpg"
                  width={480}
                  height={480}
                  alt="Graduate celebrating wearing a cap and gown"
                />
              </figure>
            </div>
          </div>
        </section>

        <Stats stats={data.stats} source={data.statsSource} />

        <Testimonial testimonialData={data.testimonial} />

        <section className="tabsSection column">
          <header className="center-aligned centered-content center-justified">
            <h2>Resources to Fund Your Education</h2>
            <p>Can this automatically have the tab selected related to <strong>“Which of the following funding opportunities would you be most interested in learning about?”</strong></p>
          </header>
          <Tabs className="react-tabs" tabs={data.fundingYourDegree} />
        </section>

        <section className="fileFafsa whyChoose">
          <div className="group center-aligned cols-2">
            <div className="column">
              <div className="intro">
                <h2>
                  Your First Step to Funding Your Degree:{" "}
                  <strong>File the FAFSA</strong>
                </h2>
                <p>One of the first and most crucial steps to unlocking financial assistance is filing the Free Application for Federal Student Aid (FAFSA). You should do this each year you plan to be a student.</p>
                <Button
                  appearance="primary"
                  className="button btn-primary"
                  href={data.fileFafsa.buttonLink}
                  label={data.fileFafsa.buttonText}
                />
              </div>
              <div className="accordion-group">
                <h3>Here are 5 important things to know about filing the FAFSA:</h3>
                {data.fileFafsa.importantThings.map((reason, index) => (
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
                  src="/images/build-plan/file-your-fafsa.jpg"
                  width={480}
                  height={480}
                  alt="Student filing their FAFSA"
                />
              </figure>
            </div>
          </div>
        </section>

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

        <section className="rowOfCards">
          <div className="group contentWrapper center-aligned column">
            <h2>Try These Tools</h2>
            <div className="group row columns">
              <div className="column cardContent">
                <Link
                  href="https://www.appily.com/scholarships"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cardLink"
                ><h3>Appily’s Scholarship Database</h3><FaExternalLinkAlt /></Link>
                <p>The nation’s largest, multi-billion dollar scholarship database can help you discover funding opportunities that you don’t have to pay back.</p>
              </div>
              <div className="column cardContent">
                <Link
                  href="https://www.acenet.edu/Programs-Services/Pages/Credit-Transcripts/Students.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cardLink"
                ><h3>ACE Credit for Prior Learning</h3><FaExternalLinkAlt /></Link>
                <p>If you participated in military service, workplace training programs, apprenticeships, standardized exams, or other types of experiential learning outside the college classroom, you could receive college credit recommendations or validated competencies through Learning Evaluation.</p>
              </div>
              <div className="column cardContent">
                <Link
                  href="https://www.acenet.edu/Programs-Services/Pages/Credit-Transcripts/Students.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cardLink"
                ><h3>College-Level Exam Program (CLEP)</h3><FaExternalLinkAlt /></Link>
                <p>CLEP exams let you test out of introductory courses and move to more advanced courses sooner, saving time toward your degree.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="tabsSection column">
          <header className="center-aligned centered-content center-justified">
            <h2>How Can Your Life Experience Shape Your Career Options?</h2>
          </header>
          <Tabs className="react-tabs" tabs={data.careersPaths.paths} />
        </section>

        <CareerPaths careerPaths={data.topCareers} />

        {/* ***************************************** */}
        {/* ***************************************** */}
        {/* ***************************************** */}
        {/* ***************************************** */}
        {/* ***************************************** */}

        <WhatDegrees whatDegreesData={data.degreeTabs} />




        <TextWithImage
          content={data.textWithImage.content}
          imagePath={data.textWithImage.imagePath}
          className="whatever-you-need"
          altText={data.textWithImage.altText}
        />

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
