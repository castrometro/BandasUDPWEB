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
  exports.createReserva = async (req, res) => {
    try {
      const { sala_id, fecha, hora_inicio, hora_fin, banda_id } = req.body;
  
      // Validar que todos los campos requeridos estén presentes
      if (!sala_id || !fecha || !hora_inicio || !hora_fin || !banda_id) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
      console.log(req.body)
      // Verificar que la sala esté disponible en la fecha y hora seleccionadas
      const checkQuery = `
        SELECT * FROM reservas
        WHERE sala_id = ? 
          AND fecha = ? 
          AND (
            (hora_inicio < ? AND hora_fin > ?) -- Solapamiento por inicio
            OR 
            (hora_inicio < ? AND hora_fin > ?) -- Solapamiento por fin
            OR 
            (hora_inicio >= ? AND hora_fin <= ?) -- Totalmente contenida
          )
      `;

      const [existingReservations] = await db.query(checkQuery, [
        sala_id,
        fecha,
        hora_fin,   // Condición 1: Solapamiento por inicio
        hora_inicio,
        hora_fin,   // Condición 2: Solapamiento por fin
        hora_inicio,
        hora_inicio, // Condición 3: Contenida dentro del rango
        hora_fin
      ]);

      console.log(existingReservations)
      if (existingReservations.length > 0) {
        return res.status(409).json({ message: 'La sala ya está reservada en ese horario.' });
      }
  
      // Insertar la nueva reserva
      const insertQuery = `
        INSERT INTO reservas (sala_id, fecha, hora_inicio, hora_fin, banda_id)
        VALUES (?, ?, ?, ?, ?)
      `;
      await db.query(insertQuery, [sala_id, fecha, hora_inicio, hora_fin, banda_id]);
  
      res.status(201).json({ message: 'Reserva creada exitosamente' });
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  exports.obtenerTodasReservas = async (req, res) => {
    try {
      const query = `
      SELECT 
        r.fecha,
        r.hora_inicio,
        b.nombre_banda AS banda_nombre,
        s.nombre AS sala_nombre
      FROM reservas r
      JOIN bandas b ON r.banda_id = b.id_banda
      JOIN salas s ON r.sala_id = s.id
      `;
  
      const [results] = await db.query(query); // Ejecutar la consulta
      res.status(200).json(results); // Enviar resultados al frontend
    } catch (error) {
      console.error('Error al obtener todas las reservas:', error);
      res.status(500).json({ message: 'Error al obtener las reservas' });
    }
  };