/* eslint-disable react/no-danger */
import React, { useState, useEffect } from 'react';
import styles from '@/styles/global/layouts/Question.module.scss';
import { useRequest } from '@/hooks/useRequest';

function Question({ questionNum, handleAnswer }) {
    const { data, error } = useRequest('/quiz/question', questionNum);

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

    const questionNumeral = questionNum === 7 ? 'last-question' : '';

    return (
        <>
            <h2
                className="question-copy"
                dangerouslySetInnerHTML={{ __html: data.question }}
            />
            <ul className={`${styles.questions} ${styles[questionNumeral]}`}>
                {shuffledAnswers.map((answer, index) => (
                    <li key={index}>
                        <button
                            className="answer-button"
                            type="button"
                            key={index}
                            onClick={() =>
                                handleClick(
                                    data.question,
                                    answer,
                                    data.associatedField
                                )
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
