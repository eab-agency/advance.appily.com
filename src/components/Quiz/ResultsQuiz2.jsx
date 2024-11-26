"use client";
import Link from "next/link";

import isDevMode from "@/helpers/isDevMode";

import AdcResultsHero from "@/components/Heros/ReadynessResultsHero";
import quizData from "@/data/quiz-adc-readiness.json";
import { useEffect, useState } from "react";

const getAnimationData = async (score) => {
  if (score >= 41 && score <= 50) {
    const data = await import(
      "@/assets/lotties/extremely-ready-dark-mode.json"
    );
    return data.default;
  } else if (score >= 31 && score <= 40) {
    const data = await import("@/assets/lotties/very-ready-dark-mode.json");
    return data.default;
  } else if (score >= 21 && score <= 30) {
    const data = await import("@/assets/lotties/ready-dark-mode.json");
    return data.default;
  } else if (score >= 11 && score <= 20) {
    const data = await import("@/assets/lotties/almost-ready-dark-mode.json");
    return data.default;
  } else if (score >= 0 && score <= 10) {
    const data = await import("@/assets/lotties/dark-not-ready-dark-mode.json");
    return data.default;
  }
};

const Results = ({
  children,
  vertical,
  answers,
  formId,
  score = 0,
  redirectUrl,
}) => {
  // console.log("🚀 ~ file: ResultsQuiz2.jsx:32 ~ Results ~ answers:", answers)
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    const loadAnimationData = async () => {
      const data = await getAnimationData(score);
      setAnimationData(data);
    };

    loadAnimationData();
  }, [score]);

  const devModeOnly = isDevMode();

  const getReadinessResult = (score) => {
    if (score >= 41 && score <= 50) {
      return {
        data: quizData.readinessResults.extremelyReady,
        animationData,
        nextSteps: quizData.nextSteps.extremelyReady,
        highestScorePersonality: "extremelyReady",
      };
    } else if (score >= 31 && score <= 40) {
      return {
        data: quizData.readinessResults.veryReady,
        animationData,
        nextSteps: quizData.nextSteps.veryReady,
        highestScorePersonality: "veryReady",
      };
    } else if (score >= 21 && score <= 30) {
      return {
        data: quizData.readinessResults.ready,
        animationData,
        nextSteps: quizData.nextSteps.ready,
        highestScorePersonality: "ready",
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

  const formSubmitAnswers = {
    answers: answers.selectedAnswers,
    highestScorePersonality: readinessResult2.highestScorePersonality,
  };

  return (
    <>
      <div className="preResultsContainer adcResult">
        <AdcResultsHero
          data={readinessResult2?.data}
          animationData={readinessResult2?.animationData}
        />
      </div>

      <div className="engageForm">
        <div className="formWrapper">
          <div className="leadForm">
            <h2>Where should we send your results?</h2>
            {/* <Form
              redirectTo={`/degree-completion/results${answers.resultParameters}&score=${score}`}
              answers={formSubmitAnswers}
              user={null}
              id={formId || "2"}
              className={styles.formContainer}
            /> */}
            {devModeOnly && (
              <>
                <Link
                  href={`/degree-completion/results${answers.resultParameters}&score=${score}`}
                >
                  Skip form (only shows in dev mode)
                </Link>
                <code>{JSON.stringify(formSubmitAnswers)}</code>
              </>
            )}
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Results;
