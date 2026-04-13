import { useEffect } from 'react';

function Timer({ dispatch, secondsRemaining }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const timerId = setInterval(() => {
        dispatch({ type: 'tick' });
      }, 1000);
      // Cleaning up the timer after rerendering - restarting time
      return () => clearInterval(timerId);
    },

    [dispatch],
  );
  return (
    <div className="timer">
      {minutes < 10 ? '0' : ''}
      {minutes}:{seconds < 10 ? '0' : ''}
      {seconds}
    </div>
  );
}

export default Timer;
