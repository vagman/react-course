// This was created based on the Section 13: Custom Hooks, Refs and More State
import { useState, useEffect } from 'react';

import Loader from './Loader.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import NavBar from './NavBar.jsx';
import NumResults from './NumResults.jsx';
import Search from './Search.jsx';
import Main from './Main.jsx';
import Box from './Box.jsx';
import MoviesList from './MovieList.jsx';
import MovieDetails from './MovieDetails.jsx';
import WatchedSummary from './WatchedSummary.jsx';
import WatchedMoviesList from './WatchedMoviesList.jsx';

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
if (!OMDB_API_KEY) {
  console.error('Miss32ing VITE_OMDB_API_KEY in .env');
}

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(() => {
    const storedWatchedMovies = JSON.parse(localStorage.getItem('watched')) || [];
    return storedWatchedMovies;
  });

  function handleSelectedMovie(movieId) {
    setSelectedMovieId(selectedMovieId => (movieId === selectedMovieId ? null : movieId));
  }

  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
    // Save watched movies to local storage
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  }

  function handleRemoveWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem('watched', JSON.stringify(watched));
    },
    [watched]
  );

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

      // Close the already opened movie details when a new search is made
      handleCloseMovie();

      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar movies={movies}>
        <Search query={query} setQuery={setQuery} setSelectedMovieId={setSelectedMovieId} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MoviesList movies={movies} onSelectMovies={handleSelectedMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedMovieId ? (
            <MovieDetails
              selectedId={selectedMovieId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleRemoveWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
