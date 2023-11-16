import Form from "@/components/Form";
import Link from "next/link";

import isDevMode from "@/helpers/isDevMode";
import styles from '@/styles/components/Results.module.scss';
import { Button } from "../Button";

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

  return (
    <>
      {/* <div className="preResultsContainer"> */}
      <section className="resultsHero">
        <div className="group">
          <div className="heroContent column">
            <h1>Your score is: {score}</h1>
            {score >= 41 && score <= 50 && (
              <p>
                41-50
                {/* Insert copy for scores between 41-50 here */}
              </p>
            )}
            {score >= 31 && score <= 40 && (
              <p>
                31-40
                {/* Insert copy for scores between 31-40 here */}
              </p>
            )}
            {score >= 21 && score <= 30 && (
              <p>
                21-30
                {/* Insert copy for scores between 21-30 here */}
              </p>
            )}
            {score >= 11 && score <= 20 && (
              <p>
                11-20
                {/* Insert copy for scores between 21-30 here */}
              </p>
            )}
            {score >= 0 && score <= 10 && (
              <p>
                0-10
                {/* Insert copy for scores between 21-30 here */}
              </p>
            )}
          </div>
        </div>
      </section>
      {/* </div> */}
      <Button
        type="button"
        href={`/adc/results${answers.resultParameters}`}
        label="Get a personalized plan"
        className="button btn-primary"
      />


      {/* <div className="engageForm">
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
                href={`/careers/${vertical}/${answers.highestScorePersonality}`}
              >
                Skip form (only shows in dev mode)
              </Link>
            )}
          </div>
          {children}
        </div>
      </div> */}
    </>
  );
};

export default Results;
