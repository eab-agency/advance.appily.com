import Form from "@/components/Form";
import Link from "next/link";

import isDevMode from "@/helpers/isDevMode";
import styles from '@/styles/components/Results.module.scss';

import almostReady from "@/assets/lotties/almost-ready-dark-mode.json";
import notReady from "@/assets/lotties/dark-not-ready-dark-mode.json";
import extremelyReady from "@/assets/lotties/extremely-ready-dark-mode.json";
import ready from "@/assets/lotties/ready-dark-mode.json";
import veryReady from "@/assets/lotties/very-ready-dark-mode.json";

import AdcResultsHero from "@/components/Heros/ReadynessResultsHero";

const getAnimationData = async (score) => {
  if (score >= 41 && score <= 50) {
    const data = await import("@/assets/lotties/extremely-ready-dark-mode.json");
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
}

const Results = ({ children, vertical, answers, formId, score = 0 }) => {
  console.log("🚀 ~ file: ResultsQuiz2.jsx:9 ~ Results ~ answers:", answers)
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    const loadAnimationData = async () => {
      const data = await getAnimationData(score);
      setAnimationData(data);
    }

    loadAnimationData();
  }, [score]);
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
  const resultsPage = score >= 41 && score <= 50 ? "extremely-ready" : score >= 31 && score <= 40 ? "very-ready" : score >= 21 && score <= 30 ? "ready" : score >= 11 && score <= 20 ? "almost-ready" : score >= 0 && score <= 10 ? "not-eady" : "not-ready";

  const verticalName = vertical === "adc" ? "adult-degree-completion" : "graduate-degrees";

  const getReadinessResult = score => {
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
      <div className="preResultsContainer adcResult">
        <AdcResultsHero
          data={readinessResult2?.data}
          animationData={readinessResult2?.animationData}
          animationState={handleShowContent}
        />
      </div>


      <div className="engageForm">
        <div className="formWrapper">

          <div className="leadForm">
            <h2>Where should we send your results?</h2>
            <Form
              redirectTo={`/${verticalName}/results${answers.resultParameters}&score=${score}`}
              answers={formSubmitAnswers}
              user={null}
              id={formId || "2"}
              className={styles.formContainer}
            />
            {devModeOnly && (
              <Link
                href={`/${verticalName}/results${answers.resultParameters}&score=${score}`}
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
