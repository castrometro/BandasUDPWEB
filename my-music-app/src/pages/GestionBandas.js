import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PlusCircle, Edit, Trash2, Users } from 'lucide-react';

const GestionBandas = () => {
  const [bandas, setBandas] = useState([]);
  const [nuevaBanda, setNuevaBanda] = useState({ nombre: '', genero: '', descripcion: '' });
  const [editando, setEditando] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí normalmente harías una llamada a la API para obtener las bandas
    // Por ahora, usaremos datos de ejemplo
    const bandasEjemplo = [
      { id: 1, nombre: 'Los Rockeros UDP', genero: 'Rock', descripcion: 'Banda de rock universitaria', miembros: 4 },
      { id: 2, nombre: 'Jazz Fusion Quartet', genero: 'Jazz', descripcion: 'Cuarteto de jazz experimental', miembros: 4 },
      { id: 3, nombre: 'Electro Bits', genero: 'Electrónica', descripcion: 'Dúo de música electrónica', miembros: 2 },
    ];
    setBandas(bandasEjemplo);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaBanda(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      // Actualizar banda existente
      setBandas(bandas.map(banda => banda.id === editando ? { ...banda, ...nuevaBanda } : banda));
      setEditando(null);
    } else {
      // Crear nueva banda
      const nuevaBandaConId = { ...nuevaBanda, id: Date.now(), miembros: 1 };
      setBandas([...bandas, nuevaBandaConId]);
    }
    setNuevaBanda({ nombre: '', genero: '', descripcion: '' });
  };

  const handleEdit = (banda) => {
    setEditando(banda.id);
    setNuevaBanda({ nombre: banda.nombre, genero: banda.genero, descripcion: banda.descripcion });
  };

  const handleDelete = (id) => {
    setBandas(bandas.filter(banda => banda.id !== id));
  };

  const headerNavItems = [
    { title: "Inicio", url: "/" },
    { title: "Perfil", url: "/perfil" },
    { title: "Salas de ensayo", url: "/salas-de-ensayo" },
    { title: "Calendario salas", url: "/calendario-salas" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header navItems={headerNavItems} logo="/path/to/logo.png" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Gestión de Bandas</h1>
        
        <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre de la Banda
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nombre"
              type="text"
              placeholder="Nombre de la banda"
              name="nombre"
              value={nuevaBanda.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genero">
              Género Musical
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="genero"
              type="text"
              placeholder="Género musical"
              name="genero"
              value={nuevaBanda.genero}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="descripcion"
              placeholder="Breve descripción de la banda"
              name="descripcion"
              value={nuevaBanda.descripcion}
              onChange={handleInputChange}
              rows="3"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
              type="submit"
            >
              <PlusCircle className="mr-2" size={20} />
              {editando ? 'Actualizar Banda' : 'Crear Nueva Banda'}
            </button>
          </div>
        </form>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Bandas Existentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bandas.map(banda => (
              <div key={banda.id} className="border rounded-lg p-4 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{banda.nombre}</h3>
                <p className="text-gray-600 mb-2">{banda.genero}</p>
                <p className="text-gray-500 mb-4">{banda.descripcion}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 flex items-center">
                    <Users size={16} className="mr-1" />
                    {banda.miembros} {banda.miembros === 1 ? 'miembro' : 'miembros'}
                  </span>
                  <div>
                    <button
                      onClick={() => handleEdit(banda)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      aria-label={`Editar ${banda.nombre}`}
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(banda.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label={`Eliminar ${banda.nombre}`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GestionBandas;