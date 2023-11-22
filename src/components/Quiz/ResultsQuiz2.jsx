import Form from "@/components/Form";
import Link from "next/link";

import isDevMode from "@/helpers/isDevMode";
import styles from '@/styles/components/Results.module.scss';
import { Button } from "../Button";

import almostReady from "@/assets/lotties/almost-ready-dark-mode.json";
import notReady from "@/assets/lotties/dark-not-ready-dark-mode.json";
import extremelyReady from "@/assets/lotties/extremely-ready-dark-mode.json";
import ready from "@/assets/lotties/ready-dark-mode.json";
import veryReady from "@/assets/lotties/very-ready-dark-mode.json";

import AdcResultsHero from "@/components/Heros/AdcResultsHero";
import readynessResults from "@/data/AdcResults/adc-readyness-results.json";

const Results = ({ children, vertical, answers, formId, score = 0 }) => {
  console.log("🚀 ~ file: ResultsQuiz2.jsx:9 ~ Results ~ answers:", answers)
  const formSubmitAnswers = {
    answers: answers.selectedAnswers,
    highestScorePersonality: answers.highestScorePersonality,
  };
  const devModeOnly = isDevMode();

  if (answers.selectedAnswers.some(answerObj => answerObj.answer === "Some High School")) {
    return (
      <>
        <h2>you're too young. go away! 🤣</h2>
      </>
    )
  }

  // if score is between 41 and 50 set resultsPage to extremelyReady
  const resultsPage = score >=41 && score <= 50 ? "extremely-ready" : score >=31 && score <= 40 ? "very-ready" : score >=21 && score <= 30 ? "ready" : score >=11 && score <= 20 ? "almost-ready" : score >=0 && score <= 10 ? "not-eady" : "not-ready";

  const verticalName = vertical ==="adc" ? "adult-degree-completion" : "graduate-degrees";

  return (
    <>
        <div className="preResultsContainer adcResult">
      {score >=41 && score <= 50 && (
        <AdcResultsHero
        data={readynessResults.extremelyReady}
        animationData={extremelyReady}
        />
        )}
      {score >=31 && score <= 40 && (
        <AdcResultsHero
        data={readynessResults.veryReady}
        animationData={veryReady}
        />
        )}
      {score >=21 && score <= 30 && (
        <AdcResultsHero
        data={readynessResults.ready}
        animationData={ready}
        />
        )}
      {score >=11 && score <= 20 && (
        <AdcResultsHero
          data={readynessResults.almostReady}
          animationData={almostReady}
          />
          )}
      {score >=0 && score <= 10 && (
        <AdcResultsHero
        data={readynessResults.notReady}
        animationData={notReady}
        />
        )}
      </div>
      {/* <Button
        type="button"
        href={`/adc/results${answers.resultParameters}`}
        label="Get a personalized plan"
        className="button btn-primary"
      /> */}


      <div className="engageForm">
        <div className="formWrapper">

          <div className="leadForm">
            <h2>Where should we send your results?</h2>
            <Form
              redirectTo={`/careers/${vertical}/${answers.highestScorePersonality}`}
              answers={formSubmitAnswers}
              user={null}
              id={formId || "2"}
              className={styles.formContainer}
            />
            {devModeOnly && (
              <Link
                href={`/careers/${verticalName}/${resultsPage}`}
              >
                Skip form (only shows in dev mode)
              </Link>
            )}
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Results;
