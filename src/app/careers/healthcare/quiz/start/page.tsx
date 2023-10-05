import { Quiz } from "@/components";
import { fetchQuizData } from "@/lib/fetchQuizData";
import Head from "next/head";

const VERTICAL = "healthcare";

async function HealthCareQuizHome() {
	const quizData = await fetchQuizData(VERTICAL);

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
