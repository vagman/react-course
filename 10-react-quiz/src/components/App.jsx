import { useEffect, useReducer } from 'react';

import Header from './Header.jsx';
import Main from './Main.jsx';
import Loader from './Loader.jsx';
import Error from './Error.jsx';

const initialState = {
  questions: [],
  // status can be 'loading', 'error', 'ready', 'active' or 'finished' state
  status: 'loading',
};

function reducer(state, action) {
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
    default:
      throw new Error('Action unknown');
  }
}

function App() {
  const [{ question, status }, dispatch] = useReducer(reducer, initialState);
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
      </Main>
    </div>
  );
}

export default App;
