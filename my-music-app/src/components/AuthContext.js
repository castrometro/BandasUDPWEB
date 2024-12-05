import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async (token) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data && response.data.id_usuario) {
        setUser({ token, ...response.data });
      } else {
        throw new Error("El ID del usuario no está disponible en la respuesta de la API");
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      logout();
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
  }, [fetchUserData]);

  const login = async (token, userData) => {
    localStorage.setItem('token', token);
    console.log('TOKEN: ', token);
    setLoading(true);
    await fetchUserData(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setLoading(false);
    setError(null);
  };

  const updateUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoading(true);
      await fetchUserData(token);
    }
  };

  const refreshToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No hay token disponible');

      const response = await axios.post('http://localhost:5000/api/users/refresh-token', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        await fetchUserData(response.data.token);
      } else {
        throw new Error('No se pudo refrescar el token');
      }
    } catch (error) {
      console.error('Error al refrescar el token:', error);
      logout();
      setError('La sesión ha expirado. Por favor, inicia sesión nuevamente.');
    }
  };

  return (
    <AuthContext.Provider value={{fetchUserData, user, login, logout, loading, error, updateUser, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};