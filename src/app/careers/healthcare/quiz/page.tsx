import { Button } from "@/components";
import Image from "next/image";

import percentageSplit from "@/lib/percentageSplit";
import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";
import RandomComponent from "@/hooks/useRandomComponent";

const title = "Health Care Career Quiz";
const description = "Take our free quiz, Define Your Future in Health Care, to see which career and degree paths might be right for you.";



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

export default function QuizLandingPage({
	searchParams,
  }: {
	searchParams: { [key: string]: string | string[] | undefined }
  }) {
	// convert searchParams back to a url parameter string
	const searchParamsString = new URLSearchParams(
	  Object.entries(searchParams).reduce((params, [key, value]) => {
		if (typeof value === 'string') {
		  params[key] = value;
		} else if (Array.isArray(value)) {
		  params[key] = value.join(',');
		}
		return params;
	  }, {} as Record<string, string>)
	).toString();
	
	const ButtonOne = <Button
	label="Get Started +"
	appearance="primary"
	href={`https://my.appily.com/register/quiz/healthcarecareers1/?${searchParamsString}`}
	className="button btn-primary btn-click-quiz"
	/>
	
	const ButtonTwo = <Button
	label="Get Started"
	appearance="primary"
	href="/careers/healthcare/quiz/start"
	className="button btn-primary btn-click-quiz"
	/>

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
						<RandomComponent ButtonOne={ButtonOne} ButtonTwo={ButtonTwo} />

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
