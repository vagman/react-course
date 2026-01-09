function reducer(state, action) {
  const initialState = { count: 0, step: 1 };

  console.log(state, action);
  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + state.step };
    case 'dec':
      return { ...state, count: state.count - state.step };
    case 'setCount':
      return { ...state, count: action.payload };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action type: ' + action.type);
  }
}

export { reducer };
