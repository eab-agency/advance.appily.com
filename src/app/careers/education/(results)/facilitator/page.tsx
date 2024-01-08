/* eslint-disable react/no-unescaped-entities */
"use client";
import creativeMarketer from "@/assets/lotties/creativeMarketer.json";
import Lottie from "lottie-react";
import { Suspense } from "react";
import { useEffect, useRef } from "react";

import {
	CareerPaths,
	CarouselWithForm,
	ChoosingRightSchoolBusinessDegree,
	KeepExploring,
	Stats,
	StickyCta,
	SubNav,
	Tabs,
	TextWithImage,
	WhatDegrees,
} from "@/components";

import { useUser } from "@/context/context";
import dataLinks from "@/data/links-education.json";
import data from "@/data/results/education/facilitator.json";

function TabsFallback() {
	return <>Tabs loading...</>;
}

export default function Page() {
	const carouselRef = useRef(null);
	const { results: links } = dataLinks;
	const { setVertical, vertical } = useUser();
	useEffect(() => {
		setVertical("Education");
	}, []);
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
							<p>{data.detailedDescription}</p>
						</div>
						<figure className="column">
							<Lottie animationData={creativeMarketer} loop={true} />
						</figure>
					</div>
				</section>

				{links && <SubNav links={links} />}

				<Suspense fallback={<TabsFallback />}>
					<Tabs className="react-tabs" tabs={data.tabs} />
				</Suspense>

				<Stats stats={data.stats} source={data.statsSource} />

				{/* <WhatDegrees whatDegreesData={data.degreeTabs} /> */}

				<div
					id="explore-your-school-matches"
					className="carouselWithForm"
					ref={carouselRef}
				>
					<CarouselWithForm formId="7" collectData={false} />
				</div>

				<ChoosingRightSchoolBusinessDegree />

				<KeepExploring trackedElement={carouselRef} />
			</div>

			<StickyCta trackedElement={carouselRef} />
		</>
	);
}
