import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Hacer una llamada a la API para obtener los datos completos del usuario usando el token
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data && response.data.id) {
            setUser({ token, ...response.data }); // Almacenar el token y los datos del usuario
          } else {
            console.error("El ID del usuario no está disponible en la respuesta de la API");
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
          logout(); // Si el token no es válido, cerrar sesión
        }
      };

      fetchUserData();
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser({ token, ...userData }); // Asegúrate de que el `userData` incluya el `id`
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
