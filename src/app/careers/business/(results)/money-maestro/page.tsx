/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { useRef } from "react";
import { BiLinkExternal } from "react-icons/bi";
import useSWR from "swr";

import {
	Accordion,
	CareerPaths,
	CarouselWithForm,
	Stats,
	StickyCta,
	Tabs,
	TextWithImage,
} from "@/components";
import styles from "@/styles/global/layouts/FinalPage.module.scss";
import { usePathname } from "next/navigation";

const EducatorPage = () => {
	const carouselRef = useRef(null);
	const pathname = usePathname();
	const slug = pathname ? pathname.split("/").pop() : "";

	const { data, error, isLoading } = useSWR(
		`/api/quiz/results?result=${slug}&vertical=business`,
	);
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Failed to load {JSON.stringify({ error })} </div>;

	return (
		<>
			<div className={styles.container}>
				<div className={styles.content}>
					<span className="intro-title">Your ideal role could be ...</span>
					<section className={styles["intro-section"]}>
						<h1>{data.title}</h1>
						<p>{data.detailedDescription}</p>
					</section>
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
							<Accordion title={degree.title}>
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
};

export default EducatorPage;
