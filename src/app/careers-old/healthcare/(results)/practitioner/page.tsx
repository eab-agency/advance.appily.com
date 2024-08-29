/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Suspense } from "react";

import {
  Accordion,
  CarouselWithForm,
  KeepExploring,
  StickyCta,
  SubNav,
  Tabs,
} from "@/components";
import { useUser } from "@/context/context";
import dataLinks from "@/data/links-healthcare.json";
import data from "@/data/results-practitioner.json";

import StatisticsSection from "@/blocks/StatisticsSection";

function TabsFallback() {
  return <>Tabs loading...</>;
}

export default function Page() {
  const carouselRef = useRef(null);
  const { results: links } = dataLinks;
  const { setVertical, vertical } = useUser();
  useEffect(() => {
    setVertical("Health Care");
  }, [setVertical]);

  return (
    <>
      <div className="resultContent">
        <section className="resultsHero">
          <div className="group">
            <div className="heroContent column">
              <div className="intro-title">
                <span>Your ideal role could be ...</span>
              </div>
              <h1>{data.title}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: data.detailedDescription }}
              />
            </div>
            {/* <figure className="column">
              <Lottie animationData={computerWhiz} loop={true} />
            </figure> */}
          </div>
        </section>

        {links && <SubNav links={links} />}
        <Suspense fallback={<TabsFallback />}>
          <Tabs className="react-tabs" tabs={data.tabs} id="1" />
        </Suspense>

        <section className="career-path">
          <div className="group cols-2">
            <div className="column">
              <div className="path-intro">
                <h2>
                  What's a common health care career path for The Practitioner?
                </h2>
                <p>
                  Occupations that align with The Practitioner’s career path
                  tend to examine, diagnose, treat, or advise patients. There
                  are a wide range of patient care jobs available depending on
                  your interests and goals. Popular and high-need careers
                  include:
                </p>
              </div>
              <div className="executive-path">
                <ul>
                  <li>
                    <strong>Nursing:</strong> Nurses are an essential role in
                    any health care setting, and there are many career
                    advancement opportunities. Most nurses start as an LVN/LPN
                    and move into an RN role. After that, an ARPN role allows
                    nurses to specialize in areas such as nurse anesthetist,
                    midwife, or nurse practitioner, or other advanced career.
                  </li>
                  <li>
                    <strong>Dentistry:</strong> Dental hygienists often only
                    require an associate’s degree to enter the field, and have a
                    natural path to becoming dentists.
                  </li>
                  <li>
                    <strong>Pharmacy:</strong> While a pharmacy degree is
                    required to become a licensed pharmacist, pharmacy
                    technicians help pharmacists dispense medication and are on
                    a natural path to their advanced degree.
                  </li>
                </ul>
              </div>
            </div>
            <figure className="column">
              <Image
                src="/images/nurse.jpg"
                width={478}
                height={284}
                alt="Nurse reading a board"
                className="highlighted-img"
              />
              <figcaption>Nurse</figcaption>
            </figure>
          </div>
          <div className="group cols-2">
            <figure className="column">
              <Image
                src="/images/athletic-trainer-occupational-therapist.jpg"
                width={478}
                height={284}
                alt="Occupational therapist in session"
                className="highlighted-img"
              />
              <figcaption>
                Athletic trainer or occupational therapist
              </figcaption>
            </figure>
            <div className="executive-path column">
              <ul>
                <li>
                  <strong>Therapy:</strong> There are a range of careers such as
                  respiratory and occupational therapy that don’t require a
                  doctoral degree. These can be a good entry point to the
                  medical field.
                </li>
                <li>
                  <strong>Medicine:</strong> While there are common professional
                  degrees in medicine such as the MD and DO, there are careers
                  that require less schooling that still involve patient care,
                  such as a Physician’s Assistant.
                </li>
                <li>
                  <strong>Nutrition and Athletic Training:</strong> Preventive
                  wellness is an important part of health care, and these
                  careers often only require a bachelor’s or master’s degree.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <StatisticsSection statistics={data.stats} source={data.statsSource} statsLayoutWidth="contained" />

        <section className="best-degrees">
          <div className="degrees-intro">
            <h2>What are the best health care degrees for The Practitioner?</h2>
            <p>
              For many roles in The Practitioner’s career path, a bachelor’s
              degree is a minimum qualification. Master’s degrees are common and
              often preferred, especially for more senior management roles.
            </p>
          </div>
          <Suspense fallback={<TabsFallback />}>
            <Tabs tabs={data.degreeTabs} className="degree-tabs" id="2" />
          </Suspense>
        </section>
        <section className="certificates">
          <Accordion title="Does The Practitioner need a license, certification, or registration?">
            <figure>
              <Image
                src="/images/certificate-image.svg"
                width={478}
                height={284}
                alt="Medical records"
              />
            </figure>
            <div>
              <p>
                Most jobs involving patient care require licensure. Nurses,
                occupational therapists, physicians and physician’s assistants,
                chiropractors, dentists, and pharmacists are required by all
                states to have licenses.
              </p>
              <p>
                Sometimes this requires a national licensure exam or a
                state-specific test. It may also require a certain number of
                practicing hours as an intern or resident. The good news is that
                most degree programs are designed to prepare students to sit for
                these tests.
              </p>
            </div>
          </Accordion>
        </section>

        <div
          id="explore-your-school-matches"
          className="carouselWithForm"
          ref={carouselRef}
        >
          <CarouselWithForm formId="3" collectData={false} />
        </div>

        <KeepExploring />
      </div>
      <StickyCta trackedElement={carouselRef} />
    </>
  );
}
