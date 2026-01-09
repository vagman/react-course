function reducer(state, action) {
  console.log(state, action);
  if (action.type === 'inc') return state + 1;
  if (action.type === 'dec') return state - 1;
  if (action.type === 'setCount') return action.payload;
}

export { reducer };
