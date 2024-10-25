import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext'

const Header = ({ navItems, logo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  const authNavItems = user
    ? [
        ...navItems.filter(item => item.title !== "Login"),
        { title: "Mi Perfil", url: "/perfil-usuario" },
        { title: "Cerrar sesión", url: "#", onClick: handleLogout }
      ]
    : navItems

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="DAE UDP Logo" className="h-10 md:h-12" />
          </Link>
          
          {/* Hamburger menu for mobile */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Navigation for larger screens */}
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              {authNavItems.map((item, index) => (
                <li key={index}>
                  {item.onClick ? (
                    <button onClick={item.onClick} className="text-gray-700 hover:text-red-600">
                      {item.title}
                    </button>
                  ) : (
                    <Link to={item.url} className="text-gray-700 hover:text-red-600">
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-2">
              {authNavItems.map((item, index) => (
                <li key={index}>
                  {item.onClick ? (
                    <button 
                      onClick={() => {
                        item.onClick()
                        setIsMenuOpen(false)
                      }}
                      className="block text-gray-700 hover:text-red-600 py-2 w-full text-left"
                    >
                      {item.title}
                    </button>
                  ) : (
                    <Link 
                      to={item.url} 
                      className="block text-gray-700 hover:text-red-600 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header