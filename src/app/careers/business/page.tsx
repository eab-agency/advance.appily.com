"use client";
import Image from "next/image";
import React, { useRef } from "react";

import {
	Accordion,
	Button,
	Card,
	CarouselWithForm,
	Stats,
	StickyCta,
} from "@/components";
import data from "@/data/careers-business.json";


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
<div className="pageLayout">
  <main className="page-layout__container">
    <div className="page-layout__content">
      <div className="container">
        <div className="content">
          <section className="pageHero">
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
								</section>
<section className="quizSection">
  <figure>
    <Image
      src="/images/profesional-man-researching-online.jpg"
      width={800}
      height={480}
      alt="Profesional man researching online"
    />
  </figure>

  <div className="intro">
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
      className="button"
    />
  </div>
</section>
<Stats
  stats={data.stats}
  source={data.statsSource}
  className="stats"
/>
<section className="whyChoose">
  <div className="intro">
										<h2>{data.whyChoose.title}</h2>
										<h3>{data.whyChoose.subTitle}</h3>
										<p
											dangerouslySetInnerHTML={{
												__html: data.whyChoose.description,
											}}
										/>
									</div>
<div className="whyChooseContent">
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
										<figure>
											<Image
												src="/images/doctor-wearing-mas-and-sthethoscope.jpg"
												width={478}
												height={284}
												alt="Doctor wearing mask and a sthethoscope"
											/>
										</figure>
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
								<section className="mbaVsBusinessMasters">
									<h3>
										MBA vs. Specific Business Master's Degrees:{" "}
										<strong>Maximizing Your Career Investment</strong>
									</h3>
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
								</section>
								<section>
									<Card title="ROI (Return on Investment):" icon="ROI">
										<>
											<h5>MBA:</h5>
											<p>
												Higher ROI due to broader business knowledge, leadership
												training, and networking opportunities.
											</p>
											<p>
												Higher starting salaries and potential for significant
												long-term earnings.
											</p>
											<h5>Specific Business Master's:</h5>
											<p>
												Good ROI, especially for those with a clear career path
												in a specialized field (e.g., finance, accounting).
											</p>
										</>
									</Card>
									<Card title="ROI (Return on Investment):" icon="ROI">
										<>
											<h5>Career Opportunities:</h5>
											<p>
												Diverse range of industries (finance, consulting,
												marketing, entrepreneurship).
											</p>
											<p>Versatile skills for career advancement.</p>
											<h5>Specific Business Master's:</h5>
											<p>
												Specialized education in a particular field (e.g.,
												finance, accounting).
											</p>
											<p>Tailored skills for specific career paths.</p>
										</>
									</Card>
								</section>
								<div id="explore-your-school-matches" ref={carouselRef}>
									<CarouselWithForm />
								</div>
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
											appearance="primary"
											label={data.takeQuiz.buttonText}
											href="/careers/business/quiz"
											className="button"
										/>
									</div>
									hp
								</section>
							</div>
						</div>
					</div>
				</main>
			</div>
			<StickyCta trackedElement={carouselRef} />
		</>
	);
};

export default BusinessSeoPage;
