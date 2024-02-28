import React from 'react'
import { Link } from 'react-router-dom'
import img from '../images/s2.webp'

function Home() {
  return (
    <>

      {/* <!-- Hero Section --> */}
      <section className="relative h-screen">
        <img src={img} className='absolute inset-0 w-full h-screen object-cover'></img>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg md:text-xl text-white mt-4 uppercase">Shree Shantiniketan College</p>
            <h1 className="text-4xl md:text-6xl text-white font-bold mb-8 mt-10">Welcome to Our Website</h1>
            <Link to="/sign-in" className="px-6 py-3 bg-red-500 shadow-lg text-white rounded-full uppercase font-bold tracking-wide hover:bg-red-600">Sign In</Link>
          </div>
        </div>
      </section>

      {/* <!-- Contact Section --> */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          <p>Get in touch with us for any inquiries or support.</p>
          {/* <!-- Add contact form or contact information here --> */}
        </div>
      </section>

      {/* <!-- Footer Section --> */}
      <footer>
        <div className="container">
          <p>&copy; 2024 Your Website. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Home