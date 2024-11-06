const db = require('../database');

exports.obtenerProximasReservas = async (req, res) => {
    try {
      const bandaId = req.params.bandaId;
  
      // Obtenemos las reservas futuras de la banda ordenadas por fecha y hora de inicio
      const [rows] = await db.query(
        `SELECT * FROM reservas 
         WHERE banda_id = ? AND fecha >= CURDATE()
         ORDER BY fecha ASC, hora_inicio ASC`,
        [bandaId]
      );
      console.log(rows)
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener las próximas reservas' });
    }
  };