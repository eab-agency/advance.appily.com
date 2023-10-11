import Image from "next/image";

import { Button, CarouselWithForm, Header } from "@/components";
import { IconCard } from "@/components/IconCard/IconCard";
import Link from "next/link";

const RootPage = () => {
	return (
		<>
			<section className="pageHero">
				<div className="group center-aligned">
					<h1>
						Welcome to <strong>Appily Advance</strong>
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
						<h2>Ready for a change?</h2>
						<div>
							<p>
								Whether you’re looking to complete an undergraduate or graduate
								degree, if you’re headed to college and aren’t currently in high
								school, you’re in the right place.
							</p>
							<p>
								Still in high school?
								<br />
								<a href="https://www.applily.com">
									Find resources for high school students
								</a>
							</p>
						</div>
					</div>
				</div>
			</section>
			<section>
				<h2>
					Plan for success with <strong>Our Free Career Quizzes</strong>
				</h2>
				<p>
					Whether you’re just starting out on your career journey, are
					interested in changing careers, or are looking to advance your current
					career, these career tests will match you with possible career paths
					based on your skills, experience, and interests.
				</p>
				<Button
					type="button"
					href="/careers"
					label="Explore Career Quizzes"
					className="button btn-primary"
				/>
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
								decades. Born from respected platforms like Cappex, Concourse,
								YouVisit, and College Greenlight, Appily offers a seamless
								experience for students of all ages on their journey to college.{" "}
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

export default RootPage;
