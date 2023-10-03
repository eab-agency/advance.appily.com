import { Quiz } from "@/components";
import Head from "next/head";

const API_URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/quiz/questions`;
const VERTICAL = "healthcare";

const fetchQuiz = async vertical => {
	const res = await fetch(`${API_URL}?vertical=${vertical}`);
	const data = await res.json();
	return data;
};

async function HealthCareQuizHome() {
	const quizData = await fetchQuiz(VERTICAL);

	return (
		<>
			<Head>
				<title>Health Science Quiz</title>
				<meta name="description" content="Appily Health Science Quiz" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.png" />
			</Head>
			{quizData && <Quiz vertical={VERTICAL} quizData={quizData} />}
		</>
	);
}
export default HealthCareQuizHome;
