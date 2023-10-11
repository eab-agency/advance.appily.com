import { Quiz } from "@/components";
import { fetchQuizData } from "@/lib/fetchQuizData";

const VERTICAL = "business";

import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Business Quiz",
	description: "Appily Business Quiz",
};

async function QuizHome() {
	const quizData = await fetchQuizData(VERTICAL);

	return quizData && <Quiz vertical={VERTICAL} quizData={quizData} />;
}
export default QuizHome;
