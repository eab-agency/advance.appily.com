"use client";
import Image from "next/image";
import React, { useRef } from "react";

import {
  Accordion,
  Button,
  CarouselWithForm,
  Header,
  Stats,
  StickyCta,
  Testimonial
} from "@/components";
import MainLogo from "@/components/Header/MainLogo";
import data from "@/data/careers-healthcare.json";

/* eslint-disable react/no-danger */
const HealthCareSeoPage = () => {
  const reasonsArray = data.whyChoose.reasons;
  const reasonsList = reasonsArray.map((reason, index) => (
    <li key={reason.title}>
      <h3>{reason.title}</h3>
      <p
        dangerouslySetInnerHTML={{
          __html: reason.description,
        }}
      />
    </li>
  ));

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
      {/* <Header links={data.links} /> */}
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
              type="button"
              label={data.quizSection.buttonText}
              href="/careers/healthcare/quiz"
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
            <h2>{data.whyChoose.title}</h2>
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
            <figure>
              <Image
                src="/images/doctor-wearing-mas-and-sthethoscope.jpg"
                width={478}
                height={284}
                alt="Doctor wearing mask and a sthethoscope"
                className="highlighted-img"
              />
            </figure>
          </div>
        </div>
      </section>

      <Testimonial testimonialData={data.testimonial} />

      <section className="rightCareer">
        <div className="group column center-aligned">
          <div className="column">
            <h2><strong>Top 5 Reasons</strong> a Career in Health Care Could be Right for You</h2>
            <p>{data.rightCareer[0].description}</p>
          </div>
          <ul>{rightCareerList}</ul>
        </div>
      </section>

      <div id="explore-your-school-matches" ref={carouselRef}>
        <CarouselWithForm />
      </div>

      <section className="whatIsCappex column">
        <div className="group row center-aligned cols-2">
          <div className="column">
            <figure>
              <Image
                src="/images/what-is-appily.jpg"
                width={480}
                height={480}
                alt="What is Cappex"
                className="highlighted-img"
              />
            </figure>
          </div>
          <div className="column">
            <h2><MainLogo />
              An All-in-One Resource for{" "}
              <strong>Going to College</strong>
            </h2>
            <p>
              Appily is the future of higher education guidance, uniting trusted
              tools that have empowered students for almost two decades. Born
              from respected platforms like Cappex, Concourse, YouVisit, and
              College Greenlight, Appily offers a seamless experience for
              students of all ages on their journey to college.{" "}
            </p>
            <p>
              Discover your ideal career path, make a plan to reach your
              academic and professional goals, and match with colleges that can
              help you get there — all in one place. Take the next step in
              achieving your academic goals with confidence.
            </p>
          </div>
        </div>
        <Stats
          stats={data.statsAppily}
          className="stats-section"
        />
      </section>


      <section className="takeQuiz full-content">
        <div className="group row">
          <div className="column">
            <figure>
              <Image
                src="/images/ready-to-find-your-role.jpg"
                width={800}
                height={800}
                alt="Take our free quiz"
              // className="highlighted-img"
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
              className="button btn-primary"
            />
          </div>
        </div>
      </section>
      <StickyCta trackedElement={carouselRef} />
    </>
  );
};

export default HealthCareSeoPage;
