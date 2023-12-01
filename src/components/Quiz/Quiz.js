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
import Score from "./Score";

const getRedirectUrl = (vertical, highestScorePersonality) => {
	if (vertical === "plan") {
		return `/adult-degree-completion/${vertical}/${highestScorePersonality}`;
	} else if (vertical === "specificVertical2") {
		return `/specificPath2/${highestScorePersonality}`;
	} else {
		return `/careers/${vertical}/${highestScorePersonality}`;
	}
};

export function Quiz({ vertical, quizData, resultsFormId, title }) {
	const { location, globalPrivacyControl } = useUser();

	const router = useRouter();
	const { questions, score: initialScore } = quizData;

	const randomizedQuestions = quizData.questions.map(question => {
		if (
			question.randomize === false ||
			!question.associatedField.startsWith("quizresponse")
		) {
			return question;
		}

		const randomizedAnswers = question.answers.sort(() => Math.random() - 0.5);
		return { ...question, answers: randomizedAnswers };
	});

	const [quizState, setQuizState] = useState({
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

		if (associatedField === "age_range" && answer.value === 1) {
			router.push("/redirect/appily-redirect");
			return;
		}

		if (
			associatedField === "education_journey__select1" &&
			answer.value !== "2" &&
			answer.value !== "3" &&
			answer.redirectTo
		) {
			router.push(answer.redirectTo);
			return;
		}

		setQuizState({
			...quizState,
			currentQuestionIdx: currentQuestionIdx + 1,
			selectedAnswers: updatedAnswers,
			personalityScores: updatedScores,
			highestScorePersonality,
		});

		if (currentQuestionIdx === questions.length - 1) {
			setQuizFinished(true);
			if (location.notUS || globalPrivacyControl) {
				const redirectUrl = getRedirectUrl(vertical, highestScorePersonality);
				router.push(redirectUrl);
				// router.push(`/careers/${vertical}/${highestScorePersonality}`);
			}
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
	const redirectUrl = getRedirectUrl(
		vertical,
		quizState.highestScorePersonality,
	);

	return (
		<>
			{!quizFinished ? (
				<div className={styles.containerQuiz}>
					<div className={styles.content}>
						{/* NOTE: This score components will only show in dev mode */}
						<Score
							score={personalityScores}
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
							<>{router.push(redirectUrl)}</>
						) : (
							<>
								{/* Show the Results component */}
								<Results
									vertical={vertical}
									answers={quizState}
									formId={resultsFormId}
									redirectUrl={redirectUrl}
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
