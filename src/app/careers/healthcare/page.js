"use client";
import Image from "next/image";
import React, { useRef } from "react";

import { Button, CarouselWithForm, Stats, StickyCta } from "@/components";
import data from "@/data/careers-healthcare.json";
import styles from "@/styles/global/layouts/SeoPage.module.scss";

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
			<div className={styles.pageLayout}>
				<main className="page-layout__container">
					<div className="page-layout__content">
						<div className={styles.container}>
							<div className={styles.content}>
								<section className={styles.pageHero}>
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
								<section className={styles.quizSection}>
									<figure>
										<Image
											src="/images/profesional-man-researching-online.jpg"
											width={800}
											height={480}
											alt="Profesional man researching online"
										/>
									</figure>

									<div className={styles.intro}>
										<h2>{data.quizSection.title}</h2>
										<div
											dangerouslySetInnerHTML={{
												__html: data.quizSection.content,
											}}
										/>
										<Button
											type="primary"
											label={data.quizSection.buttonText}
											href="/careers/healthcare/quiz"
											className={styles.button}
										/>
									</div>
								</section>
								<Stats
									stats={data.stats}
									source={data.statsSource}
									className={styles.stats}
								/>
								<section className={styles.whyChoose}>
									<div className={styles.intro}>
										<h2>{data.whyChoose.title}</h2>
									</div>
									<div className={styles.whyChooseContent}>
										<ul>{reasonsList}</ul>
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
								<section className={styles.testimonial}>
									<div className={styles.quotation}>
										<blockquote>
											<p>{data.testimonial.text}</p>
											<div className={styles.testimonialAuthor}>
												<p>{data.testimonial.author}</p>
												<small>{data.testimonial.authorTitle}</small>
											</div>
										</blockquote>
									</div>
								</section>
								<section className={styles.rightCareer}>
									<div className={styles.intro}>
										<h2>{data.rightCareer[0].title}</h2>
										<p>{data.rightCareer[0].description}</p>
									</div>
									<ul>{rightCareerList}</ul>
								</section>
								<div id="explore-your-school-matches" ref={carouselRef}>
									<CarouselWithForm />
								</div>
								<section className={styles.whatIsCappex}>
									<div className={styles.content}>
										<figure>
											<Image
												src="/images/college-search.png"
												width={536}
												height={361}
												alt="What is Appily?"
											/>
										</figure>
										<section className={styles.goingToCollege}>
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
								<section className={styles.takeQuiz}>
									<div className={styles.content}>
										<h2>{data.takeQuiz.title}</h2>
										<p>{data.takeQuiz.description}</p>
										<Button
											type="primary"
											label={data.takeQuiz.buttonText}
											href="/careers/healthcare/quiz"
											className={styles.button}
										/>
									</div>
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

export default HealthCareSeoPage;
