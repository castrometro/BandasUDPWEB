import React from 'react'

const Section = ({ title, description, backgroundImage, buttonText, buttonLink }) => (
  <section className="relative h-screen flex items-center justify-center" style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <div className="relative z-10 text-white text-center max-w-2xl mx-auto px-4">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <p className="mb-8">{description}</p>
      <a href={buttonLink} className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-300">
        {buttonText}
      </a>
    </div>
  </section>
)

export default Section