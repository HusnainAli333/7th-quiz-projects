function Questions({ state, dispatch }) {
  const hasAnswered = state.answer !== null;
  console.log(state.questions[state.index]);
  return (
    <div>
      <h4>{state.questions[state.index].question}</h4>
      <div className="options">
        {state.questions[state.index].options.map((value, index) => {
          return (
            <button
              key={index}
              className={`  btn btn-options ${
                index === state.answer ? "answer" : ""
              } ${
                hasAnswered
                  ? index === state.questions[state.index].correctOption
                    ? "correct"
                    : "wrong"
                  : ""
              }`}
              disabled={hasAnswered}
              onClick={() =>
                dispatch({
                  type: "newAnswer",
                  payload: index,
                  nextIndex: ++index,
                })
              }
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Questions;
