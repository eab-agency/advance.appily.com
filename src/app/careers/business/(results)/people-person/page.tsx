"use client";
import data from "@/data/results-people-person.json";
import { useRef } from "react";
import { BiLinkExternal } from "react-icons/bi";

import {
	Accordion,
	CareerPaths,
	CarouselWithForm,
	NavBar,
	Stats,
	StickyCta,
	Tabs,
	TextWithImage,
} from "@/components";
import dataLinks from "@/data/links-business.json";
import styles from "@/styles/components/FinalPage.module.scss";

export default function Page() {
	const carouselRef = useRef(null);
	const { results: links } = dataLinks;

	return (
		<>
			<div className={styles.container}>
				<div className={styles.content}>
					<span className="intro-title">Your ideal role could be ...</span>
					<section className={styles["intro-section"]}>
						<h1>{data.title}</h1>
						<p>{data.detailedDescription}</p>
					</section>
					{links && <NavBar links={links} />}

					<Tabs className="react-tabs" tabs={data.tabs} />

					<CareerPaths careerPaths={data.careerPaths} />

					<Stats stats={data.stats} source={data.statsSource} />

					<TextWithImage
						content={data.textWithImage.content}
						imagePath={data.textWithImage.imagePath}
						className="whatever-you-need"
					/>
					<section>
						<h3>{data.degreeTabs.title}</h3>
						<p>{data.degreeTabs.description}</p>
						{data.degreeTabs.degrees.map(degree => (
							<Accordion title={degree.title} key={degree.title}>
								<div dangerouslySetInnerHTML={{ __html: degree.content }} />
							</Accordion>
						))}
					</section>
					<div
						id="explore-your-school-matches"
						className={styles.carouselWithForm}
						ref={carouselRef}
					>
						<CarouselWithForm formId="3" />
					</div>
					<section className={styles["keep-exploring"]}>
						<div className={styles.sourceContent}>
							<h2>Keep exploring</h2>
							<p>
								Much of the career, education, and salary information above was
								sourced from the Bureau of Labor Statistics. You can find
								state-specific job outlooks and salary details as well as even
								more information on related careers on their website.
							</p>
							<a
								href="https://www.bls.gov/ooh/healthcare/home.htm"
								target="_blank"
								rel="noreferrer"
								className="button btn-secondary"
							>
								Bureau of Labor Statistics{" "}
								<i>
									<BiLinkExternal />
								</i>
							</a>
						</div>
					</section>
				</div>
			</div>
			<StickyCta trackedElement={carouselRef} />
		</>
	);
}
