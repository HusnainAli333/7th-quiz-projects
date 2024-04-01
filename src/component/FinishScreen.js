function FinishScreen({ state, dispatch, totalPoints }) {
  return (
    <>
      <p className="result">
        You have scored{" "}
        <strong>
          {state.points} out of <strong>{totalPoints}</strong>
        </strong>
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
