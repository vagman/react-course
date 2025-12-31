import { useState, useEffect } from 'react';

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
if (!OMDB_API_KEY) {
  console.error('Missing VITE_OMDB_API_KEY in .env');
}

function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      // AbortController is web API that allows us to cancel fetch requests, it has nothing to do with React but with the browser itself.
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');
          const response = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`, {
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error('Something went wrong fetching movies');
          }

          const data = await response.json();
          if (data.Response === 'False') throw new Error('🍿 Movie not found');

          setMovies(data.Search);
          setError('');
        } catch (error) {
          if (error.name !== 'AbortError') {
            console.log(error.message);
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      // To avoid too many requests, only search when query length is 3 or more
      if (query.length < 4) {
        setMovies([]);
        setError('');
        return;
      }

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}

export { useMovies };
