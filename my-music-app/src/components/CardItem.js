import React from 'react'
import { Link } from 'react-router-dom'

const CardItem = ({ title, imageSrc, link }) => (
  <Link to={link} className="block bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="relative pb-2/3">
      <img src={imageSrc} alt={title} className="absolute h-full w-full object-cover" />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  </Link>
)

export default CardItem