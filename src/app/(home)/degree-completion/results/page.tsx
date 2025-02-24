"use client";
import { Button, Tabs } from "@/components";
import AdcResultsHero from "@/components/Heros/ReadynessResultsHero";
import HighlightedCtaSection from "@/components/HighlightedCtaSection/HighlightedCtaSection";
import { useUser } from "@/context/context";
import quizData from "@/data/quiz-adc-readiness.json";
import Image from "next/image";
import { Suspense, useEffect, useRef, useState } from "react";

const getAnimationData = async (score) => {
  if (score >= 41 && score <= 50) {
    const data = await import(
      "@/assets/lotties/extremely-ready-dark-mode.json"
    );
    return {
      data: quizData.readinessResults.extremelyReady,
      animationData: data.default,
      nextSteps: quizData.nextSteps.extremelyReady,
    };
  } else if (score >= 31 && score <= 40) {
    const data = await import("@/assets/lotties/very-ready-dark-mode.json");
    return {
      data: quizData.readinessResults.veryReady,
      animationData: data.default,
      nextSteps: quizData.nextSteps.veryReady,
    };
  } else if (score >= 21 && score <= 30) {
    const data = await import("@/assets/lotties/ready-dark-mode.json");
    return {
      data: quizData.readinessResults.ready,
      animationData: data.default,
      nextSteps: quizData.nextSteps.ready,
    };
  } else if (score >= 11 && score <= 20) {
    const data = await import("@/assets/lotties/almost-ready-dark-mode.json");
    return {
      data: quizData.readinessResults.ready,
      animationData: data.default,
      nextSteps: quizData.nextSteps.ready,
    };
  } else if (score >= 0 && score <= 10) {
    const data = await import("@/assets/lotties/dark-not-ready-dark-mode.json");
    return {
      data: quizData.readinessResults.ready,
      animationData: data.default,
      nextSteps: quizData.nextSteps.ready,
    };
  }
};

function TabsFallback() {
  return <>Tabs loading...</>;
}

export default function ADCResultsPage({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const { setVertical, vertical } = useUser();
  useEffect(() => {
    setVertical("ADC");
  }, [setVertical]);

  const carouselRef = useRef(null);
  const [animationData, setAnimationData] = useState(null);
  const [showContent, setShowContent] = useState(false);

  const score = Number(searchParams.score) || 50;

  useEffect(() => {
    const loadAnimationData = async () => {
      const data = await getAnimationData(score);
      if (data) {
        setAnimationData(data.animationData as any); // Add the correct type for animationData
      }
    };

    loadAnimationData();
  }, [score]);

  const handleShowContent = (animationState) => {
    setShowContent(animationState);
  };

  const buildContent = (question, selectedQuizResponse, index) => {
    const answer =
      question.answers[selectedQuizResponse]?.answer ||
      "Incorrect parameter used";
    const dynamicContent =
      question.answers[selectedQuizResponse]?.dynamicContent || "No content";
    return `<p>${answer}</p> ${dynamicContent}`;
  };

  const selectedQuizResponses = Array.from(
    { length: 11 },
    (_, i) => Number(searchParams[`q${i + 1}`]) || 0
  );

  const tabs = quizData.questions.slice(1).map((question, index) => {
    const content = buildContent(
      question,
      selectedQuizResponses[index + 1],
      index + 1
    );
    return { ...question, content };
  });

  const getReadinessResult = (score) => {
    if (score >= 41 && score <= 50) {
      return {
        data: quizData.readinessResults.extremelyReady,
        animationData,
        nextSteps: quizData.nextSteps.extremelyReady,
      };
    } else if (score >= 31 && score <= 40) {
      return {
        data: quizData.readinessResults.veryReady,
        animationData,
        nextSteps: quizData.nextSteps.veryReady,
      };
    } else if (score >= 21 && score <= 30) {
      return {
        data: quizData.readinessResults.ready,
        animationData,
        nextSteps: quizData.nextSteps.ready,
      };
    } else if (score >= 11 && score <= 20) {
      return {
        data: quizData.readinessResults.ready,
        animationData,
        nextSteps: quizData.nextSteps.ready,
      };
    } else if (score >= 0 && score <= 10) {
      return {
        data: quizData.readinessResults.ready,
        animationData,
        nextSteps: quizData.nextSteps.ready,
      };
    }
  };

  const readinessResult2 = getReadinessResult(score);

  return (
    <>
      <div className="resultContent">
        <AdcResultsHero
          data={
            readinessResult2?.data || {
              title: "",
              result: "",
              detailedDescription: "",
              needHelpTitle: "",
              needHelpCtaLabel: "",
              needHelpCtaLink: "",
            }
          }
          animationData={readinessResult2?.animationData}
          animationState={handleShowContent}
        />

        {showContent && (
          <>
            {/* <Tabs className="react-tabs adc-results-tabs" tabs={data.tabs} /> */}
            <Suspense fallback={<TabsFallback />}>
              <Tabs
                className="react-tabs adc-results-tabs"
                tabs={tabs}
                id="1"
              />
            </Suspense>

            <section className="nextSteps">
              <div className="contentWrapper imgTextSection">
                <header className="group row cols-2 center-aligned intro-text">
                  <div className="column">
                    <h2
                      dangerouslySetInnerHTML={{
                        __html: readinessResult2?.nextSteps.title ?? "",
                      }}
                    />
                    <div
                      dangerouslySetInnerHTML={{
                        __html: readinessResult2?.nextSteps.introContent ?? "",
                      }}
                    />
                    <Button
                      appearance="primary"
                      className="button btn-primary"
                      href={readinessResult2?.nextSteps?.buttonLink ?? ""}
                      label={readinessResult2?.nextSteps?.buttonText ?? ""}
                    />
                  </div>
                  <figure className="column highlighted-img">
                    <Image
                      src="/images/what-are-your-next-steps.jpg"
                      alt="Next Steps Image"
                      width={480}
                      height={480}
                    />
                  </figure>
                </header>
                <div className="steps group row cols-2">
                  <figure className="column highlighted-img">
                    <Image
                      src="/images/your-plan-includes.jpg"
                      alt="Next Steps Image"
                      width={480}
                      height={480}
                    />
                  </figure>
                  <div className="column featuredCard">
                    <h3>{readinessResult2?.nextSteps.steps.title}</h3>
                    <ul>
                      {readinessResult2?.nextSteps?.steps?.list.map(
                        (step, index) => (
                          <li
                            key={index}
                            className="step"
                            dangerouslySetInnerHTML={{
                              __html: step.step.content || "",
                            }}
                          />
                        )
                      )}
                    </ul>
                    <Button
                      appearance="primary"
                      className="button btn-primary"
                      href={
                        readinessResult2?.nextSteps?.steps?.buttonLink ?? ""
                      }
                      label={
                        readinessResult2?.nextSteps?.steps?.buttonText ?? ""
                      }
                    />
                  </div>
                </div>
              </div>
            </section>

            <div
              id="explore-your-school-matches"
              className="carouselWithForm"
              ref={carouselRef}
            >
              {/* <CarouselWithForm formId="14" collectData={false} /> */}
            </div>

            <HighlightedCtaSection />
          </>
        )}
      </div>
      {/* <StickyCta trackedElement={carouselRef} /> */}
    </>
  );
}
