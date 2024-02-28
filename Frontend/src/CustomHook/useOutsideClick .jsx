import { useEffect, useRef } from 'react';

function useOutsideClick(ref, toggleHeader) {
  const handleClickOutside = (event) => {
    const toggle = toggleHeader();
    if (ref.current && !ref.current.contains(event.target)) {
      toggleHeader();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, toggleHeader]);
}

export default useOutsideClick;
