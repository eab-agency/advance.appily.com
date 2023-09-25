/* eslint-disable react/prop-types */
import React from 'react';

const Score = ({ score, winningPersonality }) => (
    <div>
        <h2>Scores</h2>
        <ul>
            {score &&
                Object.keys(score).map((personality, index) => (
                    <li key={index}>
                        {personality}: {score[personality]}
                    </li>
                ))}
            <li>Winning personality: {winningPersonality}</li>
        </ul>
    </div>
);

export default Score;
