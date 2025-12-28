import { useState, useEffect } from 'react';

export default function App() {
  const [query, setQuery] = useState('');

  // Effect load only after the browser paints - appear before B because it is the first in the code
  useEffect(function () {
    console.log('After the initial render...');
  }, []);

  // Appear after A because it is the second in the code
  // No dependency array means this Effect is synchronized to everything that happens in the project
  // So for example when we type in the input box, this Effect runs after every render whereas the one above only runs once
  useEffect(function () {
    console.log('After every render...');
  });

  // Appear after 'After the initial render...' and 'After every render...' because it is the last in the code
  // This Effect only runs when 'query' changes
  useEffect(
    function () {
      console.log('D');
    },
    [query]
  );

  // Render logic: runs while rendering - before painting
  console.log('During render...');
}
