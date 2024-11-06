const db = require('../database');

exports.obtenerBandaPorId = async (req, res) => {
  try {
    const bandaId = req.params.id;

    const [rows] = await db.query('SELECT * FROM bandas WHERE id_banda = ?', [bandaId]);

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Banda no encontrada' });
    }

    const banda = rows[0];

    // Formatear los datos para que coincidan con lo que espera el frontend
    const bandaData = {
      id_banda: banda.id_banda,
      nombre: banda.nombre_banda,
      descripcion: banda.descripcion_banda,
      prox_eventos: banda.prox_eventos,
    };

    res.json(bandaData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la banda' });
  }
};
