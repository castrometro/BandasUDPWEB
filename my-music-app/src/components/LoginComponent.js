import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

export default function LoginComponent() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    correo: '',
    password: '',
    es_udp: false,
    carrera: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    if (location.pathname === '/iniciar-sesion') {
      setIsLogin(true);
    }
  }, [location.pathname]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.correo.trim()) errors.correo = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.correo)) errors.correo = "Email inválido";
    if (!formData.password) errors.password = "La contraseña es requerida";
    if (!isLogin) {
      if (!formData.rut.trim()) errors.rut = "El RUT es requerido";
      if (!formData.nombre.trim()) errors.nombre = "El nombre es requerido";
      if (!formData.apellido.trim()) errors.apellido = "El apellido es requerido";
      if (formData.es_udp && !formData.carrera.trim()) errors.carrera = "La carrera es requerida para alumnos UDP";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        let response;
        if (isLogin) {
          response = await axios.post('http://localhost:5000/api/users/login', {
            correo: formData.correo,
            password: formData.password
          });

          if (response.data.token) {
            login(response.data.token, response.data.user);
            navigate('/');
          } else {
            setApiError('Error en la respuesta del servidor');
          }
        } else {
          const registerData = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            rut: formData.rut,
            correo: formData.correo,
            password: formData.password,
            es_udp: formData.es_udp ? 'si' : 'no',
            carrera: formData.carrera
          };
          console.log('Datos a enviar:', registerData);
          response = await axios.post('http://localhost:5000/api/users/register', registerData);

          if (response.status === 201) {
            navigate('/iniciar-sesion');
            window.location.reload();
          } else {
            setApiError('Error en la respuesta del servidor');
          }
        }
      } catch (error) {
        console.error('Error details:', error);
        if (error.response) {
          setApiError(error.response.data.message || 'Error en el servidor');
        } else if (error.request) {
          setApiError('No se pudo conectar con el servidor');
        } else {
          setApiError('Error al procesar la solicitud');
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h3>
        {apiError && <div className="mt-4 text-red-500 text-center">{apiError}</div>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mt-4">
            <label className="block" htmlFor="correo">Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.correo && <span className="text-xs text-red-400">{errors.correo}</span>}
          </div>
          <div className="mt-4">
            <label className="block" htmlFor="password">Contraseña</label>
            <input
              type="password"
              placeholder="********"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.password && <span className="text-xs text-red-400">{errors.password}</span>}
          </div>
          {!isLogin && (
            <>
              <div className="mt-4">
                <label className="block" htmlFor="rut">RUT</label>
                <input
                  type="text"
                  placeholder="12345678-9"
                  id="rut"
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.rut && <span className="text-xs text-red-400">{errors.rut}</span>}
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.nombre && <span className="text-xs text-red-400">{errors.nombre}</span>}
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="apellido">Apellido</label>
                <input
                  type="text"
                  placeholder="Tu apellido"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                {errors.apellido && <span className="text-xs text-red-400">{errors.apellido}</span>}
              </div>
              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="es_udp"
                    checked={formData.es_udp}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Alumno UDP</span>
                </label>
              </div>
              {formData.es_udp && (
                <div className="mt-4">
                  <label className="block" htmlFor="carrera">Carrera</label>
                  <input
                    type="text"
                    placeholder="Tu carrera"
                    id="carrera"
                    name="carrera"
                    value={formData.carrera}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  {errors.carrera && <span className="text-xs text-red-400">{errors.carrera}</span>}
                </div>
              )}
            </>
          )}
          <div className="flex items-baseline justify-between mt-4">
            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
              {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setApiError('');
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
