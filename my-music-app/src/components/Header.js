import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ navItems, logo }) => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="DAE UDP Logo" className="h-12" />
      </Link>
      <nav>
        <ul className="flex space-x-4">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.url} className="text-gray-700 hover:text-red-600">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
)

export default Header