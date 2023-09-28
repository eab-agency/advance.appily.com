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

export default function Page() {
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

					<section className={styles.certificates}>
						{/* <div className={styles.accordionHead}> */}
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
									occupational therapists, physicians and physician’s
									assistants, chiropractors, dentists, and pharmacists are
									required by all states to have licenses.
								</p>
								<p>
									Sometimes this requires a national licensure exam or a
									state-specific test. It may also require a certain number of
									practicing hours as an intern or resident. The good news is
									that most degree programs are designed to prepare students to
									sit for these tests.
								</p>
							</div>
						</Accordion>
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
