import { useEffect } from "react";

function Timer({ dispatch, state }) {
  const min = Math.floor(state.secondLeft / 60);
  const sec = state.secondLeft % 60;
  console.log(state.secondsRemaing);
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return function () {
        clearInterval(id);
      };
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {min < 10 ? "0" : ""}
      {min}:{sec}
    </div>
  );
}

export default Timer;
