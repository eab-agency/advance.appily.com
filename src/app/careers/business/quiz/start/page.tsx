import { Quiz } from "@/components";
import { fetchQuizData } from "@/lib/fetchQuizData";
import { mergeOpenGraph } from "@/seo/mergeOpenGraph";

const VERTICAL = "business";

import { Metadata } from "next";

export const metadata: Metadata = {
	openGraph: mergeOpenGraph({
		title: "Business Quiz",
		description: "Appily Business Quiz",
	}),
	title: "Business Quiz",
	description: "Appily Business Quiz",
};

async function QuizHome() {
	const quizData = await fetchQuizData(VERTICAL);

	return (
		quizData && (
			<Quiz
				vertical={VERTICAL}
				quizData={quizData}
				resultsFormId="6"
				title="Forge Your Path in Business"
			/>
		)
	);
}
export default QuizHome;
