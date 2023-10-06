import { Button } from "@/components";
import Head from "next/head";
import Image from "next/image";
// eslint-disable-next-line import/no-unresolved

export default function QuizLandingPage() {
  return (
    <>
      <Head>
        <title>Define Your Future in Health Care | Health Science Quiz</title>
        <meta name="description" content="Appily Health Science Quiz" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="quiz-wrapper">
        <section className="quiz-container group row cols-2">
          <div className="column">
            <header>
              <h1>Define Your Future in <strong>Health Care</strong></h1>
            </header>
            <p>
              If you’re considering a career change, a role in health care
              could be a great fit. The Bureau of Labor Statistics predicts
              about{" "}
              <strong>
                2 million jobs in health care will be created each year over
                the next decade
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
            <Button
              label="Get Started"
              appearance="primary"
              href="/careers/healthcare/quiz/start"
              className="button btn-primary"
            />
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
