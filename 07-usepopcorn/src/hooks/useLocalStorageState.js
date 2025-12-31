import { useState, useEffect } from 'react';

function useLocalStorageState(key) {
  const [value, setValue] = useState(() => {
    const storedWatchedMovies = JSON.parse(localStorage.getItem(key)) || [];
    return storedWatchedMovies;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}

export { useLocalStorageState };
