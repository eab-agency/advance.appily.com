import { Tabs } from "@/components";
import quizData from "@/data/quiz-adc.json";

export default function ADCResultsPage({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}) {
	const selectedQuizResponse1 = Number(searchParams.q1) || 0;
	const selectedQuizResponse2 = Number(searchParams.q2) || 0;
	const selectedQuizResponse3 = Number(searchParams.q3) || 0;
	const selectedQuizResponse4 = Number(searchParams.q4) || 0;
	const selectedQuizResponse5 = Number(searchParams.q5) || 0;
	const selectedQuizResponse6 = Number(searchParams.q6) || 0;
	const selectedQuizResponse7 = Number(searchParams.q7) || 0;
	const selectedQuizResponse8 = Number(searchParams.q8) || 0;
	const selectedQuizResponse9 = Number(searchParams.q9) || 0;
	const selectedQuizResponse10 = Number(searchParams.q10) || 0;

	const tabs = quizData.questions.map((question, index) => {
		let content;
		switch (index) {
			case 0:
				content =
					`<p>${
						question.answers[selectedQuizResponse1]?.answer ??
						"Incorrect paramter used"
					}</p> ${question.answers[selectedQuizResponse1]?.dynamicContent}` ??
					"No content for question 1";
				break;
			case 1:
				content =
					`<p>${
						question.answers[selectedQuizResponse2]?.answer ??
						"Incorrect paramter used"
					}</p> ${question.answers[selectedQuizResponse2]?.dynamicContent}` ??
					"No content for question 2";
				break;
			case 2:
				content =
					`<p>${
						question.answers[selectedQuizResponse3]?.answer ??
						"Incorrect paramter used"
					}</p> ${question.answers[selectedQuizResponse3]?.dynamicContent}` ??
					"No content for question 3";
				break;
			case 3:
				content =
					`<p>${
						question.answers[selectedQuizResponse4]?.answer ??
						"Incorrect paramter used"
					}</p> ${question.answers[selectedQuizResponse4]?.dynamicContent}` ??
					"No content for question 4";
				break;
			case 4:
				content =
					`<p>${
						question.answers[selectedQuizResponse5]?.answer ??
						"Incorrect paramter used"
					}</p> ${question.answers[selectedQuizResponse5]?.dynamicContent}` ??
					"No content for question 5";
				break;
			case 5:
				content =
					`<p>${
						question.answers[selectedQuizResponse6]?.answer ??
						"Incorrect paramter used"
					}</p> ${question.answers[selectedQuizResponse6]?.dynamicContent}` ??
					"No content for question 6";
				break;
			case 6:
				content =
					`<p>${
						question.answers[selectedQuizResponse7]?.answer ??
						"Incorrect paramter used"
					}</p> ${question.answers[selectedQuizResponse7]?.dynamicContent}` ??
					"No content for question 7";
				break;
			case 7:
				content =
					`<p>${
						question.answers[selectedQuizResponse8]?.answer ??
						"Incorrect paramter used"
					}</p> ${question.answers[selectedQuizResponse8]?.dynamicContent}` ??
					"No content for question 8";
				break;
			case 8:
				content =
					`<p>${
						question.answers[selectedQuizResponse9]?.answer ??
						"Incorrect paramter used"
					}</p> ${question.answers[selectedQuizResponse9]?.dynamicContent}` ??
					"No content for question 9";
				break;
			case 9:
				content =
					`<p>${
						question.answers[selectedQuizResponse10]?.answer ??
						"Incorrect paramter used"
					}</p> ${question.answers[selectedQuizResponse10]?.dynamicContent}` ??
					"No content for question 10";
				break;
			default:
				content = "Default null content";
		}
		return { ...question, content };
	});

	return (
		<>
			<Tabs className="react-tabs" tabs={tabs} />
		</>
	);
}
