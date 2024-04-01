function NextButton({ dispatch, state, numQuestions }) {
  if (state.index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        disabled={state.answer === null}
        onClick={() => {
          return dispatch({ type: "nextQuestion" });
        }}
      >
        Next
      </button>
    );
  if (state.index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        disabled={state.answer === null}
        onClick={() => {
          return dispatch({ type: "finish" });
        }}
      >
        Finish
      </button>
    );
}

export default NextButton;
