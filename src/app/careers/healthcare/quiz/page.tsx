import { Button } from "@/components";
import Image from "next/image";
// eslint-disable-next-line import/no-unresolved

import percentageSplit from "@/lib/percentageSplit";
import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

const title = "Define Your Future in Health Care";
const description = "Appily Health Care Quiz";

export const metadata: Metadata = {
	title: title,
	description: description,
	openGraph: mergeOpenGraph({
		title: title,
		description: description,
	}),
	twitter: mergeTwitter({
		title: title,
		description: description,
	}),
};

export default function QuizLandingPage() {
	const inPercentageRange = percentageSplit(0.25);
	return (
		<>
			<div className="quiz-wrapper">
				<section className="quiz-container group row cols-2">
					<div className="column">
						<header>
							<h1>
								Define Your Future in <strong>Health Care</strong>
							</h1>
						</header>
						<p>
							If you’re considering a career change, a role in health care could
							be a great fit. The Bureau of Labor Statistics predicts about{" "}
							<strong>
								2 million jobs in health care will be created each year over the
								next decade
							</strong>
							—and many colleges and universities offer flexible, affordable
							degrees or certificates that can help you get a head start in
							transferring your skills to a new or more advanced role.
						</p>

						<p>
							In less than three minutes, you could{" "}
							<strong>discover which role could be a good fit for you</strong>
							—and the steps you can take to advance your career.
						</p>
						
						{inPercentageRange ? (
							<Button
							label="Get Started +"
							appearance="primary"
							href="https://my.appilyqa.com/register/quiz/healthcarecareers1/"
							className="button btn-primary btn-click-quiz"
							/>
									) : (
										<Button
							label="Get Started"
							appearance="primary"
							href="/careers/healthcare/quiz/start"
							className="button btn-primary btn-click-quiz"
						/>
											)
											}

					</div>
					<figure className="column highlighted-img">
						<Image
							src="/images/cappex-define-your-future-img.jpg"
							alt="Define Your Future in Health Care"
							// fill
							width={500}
							height={600}
						/>
					</figure>
				</section>
			</div>
		</>
	);
}
