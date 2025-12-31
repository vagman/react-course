import { useState, useEffect } from 'react';

function useLocalStorageState(key) {
  const [value, setValue] = useState(() => {
    const storedWatchedMovies = JSON.parse(localStorage.getItem(key)) || [];
    console.log('Retrieved from localStorage:', storedWatchedMovies);
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
