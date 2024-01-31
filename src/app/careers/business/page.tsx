"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import {
  Accordion,
  Button,
  CarouselWithForm,
  Header,
  Stats,
  StickyCta,
  Testimonial,
  WhatIsCappex,
} from "@/components";
import { IconCard } from "@/components/IconCard/IconCard";
import { useUser } from "@/context/context";
import data from "@/data/careers-business.json";

/* eslint-disable react/no-danger */
const BusinessSeoPage = () => {
  const { setVertical } = useUser();
  useEffect(() => {
    setVertical("Business");
  }, []);
  const reasonsArray = data.whyChoose.reasons;
  const rightCareerArray = data.rightCareer[0].reasons;
  const rightCareerList = rightCareerArray.map((reason, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
    <li key={index}>
      <p
        dangerouslySetInnerHTML={{
          __html: reason.description,
        }}
      />
    </li>
  ));

  const carouselRef = useRef(null);

  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setThemeMode("dark");
    } else {
      setThemeMode("light");
    }
  }, []);

  return (
    <>
      <section className="pageHero">
        <div className="group center-aligned center-justified">
          <h1
            dangerouslySetInnerHTML={{
              __html: data.pageTitle,
            }}
          />
          <figure className="heroImage">
            <Image
              src="/images/business-hero-image.jpg"
              width={1000}
              height={1000}
              alt="Business woman wor"
            />
          </figure>
        </div>
      </section>
      <section className="quizSection">
        <div className="group center-aligned row cols-2">
          <div className="column">
            <figure className="highlighted-img">
              <Image
                src="/images/take-our-free-quiz.jpg"
                width={480}
                height={480}
                alt="Profesional man researching online"
              />
            </figure>
          </div>
          <div className="column intro-text">
            <h2>{data.quizSection.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: data.quizSection.content,
              }}
            />
            <Button
              appearance="primary"
              label={data.quizSection.buttonText}
              href="/careers/business/quiz"
              className="button btn-primary btn-click-quiz"
            />
          </div>
        </div>
      </section>

      <Stats
        stats={data.stats}
        source={data.statsSource}
        className="stats-section"
      />

      <section className="whyChoose">
        <div className="group center-aligned cols-2">
          <div className="column">
            <div className="intro">
              <h2>
                MBA vs. Specific Business Master’s Degrees:{" "}
                <strong>What's the Difference?</strong>
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: data.whyChoose.description,
                }}
              />
            </div>
            <div className="accordion-group">
              {reasonsArray.map((reason, index) => (
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
                src="/images/whats-the-difference-mba-specific-master.jpg"
                width={480}
                height={480}
                alt="Man using a tablet device"
              />
            </figure>
          </div>
        </div>
      </section>

      <Testimonial testimonialData={data.testimonial} />

      <section className="comparison">
        <div className="group column center-aligned center-justified">
          <div className="intro-text">
            <h2>
              MBA vs. Specific Business Master's Degrees:{" "}
              <strong>Maximizing Your Career Investment</strong>
            </h2>
            <p>
              In the pursuit of advancing one's career in the dynamic realm of
              business, the choice between pursuing a Master of Business
              Administration (MBA) or a specialized business master's degree is
              pivotal. Both pathways offer distinct advantages, but
              understanding the nuances of their respective Return on Investment
              (ROI) and career prospects is essential for informed
              decision-making.
            </p>
          </div>

          <div className="infograph row cols-2">
            <IconCard
              title="ROI (Return on Investment):"
              iconUrl={
                themeMode === "dark"
                  ? "/images/roi-icon-light.svg"
                  : "/images/roi-icon.svg"
              }
              iconAlt="ROI (Return on Investment) icon"
              className="roi-card"
            >
              <h4>MBA:</h4>
              <p>
                Higher ROI due to broader business knowledge, leadership
                training, and networking opportunities.
              </p>
              <p>
                Higher starting salaries and potential for significant long-term
                earnings.
              </p>
              <h4>Specific Business Master's:</h4>
              <p>
                Good ROI, especially for those with a clear career path in a
                specialized field (e.g., finance, accounting).
              </p>
            </IconCard>

            <IconCard
              title="Career Opportunities:"
              iconUrl={
                themeMode === "dark"
                  ? "/images/career-opportunity-icon-light.svg"
                  : "/images/career-opportunity-icon.svg"
              }
              iconAlt="Career Opportunities icon"
              className="career-card"
            >
              <h4>MBA:</h4>
              <p>
                Diverse range of industries (finance, consulting, marketing,
                entrepreneurship).
              </p>
              <p>Versatile skills for career advancement.</p>
              <h4>Specific Business Master's:</h4>
              <p>
                Specialized education in a particular field (e.g., finance,
                accounting).
              </p>
              <p>Tailored skills for specific career paths.</p>
            </IconCard>
          </div>
        </div>
      </section>

      {/* <div id="explore-your-school-matches" ref={carouselRef}>
        <CarouselWithForm formId="8" />
      </div> */}

      <WhatIsCappex>
        <Stats stats={data.statsAppily} className="stats-section" />
      </WhatIsCappex>

      <section className="takeQuiz full-content">
        <div className="group row">
          <div className="column">
            <figure>
              <Image
                src="/images/ready-to-find-your-role.jpg"
                width={900}
                height={900}
                alt="Take our free quiz"
              />
            </figure>
          </div>
          <div className="content column">
            <h2>{data.takeQuiz.title}</h2>
            <p>{data.takeQuiz.description}</p>
            <Button
              type="button"
              label={data.takeQuiz.buttonText}
              href="/careers/business/quiz"
              className="button btn-primary btn-click-quiz"
            />
          </div>
        </div>
      </section>
      <StickyCta />
    </>
  );
};

export default BusinessSeoPage;
