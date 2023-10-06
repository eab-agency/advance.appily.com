"use client";
import { useUser } from "@/context/context";
// import Score from '@/components/Score';
import { useLocalStorage } from "@/hooks/useLocalStorage";
import styles from "@/styles/components/Quiz.module.scss";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Question from "./Question";
import ResetQuizButton from "./ResetQuizButton";
import Results from "./Results";
// import Score from "./Score";

export function Quiz({ vertical, quizData }) {
	const { location } = useUser();

	const router = useRouter();
	const { questions, score: initialScore } = quizData;

	const [quizState, setQuizState] = useLocalStorage("quizState", {
		currentQuestionIdx: 0,
		selectedAnswers: [],
		personalityScores: initialScore,
		highestScorePersonality: null,
	});

	const { currentQuestionIdx, selectedAnswers, personalityScores } = quizState;
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

		// calculate personality score based on selected answer
		const { personality } = answer;
		// Only update score if the answer's personality is not 'initial'
		const answerWeight =
			personality !== "initial"
				? personalityScores[personality]
					? personalityScores[personality] + answer.weight
					: answer.weight
				: 0;

		// find highest score personality from updated score object
		const updatedScores = {
			...personalityScores,
			[personality]: answerWeight,
		};

		const highestScorePersonality = Object.keys(updatedScores).reduce(
			(a, b) => {
				if (updatedScores[a] === updatedScores[b]) {
					return a; // If scores are tied, return the existing highest score personality
				}
				return updatedScores[a] > updatedScores[b] ? a : b;
			},
			Object.keys(updatedScores)[0],
		);

		setQuizState({
			...quizState,
			currentQuestionIdx: currentQuestionIdx + 1,
			selectedAnswers: updatedAnswers,
			personalityScores: updatedScores,
			highestScorePersonality,
		});

		if (currentQuestionIdx === questions.length - 1) {
			setQuizFinished(true);
		}
	};

	const handleRetakeQuiz = () => {
		setQuizState({
			currentQuestionIdx: 0,
			selectedAnswers: [],
			personalityScores: initialScore,
			highestScorePersonality: null,
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
						{/* <Score
							score={personalityScores}
							winningPersonality={quizState.highestScorePersonality}
						/> */}
						<header className={styles.quizContentHead}>
							<span className="intro-title">
								Define Your Future in Health Care
							</span>
							<div className={styles["questions-counter"]}>
								Question {quizState.currentQuestionIdx + 1} of{" "}
								{questions?.length}
							</div>
						</header>
						<div className="questions-container">
							<Question
								handleAnswer={handleAnswer}
								question={questions[currentQuestionIdx]}
							/>
						</div>
					</div>
				</div>
			) : (
				<>
					{/* { only show Results if !location.notUS} */}
					{location &&
						(location.notUS === false ||
							location.notUS === null ||
							location.notUS === undefined) && (
							<Results vertical={vertical} answers={quizState}>
								<ResetQuizButton
									handleRetakeQuiz={handleRetakeQuiz}
									vertical={vertical}
								/>
							</Results>
						)}
				</>
			)}
		</>
	);
}
