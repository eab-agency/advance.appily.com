// "use client";
import Image from "next/image";
import React from "react";

import { Button, StickyCta, WhatIsCappex } from "@/components";
import { IconCard } from "@/components/IconCard/IconCard";
import data from "@/data/careers-adc.json";

import StatisticsSection from "@/blocks/StatisticsSection";
import PageHero from "@/components/Heros/PageHero";
import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

const title = data.metaData.title;
const description = data.metaData.description;

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
  robots: {
    index: false,
  },
};

/* eslint-disable react/no-danger */
const BusinessSeoPage = () => {
  return (
    <>
      <PageHero
        image={{
          src: "/images/appily-adc-hero.jpg",
          alt: "Business woman working",
        }}
      >
        <h1
          dangerouslySetInnerHTML={{
            __html: data.pageTitle,
          }}
        />
      </PageHero>
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

          <div className="infograph row">
            <IconCard
              title={data.introComparison.cards[1].card.title}
              iconUrl={data.introComparison.cards[1].card.iconUrl}
              iconAlt={data.introComparison.cards[1].card.iconAlt}
              darkMode={true}
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

      <section className="answersQuestionsSection column bgfilled imgTextSection">
        <header className="group column intro-group">
          <h2>{data.answersQuestionsSection.sectionTitle}</h2>
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
        <StatisticsSection statistics={data.statsAppily} statsLayoutWidth="contained" statsBackgroundColor="slate_gray_white" />
      </WhatIsCappex>

      <StickyCta ctaLabel="Get Your Back-to-School Plan" />
    </>
  );
};

export default BusinessSeoPage;
