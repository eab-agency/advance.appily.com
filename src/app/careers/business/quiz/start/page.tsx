import { Quiz } from "@/components";
import Head from "next/head";

const VERTICAL = "business";
const API_URL = `${process.env.NEXT_PUBLIC_APP_URL}`;

const fetchQuiz = async vertical => {
	const res = await fetch(
		API_URL + `/api/quiz/questions?vertical=${vertical}`,
		{
			method: "GET",
		},
	);
	const data = await res.json();
	return data;
};

async function QuizHome() {
	const quizData = await fetchQuiz(VERTICAL);

	return (
		<>
			<Head>
				<title>Health Science Quiz</title>
				<meta name="description" content="Appily Health Science Quiz" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.png" />
			</Head>
			<Quiz vertical={VERTICAL} quizData={quizData} />
		</>
	);
}
export default QuizHome;
