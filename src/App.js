import { useEffect, useReducer } from "react";
import Header from "./component/Header";
import Main from "./component/Main";
import Loader from "./component/Loader";
import Error from "./component/Error";
import StartScreen from "./component/StartScreen";
import Questions from "./component/Questions";
import NextButton from "./component/NextButton";
import Progress from "./component/Progress";
import FinishScreen from "./component/FinishScreen";
import Timer from "./component/Timer";
import Footer from "./component/Footer";

const intialstate = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondLeft: 15 * 20,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": {
      return { ...state, questions: action.payload, status: "ready" };
    }
    case "error": {
      return { ...state, status: "error" };
    }
    case "active": {
      return { ...state, status: "active" };
    }
    case "newAnswer": {
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion": {
      return { ...state, index: state.index + 1, answer: null };
    }
    case "finish": {
      return { ...state, status: "finish", secondLeft: 15 * 20 };
    }
    case "restart": {
      return { ...state, status: "ready", index: 0, points: 0, answer: null };
    }
    case "tick": {
      return {
        ...state,
        secondLeft: state.secondLeft - 1,
        status: state.secondLeft === 0 ? "finish" : state.status,
      };
    }
    default:
      throw new Error("Error unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, intialstate);

  const totalPoints = state.questions?.reduce(
    (total, question) => total + question.points,
    0
  );
  const numQuestions = state.questions.length;

  useEffect(function () {
    async function fetchData() {
      try {
        const fetchQuestions = await fetch("http://localhost:8000/questions");
        const data = await fetchQuestions.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "error" });
      }
    }
    fetchData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {state.status === "active" && (
          <>
            <Progress
              state={state}
              numQuestions={numQuestions}
              totalPoints={totalPoints}
            />
            <Questions state={state} dispatch={dispatch} />
            <Footer>
              <NextButton
                dispatch={dispatch}
                state={state}
                numQuestions={numQuestions}
              />
              <Timer dispatch={dispatch} state={state} />
            </Footer>
          </>
        )}
        {state.status === "finish" && (
          <FinishScreen
            state={state}
            numQuestions={numQuestions}
            dispatch={dispatch}
            totalPoints={totalPoints}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
