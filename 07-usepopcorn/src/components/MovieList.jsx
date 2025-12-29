import Movie from './Movie.jsx';

function MoviesList({ movies, onSelectMovies }) {
  return (
    <ul className="list list-movies">
      {movies?.map(movie => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovies={onSelectMovies} />
      ))}
    </ul>
  );
}

export default MoviesList;
