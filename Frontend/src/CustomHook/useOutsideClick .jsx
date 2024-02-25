import { useEffect, useRef } from 'react';
import React from 'react'

function useOutsideClick(toggleSidebar) {

    let ref = useRef(null)



    const clickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            toggleSidebar()
        }
      }
    
      useEffect(() => {
        document.addEventListener('mousedown', clickOutside);
        return () => {
          document.removeEventListener('mousedown', clickOutside);
        };
      }, [ref]);

    return (
        <div ref={ref}>
            {children}
        </div>
    )
}

export default useOutsideClick 