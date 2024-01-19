import Image from "next/image";

import { Button, CarouselWithForm, Header } from "@/components";
import { IconCard } from "@/components/IconCard/IconCard";
import Link from "next/link";

import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

const title = "Discover Your Career";
const description =
	"Looking for the career that’s best for you? Choose your career path and the degree to help you reach your goals with Appily Advance.";

export const metadata: Metadata = {
	openGraph: mergeOpenGraph({
		title: title,
		description: description,
	}),
	twitter: mergeTwitter({
		title: title,
		description: description,
	}),
	title: title,
	description: description,
};

const CareersSeoPage = () => {
	return (
		<>
			<section className="pageHero">
				<div className="group center-aligned center-justified">
					<h1>
						Wondering <strong>which career</strong> is right for you?
					</h1>
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
						<h2>Feeling lost, stuck, or just ready for a change?</h2>
						<div>
							<p className="featuredParagraph">
								Take one of Appily’s free career tests to see what type of job
								fits your goals and skills!
							</p>
							<p>
								In today's dynamic job market, finding the right career path can
								be a daunting task. Appily understands the importance of a
								fulfilling and purpose-driven career.{" "}
								<strong>
									Our comprehensive career tests are tailored to provide you
									with insights into your strengths, interests, and aspirations.
								</strong>
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="comparison">
				<div className="group column center-aligned">
					<div className="intro-text">
						<h2>
							<strong>Free Career Quizzes</strong>
						</h2>
						<p>
							Whether you’re <strong>just starting out</strong> on your career
							journey, are interested in <strong>changing careers,</strong> or
							are looking to <strong>advance your current career,</strong> these
							career tests will match you with possible career paths based on
							your skills, experience, and interests.
						</p>
					</div>

					<div className="infograph row cols-2">
						<IconCard
							title="Business"
							iconUrl="/images/business-icon.svg"
							iconAlt="Business icon"
							className="roi-card"
						>
							<h4>Forge Your Path in Business</h4>
							<p>
								There are many ways to excel in business, whether you’re
								interested in leadership, creating content, starting your own
								business, crunching numbers, or guiding people and processes to
								success.
							</p>
							<p>
								Once you{" "}
								<Link href="/careers/business/quiz/start">
									complete the quiz
								</Link>
								, we’ll share which path can fit your strengths and provide some
								insights into career outcomes you might expect.
							</p>
							<Button
								type="button"
								href="/careers/business/quiz/start"
								label="Business Career Quiz"
								className="button btn-primary btn-click-quiz"
							/>
						</IconCard>

						<IconCard
							title="Health Care"
							iconUrl="/images/healthcare-icon.svg"
							iconAlt="Health Care icon"
							className="roi-card"
						>
							<h4>Define Your Future in Health Care</h4>
							<p>
								More than two million health care jobs are predicted to be
								created each year over the next decade. These range from patient
								care to scientific research, public health to administration,
								and much more.
							</p>
							<p>
								If you want to help people, there’s a place in health-care for
								you.{" "}
								<Link href="/careers/healthcare/quiz/start">
									Take the quiz today
								</Link>{" "}
								and we’ll help you find the perfect role that matches your
								skills and interests.
							</p>
							<Button
								type="button"
								href="/careers/healthcare/quiz/start"
								label="Healthcare Career Quiz"
								className="button btn-primary btn-click-quiz"
							/>
						</IconCard>
					</div>
					<div className="sectionFooter makingAPlan">
						<div className="group center-aligned column">
							<h3>Making a Plan</h3>
							<p>
								You’ve got your results — now what? Appily will help you
								understand which degrees (and schools) can help you reach your
								career goals!
							</p>
						</div>
					</div>
				</div>
			</section>

			<div id="explore-your-school-matches">
				<CarouselWithForm />
			</div>

			<section className="whyChoose">
				<div className="group center-aligned cols-2">
					<div className="column">
						<div className="intro">
							<h2>
								Appily Advance: An All-in-One Resource for
								<strong>Going Back to College</strong>
							</h2>
							<p>
								Appily is the future of higher education guidance, uniting
								trusted tools that have empowered students for almost two
								decades. Born from respected platforms including Cappex,
								Concourse, YouVisit, and College Greenlight, Appily offers a
								seamless experience for students of all ages on their journey to
								college.{" "}
							</p>

							<p>
								Discover your ideal career path, make a plan to reach your
								academic and professional goals, and match with colleges that
								can help you get there — all in one place. Take the next step in
								achieving your academic goals with confidence.
							</p>
						</div>
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
		</>
	);
};

export default CareersSeoPage;
