import React, { useEffect, useRef, useState } from 'react'

function About() {

  const ref = useRef()

  const [open, setOpen] = useState(true)

  const clickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [ref]);

return (
  <div className='flex justify-center items-center w-full h-screen'>
    <div className={`bg-black h-60 w-60 ${open ? "block" : "hidden"}`} ref={ref}>
    </div>
  </div>
)

}

export default About