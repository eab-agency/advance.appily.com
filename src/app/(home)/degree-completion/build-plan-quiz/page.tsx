import Image from "next/image";
import RandomComponent from "@/hooks/useRandomComponent";
import ABButton from "@/components/Button/ABButton";
// eslint-disable-next-line import/no-unresolved

import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";
import { Suspense } from "react";

const title = "Back-to-School Plan";
const description =
  "Answer a few questions and we'll help you build a plan to go back to school, including how to pay for it and what degrees can prepare you for in-demand careers.";

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
      label="Answer a Few Questions"
      appearance="primary"
      href="https://my.appily.com/register/adult/buildplanquiz1"
      className="button btn-primary"
    />
  );

  const ButtonTwo = (
    <ABButton
      label="Answer a Few Questions"
      appearance="primary"
      href="/degree-completion/build-plan-quiz/start"
      className="button btn-primary"
    />
  );
  return (
    <>
      <div className="quiz-wrapper">
        <section className="quiz-container group row cols-2">
          <div className="column">
            <header>
              <h1>
                Get Your Personalized<strong>Back-to-School Plan</strong>
              </h1>
            </header>
            <p>
              Stepping back into the world of education might seem daunting, but
              remember,{" "}
              <strong>every great journey begins with a single step</strong>—and
              you&apos;re already on your way.
            </p>
            <p>Your plan will include:</p>
            <ul>
              <li>
                Information about the <strong>lifetime value</strong> of a
                bachelor&apos;s degree
              </li>
              <li>
                Tips for <strong>reducing cost</strong> and funding your degree
              </li>
              <li>
                In-demand <strong>career paths</strong> in your area of interest
              </li>
              <li>
                <strong>Degrees and schools</strong> that can help you reach
                your goals
              </li>
              <li>
                Detailed <strong>next steps</strong> you can take
              </li>
            </ul>
            <Suspense>
              <RandomComponent
                PercentageComponent={ButtonOne}
                FallBackComponent={ButtonTwo}
              />
            </Suspense>
          </div>
          <figure className="column highlighted-img">
            <Image
              src="/images/back-to-school-plan.jpg"
              alt="Define Your Future in Business"
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
