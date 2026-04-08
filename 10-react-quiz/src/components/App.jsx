import { useEffect, useReducer } from 'react';

import StartScreen from './StartScreen.jsx';
import Question from './Question.jsx';
import NextButton from './NextButton.jsx';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Loader from './Loader.jsx';
import Error from './Error.jsx';
import Progress from './Progress.jsx';

const initialState = {
  questions: [],
  // status can be 'loading', 'error', 'ready', 'active' or 'finished' state
  status: 'loading',
  questionIndex: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  const question = state.questions.at(state.questionIndex);

  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      };
    case 'start':
      return { ...state, status: 'active' };
    case 'newAnswer':
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    case 'nextQuestion':
      return { ...state, questionIndex: state.questionIndex + 1, answer: null };
    default:
      throw new Error('Action unknown');
  }
}

function App() {
  const [{ questions, status, questionIndex, answer, points }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((previous, current) => previous + current.points, 0);

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then(response => response.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(error => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Progress
              index={questionIndex}
              numberOfQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question question={questions[questionIndex]} dispatch={dispatch} answer={answer} />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
