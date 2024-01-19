import { Button, Header } from "@/components";
import Image from "next/image";
// eslint-disable-next-line import/no-unresolved

import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

const title = "Forge Your Path in Education";
const description = "Appily Education Quiz";

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
	return (
		<>
			{/* <Header /> */}
			<div className="quiz-wrapper">
				<section className="quiz-container group row cols-2">
					<div className="column">
						<header>
							<h1>
								Forge Your Path <strong>in Education</strong>
							</h1>
						</header>
						<p>
							If you want to work in education but you don’t know which job fits
							your skills and interests,{" "}
							<strong>this free quiz can help find a good fit</strong> and you
							plan your next steps.
						</p>
						<p>
							The Bureau of Labor Statistics predicts about nearly one million
							jobs in business will be created each year over the next decade.
							Many colleges and universities offer flexible, affordable degrees
							or certificates that can help you get a head start in transferring
							your skills to a new or more advanced role.
						</p>
						<p>
							In less than three minutes, you could discover which type of
							business career could be a good fit for you. We’ll also connect
							you with schools near you that offer degrees to help you reach
							your goals..
						</p>
						<Button
							label="Take the Quiz"
							appearance="primary"
							href="/careers/education/quiz/start"
							className="button btn-primary btn-click-quiz"
						/>
					</div>
					<figure className="column highlighted-img">
						<Image
							src="/images/cappex-define-your-future-img.jpg"
							alt="Define Your Future in Education"
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
