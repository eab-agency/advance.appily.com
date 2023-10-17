import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

function ResetQuizButton({ handleRetakeQuiz }) {
	return (
		<button
			className="button btn-secondary"
			type="button"
			onClick={handleRetakeQuiz}
		>
			<span>Retake Quiz</span>
		</button>
	);
}

export default ResetQuizButton;
