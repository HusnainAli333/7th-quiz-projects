function Progress({ state, numQuestions, totalPoints }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={state.index + Number(state.answer !== null)}
      />
      <p>
        Questions <strong>{state.index + 1}</strong>/{numQuestions}{" "}
      </p>
      <p>
        Points <strong>{state.points}</strong>/ {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
