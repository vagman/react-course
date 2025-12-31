import { useEffect, useRef } from 'react';

function Search({ query, setQuery, setSelectedMovieId }) {
  // Focus the input field whenever the query changes
  // useEffect(
  //   function () {
  //     const element = document.querySelector('.search');
  //     console.log(element);
  //     element.focus();
  //   },
  //   [query]
  // );

  // Same as above but using ref
  const inputElement = useRef(null);
  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputElement.current) return;
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
          inputElement.current.focus();
          setQuery('');
          setSelectedMovieId(null);
        }
      }

      document.addEventListener('keydown', callback);
      return () => document.removeEventListener('keydown', callback);
    },
    [query, setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={inputElement}
      autoFocus
    />
  );
}

export default Search;
