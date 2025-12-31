import { useEffect } from 'react';

function useKey(key, action) {
  // Effect to close movie details on Escape key press
  useEffect(
    function () {
      function callback(event) {
        if (event.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener('keydown', callback);

      return function () {
        document.removeEventListener('keydown', callback);
      };
    },
    [action, key]
  );
}

export { useKey };
