"use client";
import { useUser } from "@/context/context";
import styles from "@/styles/components/Quiz.module.scss";
import { useEffect, useState } from "react";
import Question from "./Question";
import ResetQuizButton from "./ResetQuizButton";
import Results from "./ResultsQuiz2";
import Score from "./Score";

export function QuizV2({ vertical, quizData, resultsFormId, title }) {
	const { location, globalPrivacyControl } = useUser();
	const { questions, score: initialScore } = quizData;
	const randomizedQuestions = quizData.questions.map(question => {
		if (question.associatedField.startsWith("quizresponse")) {
			const randomizedAnswers = question.answers.sort(
				() => Math.random() - 0.5,
			);
			return { ...question, answers: randomizedAnswers };
		}
		return question;
	});
	const [quizState, setQuizState] = useState({
		currentQuestionIdx: 0,
		selectedAnswers: [],
		score: initialScore,
	});

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

		setQuizState({
			...quizState,
			currentQuestionIdx: currentQuestionIdx + 1,
			selectedAnswers: updatedAnswers,
			score: answerWeight,
		});

		if (currentQuestionIdx === questions.length - 1) {
			setQuizFinished(true);
			if (location.notUS || globalPrivacyControl) {
				router.push(`/careers/${vertical}/${highestScorePersonality}`);
			}
		}
	};

	const handleRetakeQuiz = () => {
		setQuizState({
			currentQuestionIdx: 0,
			selectedAnswers: [],
			score: initialScore,
			isFinished: false,
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
							<span className="intro-title">{title || "Take the Quiz"}</span>
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
								<h1>oops, your browser is set to skip the quiz</h1>
								{/* {router.push(
									`/careers/${vertical}/${quizState.highestScorePersonality}`,
								)} */}
							</>
						) : (
							<>
								{/* Show the Results component */}
								<Results
									vertical={vertical}
									answers={quizState}
									score={score}
									formId={resultsFormId}
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
