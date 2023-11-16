import { Button } from "@/components";

const ADCQuizPage = () => {
	return (
		<>
			<h1>ADC Quiz Page</h1>
			<Button
				label="Take the Quiz"
				appearance="primary"
				href="/adc/quiz/start"
				className="button btn-primary btn-click-quiz"
			/>
		</>
	);
};

export default ADCQuizPage;
