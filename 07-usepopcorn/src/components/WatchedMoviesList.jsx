import WatchedMovie from './WatchedMovie.jsx';

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
