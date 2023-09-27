import { Quiz } from "@/components";
import Head from "next/head";

function HealthCareQuizHome() {
	return (
		<>
			<Head>
				<title>Health Science Quiz</title>
				<meta name="description" content="Appily Health Science Quiz" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.png" />
			</Head>
			<Quiz vertical="healthcare" />
		</>
	);
}
export default HealthCareQuizHome;
