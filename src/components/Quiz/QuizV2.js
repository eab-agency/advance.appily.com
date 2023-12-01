"use client";
import { useUser } from "@/context/context";
import resultsData from "@/data/AdcResults/results-not-ready.json";
import styles from "@/styles/components/Quiz.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Question from "./Question";
import ResetQuizButton from "./ResetQuizButton";
import Results from "./ResultsQuiz2";
import Score from "./Score";

export function QuizV2({ vertical, quizData, resultsFormId, title }) {
	const { location, globalPrivacyControl } = useUser();
	const { questions, score: initialScore } = quizData;
	const [randomizedQuestions, setRandomizedQuestions] = useState([]);
	const router = useRouter();

	useEffect(() => {
		const randomized = quizData.questions.map(question => {
			const answersWithOriginalIndex = question.answers.map(
				(answer, index) => ({
					...answer,
					originalIndex: index,
				}),
			);

			let finalAnswers;
			if (question.randomize === false) {
				finalAnswers = answersWithOriginalIndex;
			} else {
				finalAnswers = answersWithOriginalIndex.sort(() => Math.random() - 0.5);
			}

			return { ...question, answers: finalAnswers };
		});

		setRandomizedQuestions(randomized);
	}, []);

	const [quizState, setQuizState] = useState({
		currentQuestionIdx: 0,
		selectedAnswers: [],
		score: initialScore,
		resultParameters: "",
	});
	// console.log("🚀 ~ file: QuizV2.js:28 ~ QuizV2 ~ quizState:", quizState);

	const { currentQuestionIdx, selectedAnswers, score } = quizState;
	const [quizFinished, setQuizFinished] = useState(
		currentQuestionIdx === questions.length - 1,
	);

	useEffect(() => {
		// Save the entire quiz state to local storage whenever it changes
		setQuizState(quizState);
	}, [quizState]);

	const handleAnswer = (question, answer, associatedField) => {
		const updatedAnswers = [
			...selectedAnswers,
			{
				question,
				answer: answer.value || answer.answer,
				associatedField,
			},
		];

		// Only update score if the answer's personality is not 'initial'
		const answerWeight = score + answer.weight;
		const newParam = `q${currentQuestionIdx + 1}=${answer.originalIndex}`;

		setQuizState(prevState => ({
			...prevState,
			currentQuestionIdx: currentQuestionIdx + 1,
			selectedAnswers: updatedAnswers,
			score: answerWeight,
			resultParameters: prevState.resultParameters
				? `${prevState.resultParameters}&${newParam}`
				: `?${newParam}`,
		}));

		if (currentQuestionIdx === questions.length - 1) {
			setQuizFinished(true);
			if (location.notUS || globalPrivacyControl) {
				router.push(
					`/degree-completion/results${resultParameters}&score=${score}}`,
				);
			}
		}
	};

	const handleRetakeQuiz = () => {
		setQuizState({
			currentQuestionIdx: 0,
			selectedAnswers: [],
			score: initialScore,
			isFinished: false,
			resultParameters: "",
		});
		setQuizFinished(false);
	};

	return (
		<>
			{!quizFinished ? (
				<div className={styles.containerQuiz}>
					<div className={styles.content}>
						{/* NOTE: This score components will only show in dev mode */}
						<Score
							score={score}
							winningPersonality={quizState.highestScorePersonality}
						/>
						<header className={styles.quizContentHead}>
							{/* <span className="intro-title">{title || "Take the Quiz"}</span> */}
							<div className={styles.questionsCounter}>
								Question {quizState.currentQuestionIdx + 1} of{" "}
								{questions?.length}
							</div>
						</header>
						<div className="questions-container">
							<Question
								handleAnswer={handleAnswer}
								question={randomizedQuestions[currentQuestionIdx]}
							/>
						</div>
					</div>
				</div>
			) : (
				<div className={styles.containerResults}>
					<div className={styles.content}>
						{/* Check if either location.notUS or globalPrivacyControl is true */}
						{location && (location.notUS || globalPrivacyControl) ? (
							<>
								{/* <h1>oops, your browser is set to skip the quiz form</h1> */}
								{router.push(
									`/degree-completion/results${quizState.resultParameters}&score=${score}}`,
								)}
							</>
						) : (
							<>
								{/* Show the Results component */}
								<Results
									vertical={vertical}
									answers={quizState}
									score={score}
									formId={resultsFormId}
									redirectUrl={`/degree-completion/results${quizState.resultParameters}&score=${score}}`}
								>
									<ResetQuizButton
										handleRetakeQuiz={handleRetakeQuiz}
										vertical={vertical}
									/>
								</Results>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
}
