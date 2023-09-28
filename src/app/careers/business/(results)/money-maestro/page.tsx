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
					<section className={styles["best-degrees"]}>
						<div className={styles["degrees-intro"]}>
							<h2>What are the best health care degrees for The Educator?</h2>
							<p>
								The type of degree needed for various careers in The Educator’s
								path vary. Health education specialists usually need at least a
								bachelor’s degree, community health workers often only need a
								high school diploma, and medical educators often require at
								least a master’s degree.
							</p>
						</div>
						<Tabs tabs={data.degreeTabs} className="degree-tabs" />
					</section>
					<section className={styles.certificates}>
						<Accordion title="Does The Educator need a license, certification, or registration?">
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
									The need for a license or certification depends on the role.
								</p>
								<p>
									Employers may require or prefer that health education
									specialists obtain a Certified Health Education Specialist
									(CHES) credential or the Certified Diabetes Care and Education
									Specialist (CDCES) credential.
								</p>
								<p>
									Some states also offer certification for community health
									workers, which may include completing a training program on
									the job.
								</p>
								<p>
									If you’re interested in helping your resume stand out, many
									universities also offer a Certificate in Public Health that
									can often be completed online and either part-time or in half
									the time of a full master’s degree. A certificate is often
									hyper-focused on the skills you need to excel in your career.
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

export default EducatorPage;
