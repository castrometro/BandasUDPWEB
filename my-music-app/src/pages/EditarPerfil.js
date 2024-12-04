import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const instrumentosDisponibles = [
    'Guitarra',
    'Batería',
    'Piano',
    'Bajo',
    'Violín',
    'Flauta',
    'Saxofón',
    'Trompeta',
    'Otros'
  ];

const EditarPerfil = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    carrera: '',
  });
  const [instrumentos, setInstrumentos] = useState([]);
  const [nuevoInstrumento, setNuevoInstrumento] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = response.data;
          setFormData({
            nombre: userData.nombre,
            apellido: userData.apellido,
            carrera: userData.carrera,
          });

          const instrumentosResponse = await axios.get(
            `http://localhost:5000/api/users/instruments/${userData.id_usuario}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setInstrumentos(instrumentosResponse.data);
        } catch (error) {
          console.error('Error al cargar los datos del usuario:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddInstrumento = async () => {
    const token = localStorage.getItem('token');
  
    if (!nuevoInstrumento.trim()) {
      alert("Por favor, selecciona un instrumento de la lista");
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/add-instrument',
        { nombre: nuevoInstrumento },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log('Respuesta del backend al agregar instrumento:', response.data);
  
      if (response.data.message === "Instrumento añadido exitosamente") {
        window.location.reload(); // Recargar la página
      } else {
        alert("Hubo un problema al agregar el instrumento. Intenta nuevamente.");
      }
    } catch (error) {
      console.error('Error al agregar el instrumento:', error);
      alert('Hubo un error al agregar el instrumento. Intenta de nuevo.');
    }
  };

  const handleDeleteInstrumento = async (idInstrumento) => {
    console.log(`Intentando eliminar el instrumento con ID: ${idInstrumento}`);
    const token = localStorage.getItem('token');
    try {
        await axios.delete(`http://localhost:5000/api/users/instruments/${idInstrumento}`, {
            headers: { Authorization: `Bearer ${token}` },
          });          
  
      console.log('Instrumento eliminado con éxito');
      window.location.reload(); // Recargar la página para actualizar la lista de instrumentos
    } catch (error) {
      console.error('Error al eliminar el instrumento:', error);
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/users/update', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/perfil-usuario');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6" style={{ backgroundColor: '#f5f5f5', color: '#000000' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#dd3333' }}>Editar Perfil</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Carrera</label>
            <input
              type="text"
              name="carrera"
              value={formData.carrera}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 rounded-md"
              style={{
                backgroundColor: '#dd3333',
                color: '#ffffff',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#000000')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#dd3333')}
            >
              Guardar Cambios
            </button>
          </div>
          {/* Sección de Instrumentos */}
          <div className="mb-4">
            <label className="block text-sm font-medium" style={{ color: '#dd3333' }}>Instrumentos</label>
            <ul className="list-disc list-inside mb-4">
            {instrumentos.length > 0 ? (
                instrumentos.map((instrumento, index) => (
                <li
                    key={instrumento?.id_instrumento || index}
                    className="flex justify-between items-center"
                >
                    {instrumento?.nombre || 'Instrumento desconocido'}
                    <button
                    type="button"
                    onClick={() =>
                        handleDeleteInstrumento(instrumento.id_instrumento)
                    }
                    className="text-red-500 hover:text-red-700"
                    >
                    Eliminar
                    </button>
                </li>
                ))
            ) : (
                <li>No hay instrumentos registrados</li>
            )}
            </ul>

            <div className="flex items-center">
            <select
                value={nuevoInstrumento}
                onChange={(e) => setNuevoInstrumento(e.target.value)}
                className="w-full px-4 py-2 border rounded-md mr-2"
            >
                <option value="">Selecciona un instrumento</option>
                {instrumentosDisponibles.map((instrumento, index) => (
                <option key={index} value={instrumento}>
                    {instrumento}
                </option>
                ))}
            </select>
            <button
                type="button"
                onClick={handleAddInstrumento}
                className="px-4 py-2 rounded-md"
                style={{
                backgroundColor: '#dd3333',
                color: '#ffffff',
                transition: 'background-color 0.3s ease',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#000000')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#dd3333')}
            >
                Agregar
                    </button>
                </div>

            </div>


        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;
