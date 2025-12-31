import { useRef } from 'react';
import { useKey } from '../hooks/useKey.js';

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

  // TODO: Add functionality also for numpad Enter key
  useKey('Enter', () => {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery('');
    setSelectedMovieId(null);
  });

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
