import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

function ResetQuizButton({ handleRetakeQuiz }) {
	return (
		<button
			className="button btn-secondary"
			type="button"
			onClick={handleRetakeQuiz}
		>
			Retake Quiz
		</button>
	);
}

export default ResetQuizButton;
