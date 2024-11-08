import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Trash, LogOut } from 'lucide-react';
import { useAuth } from './AuthContext';

const BandCarousel = () => {
  const { user } = useAuth();
  const [bandasRelacionadas, setBandasRelacionadas] = useState([]);
  const [currentBandIndex, setCurrentBandIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBand, setSelectedBand] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState(null);

  const visibleBands = 3;

  const fetchBandasRelacionadas = useCallback(async () => {
    if (!user || !user.id_usuario) {
      console.log('Usuario no autenticado o falta ID de usuario');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No se encontró el token de autenticación');
      }

      console.log(`Obteniendo bandas para el usuario con ID: ${user.id_usuario}`);
      const response = await axios.get(`http://localhost:5000/api/users/${user.id_usuario}/bandas`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      console.log('Respuesta de la API:', response.data);
      setBandasRelacionadas(response.data);
    } catch (err) {
      console.error('Error al obtener las bandas relacionadas:', err);
      if (err.response) {
        console.error('Respuesta del servidor:', err.response.data);
        console.error('Estado HTTP:', err.response.status);
      }
      setError('No se pudieron cargar las bandas. Por favor, intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBandasRelacionadas();
  }, [fetchBandasRelacionadas]);

  const handlePrevBand = () => {
    setCurrentBandIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : bandasRelacionadas.length - visibleBands
    );
  };

  const handleNextBand = () => {
    setCurrentBandIndex((prevIndex) =>
      prevIndex < bandasRelacionadas.length - visibleBands ? prevIndex + 1 : 0
    );
  };

  const refreshBands = () => {
    setLoading(true);
    fetchBandasRelacionadas();
  };

  const handleBandSelect = (banda) => {
    setSelectedBand(banda);
  };

  const handleDeleteBand = () => {
    setActionType('delete');
    setShowConfirmDialog(true);
  };

  const handleLeaveBand = () => {
    setActionType('leave');
    setShowConfirmDialog(true);
  };

  const handleConfirmAction = async () => {
    if (!selectedBand) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No se encontró el token de autenticación');
      return;
    }

    try {
      if (actionType === 'delete') {
        await axios.delete(`http://localhost:5000/api/bandas/${selectedBand.id_banda}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } else if (actionType === 'leave') {
        await axios.post(`http://localhost:5000/api/bandas/${selectedBand.id_banda}/leave`, {}, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      }
      refreshBands();
      setSelectedBand(null);
    } catch (error) {
      console.error('Error al realizar la acción:', error);
      setError('Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.');
    } finally {
      setShowConfirmDialog(false);
    }
  };

  if (loading) {
    return <div className="text-center">Cargando bandas...</div>;
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={refreshBands}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  if (bandasRelacionadas.length === 0) {
    return (
      <div className="text-center">
        <p>No hay bandas disponibles.</p>
        <button 
          onClick={refreshBands}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Actualizar
        </button>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(-${currentBandIndex * (100 / visibleBands)}%)`,
          width: `${(bandasRelacionadas.length * 100) / visibleBands}%`,
        }}
      >
        {bandasRelacionadas.map((banda) => (
          <div key={banda.id_banda} className="w-full sm:w-1/3 flex-shrink-0 px-2">
            <div 
              className={`h-24 bg-blue-100 rounded-lg flex flex-col items-center justify-center cursor-pointer ${selectedBand?.id_banda === banda.id_banda ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => handleBandSelect(banda)}
            >
              <span className="text-blue-800 font-medium">
                {banda.nombre_banda}
              </span>
              {selectedBand?.id_banda === banda.id_banda && (
                <div className="mt-2 flex space-x-2">
                  {banda.es_lider === 1 ? (
                    <button
                      onClick={handleDeleteBand}
                      className="bg-red-500 text-white p-1 rounded"
                      title="Eliminar banda"
                    >
                      <Trash size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={handleLeaveBand}
                      className="bg-yellow-500 text-white p-1 rounded"
                      title="Abandonar banda"
                    >
                      <LogOut size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {bandasRelacionadas.length > visibleBands && (
        <>
          <button
            onClick={handlePrevBand}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
            aria-label="Banda anterior"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={handleNextBand}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md z-10"
            aria-label="Siguiente banda"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </>
      )}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">
              {actionType === 'delete' ? '¿Eliminar banda?' : '¿Abandonar banda?'}
            </h2>
            <p>
              {actionType === 'delete'
                ? '¿Estás seguro de que quieres eliminar esta banda? Esta acción no se puede deshacer.'
                : '¿Estás seguro de que quieres abandonar esta banda?'}
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BandCarousel;