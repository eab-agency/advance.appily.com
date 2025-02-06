import { Quiz } from "@/components";
import { fetchQuizData } from "@/lib/fetchQuizData";

import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

const title = "Build Your Back-to-School Plan";
const description = "Answer these questions and we'll help you build a plan to go back to school.";

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

const VERTICAL = "plan";
async function QuizHome() {
  const quizData = await fetchQuizData(VERTICAL);

  return (
    quizData && (
      <Quiz
        vertical={VERTICAL}
        quizData={quizData}
        resultsFormId="13"
        title={title}
        randomizeAnswers={false}
      />
    )
  );
}
export default QuizHome;
