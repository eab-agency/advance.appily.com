import React, { useEffect, useState } from 'react';

const QuestionsTitle = ({ quizState, questions, titles }) => {
  const [shuffledTitles, setShuffledTitles] = useState([]);
  const [titleIndices, setTitleIndices] = useState([]);

  useEffect(() => {
    // Initialize the title indices when the component mounts
    setTitleIndices(Array.from({ length: titles.length }, (_, i) => i));

    const shuffleTitles = () => {
      if (titleIndices.length === 0) {
        // Reset the indices to start over from the beginning of the list
        setTitleIndices(Array.from({ length: titles.length }, (_, i) => i));
      }

      const randomIndex = Math.floor(Math.random() * titleIndices.length);
      const newTitleIndex = titleIndices[randomIndex];
      // Remove the selected index from the list of indices
      setTitleIndices(prevIndices => prevIndices.filter(idx => idx !== newTitleIndex));
      // Update shuffledTitles with the selected title
      setShuffledTitles(prevTitles => [...prevTitles, titles[newTitleIndex]]);
    };

    shuffleTitles();
  }, [titles]);

  // Calculate the current title index based on the quiz state
  let currentTitleIndex = -1;
  if (quizState.currentQuestionIdx >= 1 && quizState.currentQuestionIdx <= questions.length) {
    currentTitleIndex = quizState.currentQuestionIdx + 1; // Adjust to match the array index
  }

  return (
    <span className="intro-title">
      {currentTitleIndex === -1
        ? "Are you ready?"
        : currentTitleIndex === titles.length
          ? "You're almost there!"
          : shuffledTitles[currentTitleIndex] || "Keep the momentum going!"}
    </span>
  );
};

export default QuestionsTitle;
