"use client";
import Image from "next/image";
import React, { useRef } from "react";

import {
  Accordion,
  Button,
  Card,
  CarouselWithForm,
  Header,
  Stats,
  StickyCta,
} from "@/components";
import data from "@/data/careers-business.json";
import { IconCard } from "@/components/IconCard/IconCard";


/* eslint-disable react/no-danger */
const BusinessSeoPage = () => {
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

  return (
    <>
      <Header links={data.links} />
      <section className="pageHero">
        <div className="group center-aligned">
          <h1
            dangerouslySetInnerHTML={{
              __html: data.pageTitle,
            }}
          />
          <figure>
            <Image
              src="/images/which-health-care-career.jpg"
              width={800}
              height={480}
              alt="Health care professional in a laboratory"
            />
          </figure>
        </div>
      </section>
      <section className="quizSection">
        <div className="group center-aligned row cols-2">
          <div className="column">
            <figure className="highlighted-img">
              <Image
                src="/images/profesional-man-researching-online.jpg"
                width={800}
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
              className="button btn-primary"
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
              <h2>MBA vs. Specific Business Master’s Degrees: <strong>What's the Difference?</strong></h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: data.whyChoose.description,
                }}
              />
            </div>
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
          <div className="column">
            <figure className="highlighted-img">
              <Image
                src="/images/doctor-wearing-mas-and-sthethoscope.jpg"
                width={478}
                height={284}
                alt="Doctor wearing mask and a sthethoscope"
              />
            </figure>
          </div>
        </div>
      </section>
      <section className="testimonial">
        <div className="quotation">
          <blockquote>
            <p>{data.testimonial.text}</p>
            <div className="testimonialAuthor">
              <p>{data.testimonial.author}</p>
              <small>{data.testimonial.authorTitle}</small>
            </div>
          </blockquote>
        </div>
      </section>
      <section className="comparison">
        <div className="group column center-aligned">
          <div className="intro-text">
            <h2>
              MBA vs. Specific Business Master's Degrees:{" "}
              <strong>Maximizing Your Career Investment</strong>
            </h2>
            <p>
              In the pursuit of advancing one's career in the dynamic
              realm of business, the choice between pursuing a Master of
              Business Administration (MBA) or a specialized business
              master's degree is pivotal. Both pathways offer distinct
              advantages, but understanding the nuances of their
              respective Return on Investment (ROI) and career prospects
              is essential for informed decision-making.
            </p>
            <p>
              This comparison delves into the key considerations,
              highlighting the diverse opportunities and potential gains
              associated with each option. Whether seeking a comprehensive
              foundation in business management or a targeted
              specialization, this analysis aims to empower aspiring
              professionals with the insights needed to chart a course
              toward a thriving and rewarding career.
            </p>
          </div>

          <div className="infograph row cols-2">
            <IconCard
              title="ROI (Return on Investment):"
              iconUrl="/images/roi-icon.svg"
              iconAlt="ROI (Return on Investment) icon"
              className="roi-card"
            >
              <h4>MBA:</h4>
              <p>
                Higher ROI due to broader business knowledge, leadership
                training, and networking opportunities.
              </p>
              <p>
                Higher starting salaries and potential for significant
                long-term earnings.
              </p>
              <h4>Specific Business Master's:</h4>
              <p>
                Good ROI, especially for those with a clear career path
                in a specialized field (e.g., finance, accounting).
              </p>
            </IconCard>

            <IconCard
              title="Career Opportunities:"
              iconUrl="/images/career-opportunity-icon.svg"
              iconAlt="Career Opportunities icon"
              className="career-card"
            >
              <h4>MBA:</h4>
              <p>
                Diverse range of industries (finance, consulting,
                marketing, entrepreneurship).
              </p>
              <p>Versatile skills for career advancement.</p>
              <h4>Specific Business Master's:</h4>
              <p>
                Specialized education in a particular field (e.g.,
                finance, accounting).
              </p>
              <p>Tailored skills for specific career paths.</p>
            </IconCard>
          </div>
        </div>
      </section>

      <section id="explore-your-school-matches" ref={carouselRef}>
        <CarouselWithForm />
      </section>

      <section className="whatIsCappex">
        <div className="content">
          <figure>
            <Image
              src="/images/college-search.png"
              width={536}
              height={361}
              alt="What is Cappex"
            />
          </figure>
          <section className="goingToCollege">
            <h3>
              An All-in-One Resource for{" "}
              <strong>Going to College</strong>
            </h3>
            <p>
              Appily is the future of higher education guidance,
              uniting trusted tools that have empowered students for
              almost two decades. Born from respected platforms like
              Cappex, Concourse, YouVisit, and College Greenlight,
              Appily offers a seamless experience for students of all
              ages on their journey to college.{" "}
            </p>
            <p>
              Discover your ideal career path, make a plan to reach
              your academic and professional goals, and match with
              colleges that can help you get there — all in one place.
              Take the next step in achieving your academic goals with
              confidence.
            </p>
          </section>
        </div>
      </section>

      <section className="takeQuiz">
        <div className="content">
          <h2>{data.takeQuiz.title}</h2>
          <p>{data.takeQuiz.description}</p>
          <Button
            type="button"
            label={data.takeQuiz.buttonText}
            href="/careers/business/quiz"
            className="button btn-primary"
          />
        </div>
        hp
      </section>
      <StickyCta trackedElement={carouselRef} />
    </>
  );
};

export default BusinessSeoPage;
