import isDevMode from "@/helpers/isDevMode";
/* eslint-disable react/prop-types */
import React from "react";

import styles from "@/styles/components/LocationScoreDev.module.scss";

const Score = ({ score, winningPersonality }) => {
  if (!isDevMode()) {
    return null; // If isDevMode is false, return null to not render the component
  }

  return (
    <div className={styles.scoreCard}>
      <p>Scores Card Info (isDevMode: {isDevMode()})</p>
      <ul>
        {typeof score === 'number' ? (
          <li>Score: {score}</li>
        ) : (
          Object.keys(score).map((personality, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <li key={index}>
              {personality}: {score[personality]}
            </li>
          ))
        )}
        {winningPersonality && (
          <li>Winning personality: {winningPersonality}</li>
        )}
      </ul>
    </div>
  );
};

export default Score;
