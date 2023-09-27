"use client";
import { useUser } from "@/context/context";
// import Score from '@/components/Score';
import { useLocalStorage } from "@/hooks/useLocalStorage";
import styles from "@/styles/global/layouts/Quiz.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Question from "./Question";
import ResetQuizButton from "./ResetQuizButton";
import Results from "./Results";
import Score from "./Score";

export function Quiz({ vertical }) {
	// const { data: results, error: resultError } = useRequest('/quiz/results');
	const {
		data: questions,
		error: questionError,
		isLoading,
	} = useSWR(`/api/quiz/questions?vertical=${vertical}`);

	// const { data: questions, error: questionError } = useRequest(
	// 	"/quiz/questions",
	// 	vertical,
	// );
	// console.log('🚀 ~ file: Quiz.js:16 ~ Quiz ~ questions:', questions.length);
	const router = useRouter();

	const { location } = useUser();

	const [scopedQuestions, setScopedQuestions] = useState(null);

	const [personalityData, setPersonalityData] = useState("executive");

	const [localQData, setLocalQData] = useLocalStorage("eab-quiz-data", {
		answers: [],
		currentQuestion: 0,
		isFinished: false,
		questionLength: 0,
		highestScorePersonality: null,
		utmSource: "",
	});

	const handleAnswer = (question, answer, associatedField) => {
		// calculate personality score based on selected answer
		const { personality } = answer;
		// Only update score if the answer's personality is not 'initial'
		const answerWeight =
			personality !== "initial"
				? localQData.score[personality]
					? localQData.score[personality] + answer.weight
					: answer.weight
				: 0;

		// find highest score personality from updated score object
		const updatedScore = {
			...localQData.score,
			[personality]: answerWeight,
		};
		let highestScorePersonality = Object.keys(updatedScore)
			.filter(key => key !== "initial") // Filter out the 'initial' personality
			.reduce((a, b) => {
				if (updatedScore[a] === updatedScore[b]) {
					return a; // If scores are tied, return the existing highest score personality
				}
				return updatedScore[a] > updatedScore[b] ? a : b;
			}, Object.keys(updatedScore)[0]); // Set the initial value to the first key in case all scores are 0

		if (updatedScore[highestScorePersonality] === 0) {
			highestScorePersonality = ""; // If all scores are 0, return an empty string as the highest score personality
		}
		const isFinished = localQData.currentQuestion === questions.length - 1;
		// if currentQuestion is equal to the question.length, then set finished to true

		setLocalQData({
			...localQData,
			answers: [
				...localQData.answers,
				{ question, answer: answer.answer, associatedField },
			],
			score: updatedScore,
			currentQuestion: localQData.currentQuestion + 1,
			questionLength: questions.length - 1,
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
			<div className={styles.container}>
				<div className={styles.content}>
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
				<figure className={styles["deco-image"]}>
					<Image
						src="/images/cappex-education-journey.jpg"
						alt="Define Your Future in Health Care"
						width={500}
						height={600}
					/>
				</figure>
			</div>
		);
	}

	return (
		<div className={styles["container-quiz"]}>
			<div className={styles.content}>
				{/* NOTE: This score components was just for testing purposes?? */}
				{/* <Score
                    score={localQData.score}
                    winningPersonality={localQData.highestScorePersonality}
                /> */}
				<span className="intro-title">Define Your Future in Health Care</span>
				<div className={styles["questions-counter"]}>
					Question {localQData.currentQuestion + 1} of {questions?.length}
				</div>
				<div className="questions-container">
					<Question
						handleAnswer={handleAnswer}
						questionNum={localQData.currentQuestion}
						vertical={vertical}
					/>
				</div>
			</div>
		</div>
	);
}
