import { Quiz } from "@/components";
import { fetchQuizData } from "@/lib/fetchQuizData";
import { mergeOpenGraph } from "@/seo/mergeOpenGraph";
import { Metadata } from "next";

const VERTICAL = "healthcare";

export const metadata: Metadata = {
	title: "Health Science Quiz",
	description: "Appily Health Science Quiz",
	openGraph: mergeOpenGraph({ title: "Health Science Quiz" }),
};

async function QuizHome() {
	const quizData = await fetchQuizData(VERTICAL);
	return (
		quizData && (
			<Quiz
				vertical={VERTICAL}
				quizData={quizData}
				resultsFormId="2"
				title="Define Your Future in Health Care"
			/>
		)
	);
}
export default QuizHome;
