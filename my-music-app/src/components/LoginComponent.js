import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rut: '',
    nombre: '',
    apellido: '',
    esAlumnoUDP: false,
    carrera: '',
    tipoUsuario: 'Externo'
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
      tipoUsuario: name === 'esAlumnoUDP' ? (checked ? 'Alumno UDP' : 'Externo') : prevState.tipoUsuario
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email.trim()) errors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email inválido";
    if (!formData.password) errors.password = "La contraseña es requerida";
    if (!isLogin) {
      if (!formData.rut.trim()) errors.rut = "El RUT es requerido";
      if (!formData.nombre.trim()) errors.nombre = "El nombre es requerido";
      if (!formData.apellido.trim()) errors.apellido = "El apellido es requerido";
      if (formData.esAlumnoUDP && !formData.carrera.trim()) errors.carrera = "La carrera es requerida para alumnos UDP";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Aquí iría la lógica para enviar los datos al servidor
      console.log('Formulario enviado:', formData);
      // Redirigir al usuario al dashboard o a la página principal
      navigate('/dashboard');
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mt-4">
            <label className="block" htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
            {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
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
                    name="esAlumnoUDP"
                    checked={formData.esAlumnoUDP}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Alumno UDP</span>
                </label>
              </div>
              {formData.esAlumnoUDP && (
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
              <div className="mt-4">
                <label className="block" htmlFor="tipoUsuario">Tipo de Usuario</label>
                <input
                  type="text"
                  id="tipoUsuario"
                  name="tipoUsuario"
                  value={formData.tipoUsuario}
                  readOnly
                  className="w-full px-4 py-2 mt-2 border rounded-md bg-gray-100"
                />
              </div>
            </>
          )}
          <div className="flex items-baseline justify-between mt-4">
            <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
              {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-blue-600 hover:underline"
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;