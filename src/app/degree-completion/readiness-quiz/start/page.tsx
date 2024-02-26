import { QuizV2 } from "@/components";
import { fetchQuizData } from "@/lib/fetchQuizData";

import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

const title = "";
const description = "Start the Appily ADC Quiz Now";

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

const VERTICAL = "adc-readiness";
async function QuizHome() {
  const quizData = await fetchQuizData(VERTICAL);

  return (
    quizData && (
      <QuizV2
        vertical={VERTICAL}
        quizData={quizData}
        resultsFormId="12"
        title={title}
        randomizeAnswers={false}
      />
    )
  );
}
export default QuizHome;
