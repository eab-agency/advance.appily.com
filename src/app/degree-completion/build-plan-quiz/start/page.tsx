import { Quiz } from "@/components";
import { fetchQuizData } from "@/lib/fetchQuizData";

import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

const title = "Build your plan";
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