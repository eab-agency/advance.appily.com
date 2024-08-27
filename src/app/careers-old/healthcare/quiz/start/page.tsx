import { Quiz } from "@/components";
import { fetchQuizData } from "@/lib/fetchQuizData";

import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

const title = "Health Care Career Quiz";
const description = "This quiz, Define Your Future in Health Care, can help you learn which career and degree paths could be right for you.";

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

const VERTICAL = "healthcare";

async function QuizHome() {
  const quizData = await fetchQuizData(VERTICAL);
  return (
    quizData && (
      <Quiz
        vertical={VERTICAL}
        quizData={quizData}
        resultsFormId="2"
        title={title}
        randomizeAnswers={true}
      />
    )
  );
}
export default QuizHome;
