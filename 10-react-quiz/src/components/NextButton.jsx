function NextButton({ answer, questionIndex, numberOfQuestions, dispatch }) {
  if (answer === null) return null;

  if (questionIndex < numberOfQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>
        Next
      </button>
    );

  if (questionIndex === numberOfQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: 'finish' })}>
        Finish
      </button>
    );
}

export default NextButton;
