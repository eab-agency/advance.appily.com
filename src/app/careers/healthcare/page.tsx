import Image from "next/image";

import { Accordion, Button, StickyCta, Testimonial } from "@/components";
import data from "@/data/careers-healthcare.json";
import percentageSplit from "@/lib/percentageSplit";

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
};

/* eslint-disable react/no-danger */
export default function HealthCareSeoPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // convert searchParams back to a url parameter string
  const searchParamsString = new URLSearchParams(
    Object.entries(searchParams).reduce(
      (params, [key, value]) => {
        if (typeof value === "string") {
          params[key] = value;
        } else if (Array.isArray(value)) {
          params[key] = value.join(",");
        }
        return params;
      },
      {} as Record<string, string>,
    ),
  ).toString();

  const inPercentageRange = percentageSplit();

  const reasonsArray = data.whyChoose.reasons;
  const rightCareerArray = data.rightCareer.reasons;
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
                width={1000}
                height={1000}
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

            {inPercentageRange ? (
              <Button
                label="Get Started"
                href={`https://my.appily.com/register/adult/healthcarecareers1/?${searchParamsString}`}
                // href=`https://my.appily.com/register/adult/healthcarecareers1/`
                className="button btn-primary btn-click-quiz"
              />
            ) : (
              <Button
                type="button"
                label={data.quizSection.buttonText}
                href={data.quizSection.buttonLink}
                className="button btn-primary btn-click-quiz"
              />
            )}
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
                src={data.whyChoose.image.src}
                width={478}
                height={284}
                alt={data.whyChoose.image.alt}
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
            <h2 dangerouslySetInnerHTML={{ __html: data.rightCareer.title }} />
            <p>{data.rightCareer.description}</p>
          </div>
          <ul>{rightCareerList}</ul>
        </div>
      </section>

      <section className="takeQuiz full-content">
        <div className="group row">
          <div className="column">
            <figure>
              <Image
                src={data.takeQuiz.image.src}
                width={800}
                height={800}
                alt={data.takeQuiz.image.alt}
              />
            </figure>
          </div>
          <div className="content column">
            <h2>{data.takeQuiz.title}</h2>
            <p>{data.takeQuiz.description}</p>

            {inPercentageRange ? (
              <Button
                label="Get Started"
                href="https://my.appily.com/register/adult/healthcarecareers1/"
                className="button btn-primary btn-click-quiz"
              />
            ) : (
              <Button
                type="button"
                label={data.takeQuiz.buttonText}
                href={data.takeQuiz.buttonLink}
                className="button btn-primary btn-click-quiz"
              />
            )}
          </div>
        </div>
      </section>
      <StickyCta ctaLabel="Take the Health Care Career Quiz" />
    </>
  );
}
