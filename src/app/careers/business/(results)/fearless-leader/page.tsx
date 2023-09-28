/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import { useRef } from "react";
import { BiLinkExternal } from "react-icons/bi";

import {
	Accordion,
	CareerPaths,
	CarouselWithForm,
	Stats,
	StickyCta,
	Tabs,
} from "@/components";
import styles from "@/styles/global/layouts/FinalPage.module.scss";
import { usePathname } from "next/navigation";
import useSWR from "swr";

const AnalystPage = () => {
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
					<section className={styles["best-degrees"]}>
						<div className={styles["degrees-intro"]}>
							<h2>What are the best health care degrees for The Analyst?</h2>
							<p>
								The degree necessary for careers in The Analyst's path varies
								depending on responsibilities. An associate's degree is a
								minimum requirement, with many roles preferring a bachelor's or
								master's degree.
							</p>
						</div>
						<Tabs tabs={data.degreeTabs} className="degree-tabs" />
					</section>
					<section className={styles.certificates}>
						<Accordion title="Does The Analyst need a license, certification, or registration?">
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
									Employers may prefer to hire health information technologists
									and medical registrars who have certification, or they may
									expect applicants to earn certification after being hired.
								</p>
								<p>
									Credentials for a variety of specializations are available
									from professional organizations, including the Registered
									Health Information Technician (RHIT), the Certified
									Documentation Improvement Practitioner (CDIP), and the
									Certified Health Data Analyst (CHDA).
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
};

export default AnalystPage;
