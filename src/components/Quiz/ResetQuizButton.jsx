import { useLocalStorage } from '@hooks/useLocalStorage';
import { useRouter } from 'next/navigation';

function ResetQuizButton() {
    const [localQData, setLocalQData] = useLocalStorage('eab-quiz-data');
    const router = useRouter();

    const handleRetakeQuiz = () => {
        // next route to the quiz page
        router.refresh();

        // reset state
        setLocalQData({
            ...localQData,
            answers: [],
            currentQuestion: 0,
            score: {
                executive: 0,
                practitioner: 0,
                educator: 0,
                scientist: 0,
                analyst: 0,
                initial: 0,
            },
            highestScorePersonality: null,
            isFinished: false,
        });
    };

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
