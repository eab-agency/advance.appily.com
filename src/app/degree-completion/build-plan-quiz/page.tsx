import { Button } from "@/components";
import Image from "next/image";
// eslint-disable-next-line import/no-unresolved

import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

const title = "Forge Your Path in Business";
const description = "Appily Business Quiz";

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
              remember, every great journey begins with a single step—and you're
              already on your way.
            </p>
            <p>Here's what your plan unlocks:</p>
            <ul>
              <li>
                <strong>Clarity and Confidence:</strong> No more
                second-guessing. Every piece of advice here is tailored to help
                you navigate your educational journey with ease.
              </li>
              <li>
                <strong>A Future Tailored to You:</strong> Your goals, your
                aspirations, your pace. Embrace the exciting opportunities that
                lie ahead.
              </li>
            </ul>
            <Button
              label="Answer a Few Questions"
              appearance="primary"
              href="/degree-completion/build-plan-quiz/start"
              className="button btn-primary"
            />
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
