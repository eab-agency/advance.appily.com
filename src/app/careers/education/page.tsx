import React, { Suspense } from "react";
import RandomComponent from "@/hooks/useRandomComponent";
import ABButton from "@/components/Button/ABButton";
import Image from "next/image";

import { Accordion, Button, StickyCta, Testimonial } from "@/components";
import data from "@/data/careers-education.json";
import Link from "next/link";

import PageHero from "@/components/Heros/PageHero";
import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

const title = "Explore Education Careers";
const description =
  "How can you make a difference for today's students? Discover which education career path is right for you with Appily Advance's free career quiz.";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: mergeOpenGraph({
    title: title,
    description: description,
  }),
  twitter: mergeTwitter({
    title: title,
    description: description,
  }),
};

/* eslint-disable react/no-danger */
const BusinessSeoPage = () => {
  const ButtonOne = (
    <ABButton
      label="Take the Quiz"
      appearance="primary"
      href="https://my.appily.com/register/adult/educationcareers1"
      className="button btn-primary btn-click-quiz"
    />
  );

  const ButtonTwo = (
    <ABButton
      label="Take the Quiz"
      appearance="primary"
      href="/careers/education/quiz/start"
      className="button btn-primary btn-click-quiz"
    />
  );

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

  return (
    <>
      <PageHero
        image={{
          src: "/images/education/education-career-hero.jpg",
          alt: "Man teaching a class",
        }}
      >
        <h1
          dangerouslySetInnerHTML={{
            __html: data.pageTitle,
          }}
        />
      </PageHero>
      <section className="quizSection">
        <div className="group center-aligned row cols-2">
          <div className="column">
            <figure className="highlighted-img">
              <Image
                src="/images/education/education-career-quiz.webp"
                width={480}
                height={480}
                alt="Teacher at the front of a classroom"
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
            <Suspense>
              <RandomComponent
                PercentageComponent={ButtonOne}
                FallBackComponent={ButtonTwo}
              />
            </Suspense>
          </div>
        </div>
      </section>

      {/* <Stats
        stats={data.stats}
        source={data.statsSource}
        className="stats-section"
      /> */}

      <section className="whyChoose">
        <div className="group center-aligned cols-2">
          <div className="column">
            <div className="intro">
              <h2>{data.whyChoose.title}</h2>
              <h2>
                <strong>{data.whyChoose.subTitle}</strong>
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
            <p>
              <Link href="/careers/education/quia">
                Take the Education Career Quiz
              </Link>{" "}
              to see if your skills and interests make you a great fit for a
              classroom setting!
            </p>
          </div>
          <div className="column">
            <figure className="highlighted-img">
              <Image
                src="/images/education-why-become-a-teacher.jpg"
                width={480}
                height={480}
                alt="Man helping a student with a computer program"
              />
            </figure>
          </div>
        </div>
      </section>

      <Testimonial testimonialData={data.testimonial} />

      <section className="rightCareer">
        <div className="group column center-aligned">
          <div className="column">
            <h2>
              What are Some Good Jobs for <strong>Former Teachers?</strong>
            </h2>
            <p>{data.rightCareer[0].description}</p>
          </div>
          <div className="accordion-group">
            {data.rightCareer[0].reasons.map((reason, index) => (
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
          <p
            dangerouslySetInnerHTML={{ __html: data.rightCareer[0].endCopy }}
          />
        </div>
      </section>

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
              href="https://my.appily.com/register/adult/educationcareers1"
              className="button btn-primary btn-click-quiz"
            />
          </div>
        </div>
      </section>
      <StickyCta ctaLabel="Take the Education Career Quiz" />
    </>
  );
};

export default BusinessSeoPage;
