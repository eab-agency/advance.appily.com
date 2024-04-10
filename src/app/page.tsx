import Image from "next/image";
import Link from "next/link";

import { Button, CarouselWithForm } from "@/components";

import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

import PageHero from "@/components/Heros/PageHero";
import takeQuizImg from "@images/explore-your-path.webp";

const title = "Your ideal role is in reach | Appily Advance";
const description =
  "Discover your ideal role and find schools that offer degrees to help you reach your goals.";

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

const RootPage = () => {
  return (
    <>
      <PageHero
        image={{
          src: "/images/thinking-of-returning.webp",
          alt: "Business woman",
        }}
      >
        <h1>
          Thinking of <strong>Returning to College?</strong>
        </h1>
        <p>Find tools and tips to help you <strong>advance</strong> your studies — and your career.</p>
      </PageHero>
      <section className="quizSection">
        <div className="group center-aligned row cols-2">
          <div className="column">
            <figure className="highlighted-img">
              <Image
                src={takeQuizImg}
                alt="Profesional man researching online"
              />
            </figure>
          </div>
          <div className="column intro-text">
            <h2>Explore Your Path to Advanced Education</h2>
            <div>
              <p>
                If you're eager to <strong>pursue graduate studies</strong> or <strong>complete your undergraduate degree</strong> (and you aren’t currently in high school) Appily Advance is the resource for you.</p>

              <p>With <Link href="/careers">career quizzes</Link> and <Link href="/degree-completion">degree planning tools</Link>, we can help you find your path forward and understand the best way to get where you want to go.
              </p>
              <p>
                <strong>Still in high school?</strong>
                <br />
                <a href="https://www.appily.com">
                  Find resources for high school students
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="group column center-aligned centered-content narrow">
          <h2>
            Plan for success with <strong>Our Free Career Quizzes</strong>
          </h2>
          <p>
            Whether you’re just starting out on your career journey, are
            interested in changing careers, or are looking to advance your
            current career, these career tests will match you with possible
            career paths based on your skills, experience, and interests.
          </p>
          <Button
            type="button"
            href="/careers"
            label="Explore Career Quizzes"
            className="button btn-primary"
          />
        </div>
      </section>

      <div id="explore-your-school-matches">
        <CarouselWithForm formId="10" />
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
                can help you get there—all in one place. Take the next step in
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
