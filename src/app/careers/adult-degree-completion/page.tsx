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
        <div className="group center-aligned">
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
              alt="Business woman working"
            />
          </figure>
        </div>
      </section>

      <section className="comparison">
        <div className="group column center-aligned">
          <div className="intro-text">
            <h2 dangerouslySetInnerHTML={{
              __html: data.introComparison.title,
            }} />
            <p dangerouslySetInnerHTML={{
              __html: data.introComparison.description
            }} />
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
              <div dangerouslySetInnerHTML={{
                __html: data.introComparison.cards[0].card.description
              }} />
              <Button
                appearance="primary"
                label={data.introComparison.cards[0].card.buttonText}
                href={data.introComparison.cards[0].card.buttonLink}
                className="button btn-primary" />
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
              <div dangerouslySetInnerHTML={{
                __html: data.introComparison.cards[1].card.description
              }} />
              <Button
                appearance="primary"
                label={data.introComparison.cards[1].card.buttonText}
                href={data.introComparison.cards[1].card.buttonLink}
                className="button btn-primary" />
            </IconCard>
          </div>
        </div>
      </section>


      <div id="explore-your-school-matches" ref={carouselRef}>
        <CarouselWithForm formId="8" />
      </div>

      <section className="howSection">
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
            <h2>{data.howSection.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: data.howSection.content,
              }}
            />
            <Button
              appearance="primary"
              label={data.howSection.buttonText}
              href="/careers/business/quiz"
              className="button btn-secondary"
            />
          </div>
        </div>
      </section>

      <Testimonial testimonialData={data.testimonial} />

      <section className="howSection">
        <div className="group center-aligned row cols-2">
          <div className="column intro-text">
            <h2>{data.howSection.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: data.howSection.content,
              }}
            />
            <Button
              appearance="primary"
              label={data.howSection.buttonText}
              href="/careers/business/quiz"
              className="button btn-secondary"
            />
          </div>
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
