import { useRequest } from "@/hooks/useRequest";
import styles from "@/styles/global/layouts/Question.module.scss";
/* eslint-disable react/no-danger */
import React, { useEffect, useState } from "react";
import useSWR from "swr";

function Question({ questionNum, handleAnswer, vertical }) {
	// const { data, error } = useRequest('/quiz/question', questionNum);
	const { data, error, isLoading } = useSWR(
		`/api/quiz/question/${questionNum}?vertical=${vertical}`,
	);
	const [shuffledAnswers, setShuffledAnswers] = useState([]);

	// use useEffect to shuffle answers
	useEffect(() => {
		// shuffle answers
		const shuffledAnswersTemp = data ? [...data.answers] : [];
		shuffledAnswersTemp.sort(() => Math.random() - 0.5);
		setShuffledAnswers(shuffledAnswersTemp);
	}, [data]);

	const handleClick = (q, answer, assocField) => {
		handleAnswer(q, answer, assocField);
	};

	// Handle the error state
	if (error) return <div>Failed to load</div>;
	// Handle the loading state
	if (!data) return <div className="loading">Loading...</div>;

	const questionNumeral = questionNum === 7 ? "last-question" : "";

	return (
		<>
			<h2
				className="question-copy"
				dangerouslySetInnerHTML={{ __html: data.question }}
			/>
			<ul className={`${styles.questions} ${styles[questionNumeral]}`}>
				{shuffledAnswers.map((answer, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<li key={index}>
						<button
							className="answer-button"
							type="button"
							onClick={() =>
								handleClick(data.question, answer, data.associatedField)
							}
						>
							{answer.answer}
						</button>
					</li>
				))}
			</ul>
		</>
	);
}

export default Question;
