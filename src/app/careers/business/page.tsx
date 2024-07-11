import ABButton from "@/components/Button/ABButton";
import RandomComponent from "@/hooks/useRandomComponent";
import Image from "next/image";
import React, { Suspense } from "react";

import { Accordion, Button, StickyCta, Testimonial } from "@/components";
import { IconCard } from "@/components/IconCard/IconCard";
import data from "@/data/careers-business.json";

import PageHero from "@/components/Heros/PageHero";
import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

import StatisticsSection from "@/blocks/StatisticsSection";

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
};

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

  const ButtonOne = (
    <ABButton
      label="Take the Quiz"
      appearance="primary"
      href="https://my.appily.com/register/adult/businesscareers1"
      className="button btn-primary btn-click-quiz"
    />
  );

  const ButtonTwo = (
    <ABButton
      label="Take the Quiz"
      appearance="primary"
      href="/careers/business/quiz/start"
      className="button btn-primary btn-click-quiz"
    />
  );

  return (
    <>
      <PageHero
        image={{
          src: data.pageHero.image.src,
          alt: data.pageHero.image.alt,
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
                src={data.quizSection.image.src}
                width={480}
                height={480}
                alt={data.quizSection.image.alt}
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

      <StatisticsSection statistics={data.stats} source={data.statsSource} statsLayoutWidth="contained" />

      <section className="whyChoose">
        <div className="group center-aligned cols-2">
          <div className="column">
            <div className="intro">
              <h2 dangerouslySetInnerHTML={{ __html: data.whyChoose.title }} />
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
                src={data.whyChoose.image.src}
                width={480}
                height={480}
                alt={data.whyChoose.image.alt}
              />
            </figure>
          </div>
        </div>
      </section>

      <Testimonial testimonialData={data.testimonial} />

      <section className="comparison">
        <div className="group column center-aligned center-justified">
          <div className="intro-text">
            <h2
              dangerouslySetInnerHTML={{ __html: data.comparisonSection.title }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: data.comparisonSection.description,
              }}
            />
          </div>

          <div className="infograph row cols-2">
            <IconCard
              title="ROI (Return on Investment):"
              iconUrl="/images/roi-icon.svg"
              darkMode={true}
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
              <h4>Specific Business Master&apos;s:</h4>
              <p>
                Good ROI, especially for those with a clear career path in a
                specialized field (e.g., finance, accounting).
              </p>
            </IconCard>

            <IconCard
              title="Career Opportunities:"
              iconUrl="/images/career-opportunity-icon.svg"
              darkMode={true}
              iconAlt="Career Opportunities icon"
              className="career-card"
            >
              <h4>MBA:</h4>
              <p>
                Diverse range of industries (finance, consulting, marketing,
                entrepreneurship).
              </p>
              <p>Versatile skills for career advancement.</p>
              <h4>Specific Business Master&apos;s:</h4>
              <p>
                Specialized education in a particular field (e.g., finance,
                accounting).
              </p>
              <p>Tailored skills for specific career paths.</p>
            </IconCard>
          </div>
        </div>
      </section>

      <section className="takeQuiz full-content">
        <div className="group row">
          <div className="column">
            <figure>
              <Image
                src={data.takeQuiz.image.src}
                width={900}
                height={900}
                alt={data.takeQuiz.image.alt}
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
              className="button btn-primary btn-click-quiz"
            />
          </div>
        </div>
      </section>
      <StickyCta ctaLabel="Take the Business Career Quiz" />
    </>
  );
};

export default BusinessSeoPage;
