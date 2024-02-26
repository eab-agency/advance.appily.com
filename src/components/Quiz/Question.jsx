import isDevMode from "@/helpers/isDevMode";
import styles from "@/styles/components/Question.module.scss";

function Question({ handleAnswer, question, lastQuestion }) {
  if (!question) {
    return null;
  }
  const handleClick = (q, answer, assocField) => {
    handleAnswer(q, answer, assocField);
  };

  const questionNumeral = lastQuestion ? "last-question" : "";

  return (
    <>
    <div className="question">
        <h2
        className="question-copy"
        dangerouslySetInnerHTML={{ __html: question.question }}
        />
        <p className="question-description" dangerouslySetInnerHTML={{ __html: question.description }} />
    </div>
      <ul className={`${styles.questions} ${styles[questionNumeral]}`}>
        {question.answers.map((answer, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <li key={index}>
            <button
              className="answer-button"
              type="button"
              onClick={() =>
                handleClick(question.question, answer, question.associatedField)
              }
            >
              {answer.answer} {isDevMode() ? `index: ${answer.originalIndex} | weight: ${answer.weight}` : ''}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Question;
