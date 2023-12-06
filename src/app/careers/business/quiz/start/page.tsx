import { Quiz } from "@/components";
import { fetchQuizData } from "@/lib/fetchQuizData";

import { mergeOpenGraph, mergeTwitter } from "@/seo";
import { Metadata } from "next";

const title = "Forge Your Path in Business";
const description = "Start the Appily Business Quiz Now";

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

const VERTICAL = "business";
async function QuizHome() {
	const quizData = await fetchQuizData(VERTICAL);

	return (
		quizData && (
			<Quiz
				vertical={VERTICAL}
				quizData={quizData}
				resultsFormId="6"
				title={title}
				randomizeAnswers={true}
			/>
		)
	);
}
export default QuizHome;
