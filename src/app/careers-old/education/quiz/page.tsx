import React, { Suspense } from "react";
import RandomComponent from "@/hooks/useRandomComponent";
import ABButton from "@/components/Button/ABButton";
import Image from "next/image";
// eslint-disable-next-line import/no-unresolved

import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

const title = "Education Career Quiz";
const description =
  "Take our free quiz, Chart Your Course in Education, to see which career and degree paths might be right for you.";

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
  const ButtonOne = (
    <ABButton
      label="Get Started"
      appearance="primary"
      href="https://my.appily.com/register/adult/educationcareers1"
      className="button btn-primary btn-click-quiz"
    />
  );

  const ButtonTwo = (
    <ABButton
      label="Get Started"
      appearance="primary"
      href="/careers/education/quiz/start"
      className="button btn-primary btn-click-quiz"
    />
  );
  return (
    <>
      <div className="quiz-wrapper">
        <section className="quiz-container group row cols-2">
          <div className="column">
            <header>
              <h1>
                Chart Your Course <strong>in Education</strong>
              </h1>
            </header>
            <p>
              Are you a teacher looking to stay in education but leave the
              classroom? Maybe you’re ready to advance your current education
              career? Or are you in a different field but want to apply your
              skills to helping shape the future?
            </p>
            <p>
              If you want to work in education but you don’t know which job fits
              your skills and interests,{" "}
              <strong>this free quiz can help find a good fit</strong>
              and you plan your next steps.
            </p>
            <p>
              The Bureau of Labor Statistics predicts nearly{" "}
              <strong>900 thousand jobs in education</strong> will be created
              each year over the next decade. Many colleges and universities
              offer flexible, affordable degrees or certificates that can help
              you get a head start in transferring your skills to a new or more
              advanced role.
            </p>
            <p>
              <strong>
                In less than three minutes, you could discover which type of{" "}
                education career could be a good fit for you.
              </strong>{" "}
              We’ll also connect you with schools near you that offer degrees to
              help you reach your goals.
            </p>
            <Suspense>
              <RandomComponent
                PercentageComponent={ButtonOne}
                FallBackComponent={ButtonTwo}
              />
            </Suspense>
          </div>
          <figure className="column highlighted-img">
            <Image
              src="/images/education/teacher-in-front-of-blackboard.jpg"
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
