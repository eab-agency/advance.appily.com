import { Quiz } from "@/components";
import { fetchQuizData } from "@/lib/fetchQuizData";

import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

const title = "Define Your Future in Health Care";
const description = "Start the Appily Health Care Quiz Now";

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
			/>
		)
	);
}
export default QuizHome;
