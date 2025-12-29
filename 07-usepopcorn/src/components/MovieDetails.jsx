import { useEffect, useState } from 'react';
import Loader from './Loader.jsx';
import StarRating from './StarRating.jsx';

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
if (!OMDB_API_KEY) {
  console.error('Missing VITE_OMDB_API_KEY in .env');
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const movieAlreadyRated = watched.find(movie => movie.imdbID === selectedId);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAddWatched() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(' ').at(0),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const response = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${selectedId}`);
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie.`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐️ {imdbRating} IMDb rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!movieAlreadyRated ? (
                <>
                  <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddWatched}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  <em>You have already rated this movie with {movieAlreadyRated.userRating}🌟 stars.</em>
                </p>
              )}
            </div>

            <p>
              <em>Plot:</em> {plot}
            </p>
            <p>
              <strong>Starring Actors:</strong> {actors}
            </p>
            <p>
              <strong>Directed by </strong> {director}
            </p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
