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
import data from "@/data/careers-adc.json";

/* eslint-disable react/no-danger */
const BusinessSeoPage = () => {
  const { setVertical } = useUser();
  useEffect(() => {
    setVertical("Adult Degree");
  }, []);

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
              src="/images/appily-adc-hero.jpg"
              width={1000}
              height={1000}
              alt="Business woman working"
            />
          </figure>
        </div>
      </section>

      <section className="comparison">
        <div className="group column center-aligned center-justified">
          <div className="intro-text">
            <h2
              dangerouslySetInnerHTML={{
                __html: data.introComparison.title,
              }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: data.introComparison.description,
              }}
            />
          </div>

          <div className="infograph row cols-2">
            <IconCard
              title={data.introComparison.cards[0].card.title}
              iconUrl={
                themeMode === "dark"
                  ? data.introComparison.cards[0].card.iconLight
                  : data.introComparison.cards[0].card.iconDark
              }
              iconAlt="ROI (Return on Investment) icon"
              className="roi-card"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: data.introComparison.cards[0].card.description,
                }}
              />
              <Button
                appearance="primary"
                label={data.introComparison.cards[0].card.buttonText}
                href={data.introComparison.cards[0].card.buttonLink}
                className="button btn-primary"
              />
            </IconCard>

            <IconCard
              title={data.introComparison.cards[1].card.title}
              iconUrl={
                themeMode === "dark"
                  ? "/images/career-opportunity-icon-light.svg"
                  : "/images/career-opportunity-icon.svg"
              }
              iconAlt="Career Opportunities icon"
              className="career-card"
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: data.introComparison.cards[1].card.description,
                }}
              />
              <Button
                appearance="primary"
                label={data.introComparison.cards[1].card.buttonText}
                href={data.introComparison.cards[1].card.buttonLink}
                className="button btn-primary"
              />
            </IconCard>
          </div>
        </div>
      </section>

      <div id="explore-your-school-matches" ref={carouselRef}>
        <CarouselWithForm formId="11" data={data.carouselData} />
      </div>

      <section className="answersQuestionsSection column bgfilled imgTextSection">
        <header className="group column intro-group">
          <h2>{data.answersQuestionsSection.sectionTitle}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: data.answersQuestionsSection.sectionDescription,
            }}
          />
        </header>
        <div className="group center-aligned row cols-2">
          <div className="column intro-text">
            <h3>{data.answersQuestionsSection.questions.question1.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  data.answersQuestionsSection.questions.question1.content,
              }}
            />
            <Button
              appearance="primary"
              label={
                data.answersQuestionsSection.questions.question1.buttonText
              }
              href={data.answersQuestionsSection.questions.question1.buttonLink}
              className="button btn-secondary"
            />
          </div>
          <figure className="highlighted-img column">
            <Image
              src={data.answersQuestionsSection.questions.question1.image}
              width={480}
              height={480}
              alt={data.answersQuestionsSection.questions.question1.imageAlt}
            />
          </figure>
        </div>
      </section>

      {/* <Testimonial testimonialData={data.testimonial} /> */}

      <section className="answersQuestionsSection imgTextSection">
        <div className="group center-aligned row cols-2">
          <figure className="highlighted-img column">
            <Image
              src={data.answersQuestionsSection.questions.question2.image}
              width={480}
              height={480}
              alt={data.answersQuestionsSection.questions.question2.imageAlt}
            />
          </figure>
          <div className="column intro-text">
            <h3>{data.answersQuestionsSection.questions.question2.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  data.answersQuestionsSection.questions.question2.content,
              }}
            />
            <Button
              appearance="primary"
              label={
                data.answersQuestionsSection.questions.question2.buttonText
              }
              href={data.answersQuestionsSection.questions.question2.buttonLink}
              className="button btn-secondary"
            />
          </div>
        </div>
      </section>

      <section className="answersQuestionsSection bgfilled imgTextSection">
        <div className="group center-aligned row cols-2">
          <div className="column intro-text">
            <h3>{data.answersQuestionsSection.questions.question3.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  data.answersQuestionsSection.questions.question3.content,
              }}
            />
            <Button
              appearance="primary"
              label={
                data.answersQuestionsSection.questions.question3.buttonText
              }
              href={data.answersQuestionsSection.questions.question3.buttonLink}
              className="button btn-secondary"
            />
          </div>
          <figure className="highlighted-img column">
            <Image
              src={data.answersQuestionsSection.questions.question3.image}
              width={480}
              height={480}
              alt={data.answersQuestionsSection.questions.question3.imageAlt}
            />
          </figure>
        </div>
      </section>

      <WhatIsCappex>
        <Stats stats={data.statsAppily} className="stats-section" />
      </WhatIsCappex>

      <section className="takeQuiz full-content">
        <div className="group row">
          <div className="column">
            <figure>
              <Image
                src={data.takeQuiz.image}
                width={900}
                height={900}
                alt={data.takeQuiz.imageAlt}
              />
            </figure>
          </div>
          <div className="content column">
            <h2>{data.takeQuiz.title}</h2>
            <p>{data.takeQuiz.description}</p>
            <Button
              type="button"
              label={data.takeQuiz.buttonText}
              href={data.takeQuiz.buttonLink}
              className="button btn-primary"
            />
          </div>
        </div>
      </section>
      <StickyCta />
    </>
  );
};

export default BusinessSeoPage;
