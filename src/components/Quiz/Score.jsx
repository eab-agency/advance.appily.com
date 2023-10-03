import isDevMode from "@/helpers/isDevMode";
/* eslint-disable react/prop-types */
import React from "react";

const styles = {
	position: "absolute",
	top: 0,
	right: 0,
	padding: "10px",
	background: "rgba(0,0,0,0.5)",
	color: "#fff",
	zIndex: 100,
};

const Score = ({ score, winningPersonality }) => {
	if (!isDevMode) {
		return null; // If isDevMode is false, return null to not render the component
	}

	return (
		<div style={styles}>
			<h2>Scores</h2>
			<ul>
				{score &&
					Object.keys(score).map((personality, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<li key={index}>
							{personality}: {score[personality]}
						</li>
					))}
				{winningPersonality && (
					<li>Winning personality: {winningPersonality}</li>
				)}
			</ul>
		</div>
	);
};

export default Score;
