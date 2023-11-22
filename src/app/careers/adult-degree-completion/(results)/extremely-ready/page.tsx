/* eslint-disable react/no-unescaped-entities */
"use client";
import extremelyReady from "@/assets/lotties/extremely-ready-dark-mode.json";
import AdcResultsHero from "@/components/Heros/AdcResultsHero";
import { useEffect, useRef } from "react";

import {
  Button,
  CarouselWithForm,
  KeepExploring,
  StickyCta,
  Tabs,
  TextWithImage,
} from "@/components";
import { useUser } from "@/context/context";
import heroData from "@/data/AdcResults/adc-readyness-results.json";
import data from "@/data/AdcResults/extremely-ready.json";
import Image from "next/image";

export default function Page() {
  const carouselRef = useRef(null);
  const { setVertical, vertical } = useUser();
  useEffect(() => {
    setVertical("Business");
  }, []);


  return data ? (
    <>
      <div className="resultContent">
        <AdcResultsHero
          data={heroData.extremelyReady}
          animationData={extremelyReady}
        />

        <Tabs className="react-tabs" tabs={data.tabs} />

        <section className="nextSteps">
          <div className="content-wrapper">
            <header className="row columns introText">
              <div className="column">
                <h2
                  dangerouslySetInnerHTML={{
                    __html: data.nextSteps.title,
                  }}
                />
                <div dangerouslySetInnerHTML={{ __html: data.nextSteps.introContent }} />
                <Button
                  appearance="primary"
                  className="button btn-primary"
                  href={data.nextSteps.buttonLink}
                  label={data.nextSteps.buttonText}
                />
              </div>
              <figure className="column highlighted-img">
                <Image
                  src="/images/business-hero-image.jpg"
                  alt="Next Steps Image"
                  width={480}
                  height={480}
                />
              </figure>
            </header>
            <div className="steps columns">
              <figure className="column">
                <Image
                  src="/images/business-hero-image.jpg"
                  alt="Next Steps Image"
                  width={480}
                  height={480}
                />
              </figure>
              <div className="column">
                <h3>{data.nextSteps.title}</h3>
                <ul>
                  {data.nextSteps.steps.list.map((step, index) => (
                    <li key={index} className="step"
                      dangerouslySetInnerHTML={{ __html: step.step.content || '' }}
                    />
                  ))}
                </ul>
                <Button
                  appearance="primary"
                  className="button btn-primary"
                  href={data.nextSteps.steps.buttonLink}
                  label={data.nextSteps.steps.buttonText}
                />
              </div>
            </div>
          </div>
        </section>

        <div
          id="explore-your-school-matches"
          className="carouselWithForm"
          ref={carouselRef}
        >
          <CarouselWithForm formId="7" />
        </div>

        <KeepExploring trackedElement={carouselRef} />
      </div>
      <StickyCta trackedElement={carouselRef} />
    </>
  ) : null;
}
