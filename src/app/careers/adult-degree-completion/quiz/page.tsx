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
                How Ready are You to<strong>Finish Your Degree?</strong>
              </h1>
            </header>
            <p>
              Earning a degree is a big step with lots of benefits:
            </p>
            <ul>
              <li><strong>Higher Earnings:</strong> More money in the long run (up to 66% more!).</li>
              <li><strong>Better Opportunities:</strong> Access to great jobs and careers.</li>
              <li><strong>Stability:</strong> A steadier and more secure future.</li>
              <li><strong>Personal Growth:</strong> Learn new things and think in new ways.</li>
            </ul>
            <p>
              This quiz will look at your time, plans, and motivation. Each question is designed to show if you're on the right path to succeed in your studies.
            </p>
            <p>
              So, are you excited to find out? Let’s get started!
            </p>
            <Button
              label="Take the Quiz"
              appearance="primary"
              href="/careers/adult-degree-completion/quiz/start"
              className="button btn-primary"
            />
          </div>
          <figure className="column highlighted-img">
            <Image
              src="/images/cappex-define-your-future-img.jpg"
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
