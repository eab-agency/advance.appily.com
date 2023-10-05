"use client";
import { useUser } from "@/context/context";
// import Score from '@/components/Score';
import { useLocalStorage } from "@/hooks/useLocalStorage";
import styles from "@/styles/components/Quiz.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import useSWR from "swr";
import Question from "./Question";
import ResetQuizButton from "./ResetQuizButton";
import Results from "./Results";
import Score from "./Score";

export function Quiz({ vertical: verticalProp, quizData }) {
	const { location, vertical, setVertical } = useUser();
	setVertical(verticalProp);

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
	};

	// if highestScorePersonality is changes, then set the personalityData
	// useEffect(() => {
	//     if (results) {
	//         const personalityDataInternal = results.find(
	//             (result) =>
	//                 result.title.toLowerCase() ===
	//                 localQData.highestScorePersonality
	//         );
	//         setPersonalityData(personalityDataInternal);
	//     }
	// }, [localQData.highestScorePersonality, results]);

	useEffect(() => {
		// console.log('localQData updated', localQData);
		// if localQData.currentQuesion is greater than localQData.questionLength, then set isFinished to true
		if (localQData.currentQuestion > localQData.questionLength) {
			setLocalQData({ ...localQData, isFinished: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [localQData.currentQuestion, localQData.questionLength]);

	if (questionError) return <p>Error loading questions.</p>;
	if (!questions) return <p className="loading">Loading...</p>;

	// if we are at the end of the quiz, show the results page and pass the score and personality
	if (localQData.isFinished) {
		// setLocalQData({ ...localQData, isFinished: true });
		// if location.notUS === true, then redirect to results
		if (location.notUS === true) {
			router.push(`${localQData.highestScorePersonality}`);
		}
		const finalResults = {
			answers: localQData.answers,
			highestScorePersonality: localQData.highestScorePersonality,
			areaOfInterest: localQData.answers[7].answer,
		};
		return (
			<div className={styles.containerResults}>
				<div className={styles.content}>
					{/* { only show Results if !location.notUS} */}
					{(location.notUS === false ||
						location.notUS === null ||
						location.notUS === undefined) && (
						<Results
							personality={localQData.highestScorePersonality}
							description={personalityData.description}
							title={personalityData.title}
							answers={finalResults}
						>
							<ResetQuizButton />
						</Results>
					)}
				</div>
			</div>
		);
	}
	if (localQData.currentQuestion === 0) {
		return (
			<section className="quiz-wrapper questions-wrapper">
				<div className="quiz-content">
					<span className="intro-title">Before we get started ...</span>
					<div className="questions-container">
						{questions && (
							<Question
								questionNum={localQData.currentQuestion}
								handleAnswer={handleAnswer}
								vertical={vertical}
							/>
						)}
					</div>
				</div>
				{/* <figure className={styles["deco-image"]}>
					<Image
						src="/images/cappex-education-journey.jpg"
						alt="Define Your Future in Health Care"
						width={500}
						height={600}
					/>
				</figure> */}
			</section>
		);
	}

	return (
		<>
			{!quizFinished ? (
				<div className={styles["container-quiz"]}>
					<div className={styles.content}>
						{/* NOTE: This score components will only show in dev mode */}
						{/* <Score
							score={personalityScores}
							winningPersonality={quizState.highestScorePersonality}
						/> */}
						<span className="intro-title">
							Define Your Future in Health Care
						</span>
						<div className={styles["questions-counter"]}>
							Question {quizState.currentQuestionIdx + 1} of {questions?.length}
						</div>
						<div className="questions-container">
							<Question
								handleAnswer={handleAnswer}
								question={questions[currentQuestionIdx]}
								// lastQuestion={
								// 	localQData.currentQuestion === questions.length - 1
								// }
							/>
						</div>
					</div>
				</div>
			) : (
				<div className={styles.containerResults}>
					<div className={styles.content}>
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
					</div>
				</div>
			)}
		</>
	);
}
