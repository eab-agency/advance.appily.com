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
import data from "@/data/careers-education.json";
import Link from "next/link";

/* eslint-disable react/no-danger */
const BusinessSeoPage = () => {
	const { setVertical } = useUser();
	useEffect(() => {
		setVertical("Education");
	}, []);
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
							src="/images/business-hero-image.jpg"
							width={1000}
							height={1000}
							alt="Business woman wor"
						/>
					</figure>
				</div>
			</section>
			<section className="quizSection">
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
						<h2>{data.quizSection.title}</h2>
						<div
							dangerouslySetInnerHTML={{
								__html: data.quizSection.content,
							}}
						/>
						<Button
							appearance="primary"
							label={data.quizSection.buttonText}
							href="/careers/education/quiz"
							className="button btn-primary btn-click-quiz"
						/>
					</div>
				</div>
			</section>

			<Stats
				stats={data.stats}
				source={data.statsSource}
				className="stats-section"
			/>

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
								src="/images/whats-the-difference-mba-specific-master.jpg"
								width={480}
								height={480}
								alt="Man using a tablet device"
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
			{/* <div id="explore-your-school-matches" ref={carouselRef}>
				<CarouselWithForm formId="8" />
			</div> */}

			<WhatIsCappex />

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
							href="/careers/education/quiz"
							className="button btn-primary btn-click-quiz"
						/>
					</div>
				</div>
			</section>
			<StickyCta />
		</>
	);
};

export default BusinessSeoPage;
