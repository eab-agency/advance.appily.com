import Form from "@/components/Form";
import Link from "next/link";

import isDevMode from "@/helpers/isDevMode";
import styles from '@/styles/components/Results.module.scss';

const Results = ({ children, vertical, answers }) => {
	const formSubmitAnswers = {
		answers: answers.selectedAnswers,
		highestScorePersonality: answers.highestScorePersonality,
	};
	const devModeOnly = isDevMode();
	return (
		<div className={styles["results-container"]}>
			<span className="intro-title">Your ideal role is ...</span>
			<div className={styles.role}>
				{/* Results: {personality} */}
				{/* <p>{description}</p> */}
			</div>

			<div className={styles.engage}>
				<div className={styles.engageCopy}>
					<p>
						Learn why we thought this role could be a good fit for you! Then,
						discover <strong>related careers</strong>, average{" "}
						<strong>salaries</strong> and job outlook, and{" "}
						<strong>academic programs</strong> that can help you reach your
						goals faster.
					</p>
				</div>
				<div className={styles.Form}>
					<h2>Where should we send your results?</h2>
					<Form
						redirectTo={`/careers/${vertical}/${answers.highestScorePersonality}`}
						answers={formSubmitAnswers}
						user={null}
						id="2"
						className={styles.formContainer}
					/>
					{devModeOnly && (
						<Link
							href={`/careers/${vertical}/${answers.highestScorePersonality}`}
						>
							Skip form (only shows in dev mode)
						</Link>
					)}
				</div>
				{children}
			</div>
		</div>
	);
};

export default Results;
