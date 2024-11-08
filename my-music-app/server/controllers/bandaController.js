const db = require('../database');

exports.obtenerBandaPorId = async (req, res) => {
  try {
    const bandaId = req.params.id;

    const [rows] = await db.query('SELECT * FROM bandas WHERE id_banda = ?', [bandaId]);

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Banda no encontrada' });
    }

    const banda = rows[0];

    const bandaData = {
      id_banda: banda.id_banda,
      nombre: banda.nombre_banda,
      descripcion: banda.descripcion_banda,
      prox_eventos: banda.prox_eventos
    };

    res.json(bandaData);
  } catch (error) {
    console.error('Error al obtener la banda:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor al obtener la banda' });
  }
};

exports.crearBanda = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const { nombre, descripcion, prox_eventos } = req.body;
    
    if (!req.user || !req.user.id) {
      return res.status(401).json({ mensaje: 'Usuario no autenticado o ID de usuario no disponible' });
    }
    
    const userId = req.user.id;

    console.log('Datos recibidos para crear banda:', { nombre, descripcion, prox_eventos, userId });

    if (!nombre || !descripcion) {
      return res.status(400).json({ mensaje: 'El nombre y la descripción de la banda son requeridos' });
    }

    const [result] = await connection.query(
      'INSERT INTO bandas (nombre_banda, descripcion_banda, prox_eventos) VALUES (?, ?, ?)',
      [nombre, descripcion, prox_eventos]
    );

    const nuevaBandaId = result.insertId;
    console.log('ID de la nueva banda:', nuevaBandaId);

    // Corregimos la consulta SQL aquí
    const [integranteResult] = await connection.query(
      'INSERT INTO integrante (id_usuario, id_banda, es_lider) VALUES (?, ?, ?)',
      [userId, nuevaBandaId, 1]
    );

    console.log('Resultado de inserción de integrante:', integranteResult);

    const [nuevaBanda] = await connection.query('SELECT * FROM bandas WHERE id_banda = ?', [nuevaBandaId]);

    if (nuevaBanda.length === 0) {
      await connection.rollback();
      return res.status(404).json({ mensaje: 'Error al crear la banda: no se pudo recuperar la información' });
    }

    const bandaData = {
      id_banda: nuevaBanda[0].id_banda,
      nombre: nuevaBanda[0].nombre_banda,
      descripcion: nuevaBanda[0].descripcion_banda,
      prox_eventos: nuevaBanda[0].prox_eventos
    };

    await connection.commit();

    console.log('Banda creada exitosamente:', bandaData);
    res.status(201).json({
      ...bandaData,
      mensaje: 'Banda creada exitosamente. Eres el líder de esta banda.'
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error al crear la banda:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ mensaje: 'Ya existe una banda con ese nombre' });
    }
    res.status(500).json({ mensaje: 'Error interno del servidor al crear la banda' });
  } finally {
    connection.release();
  }
};
exports.eliminarBanda = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const bandaId = req.params.id;
    const userId = req.user.id;

    // Verificar si el usuario es líder de la banda
    const [lider] = await connection.query(
      'SELECT es_lider FROM integrante WHERE id_banda = ? AND id_usuario = ?',
      [bandaId, userId]
    );

    if (lider.length === 0 || lider[0].es_lider !== 1) {
      await connection.rollback();
      return res.status(403).json({ mensaje: 'No tienes permiso para eliminar esta banda' });
    }

    // Eliminar todos los integrantes de la banda
    await connection.query('DELETE FROM integrante WHERE id_banda = ?', [bandaId]);

    // Eliminar la banda
    await connection.query('DELETE FROM bandas WHERE id_banda = ?', [bandaId]);

    await connection.commit();
    res.json({ mensaje: 'Banda eliminada exitosamente' });
  } catch (error) {
    await connection.rollback();
    console.error('Error al eliminar la banda:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor al eliminar la banda' });
  } finally {
    connection.release();
  }
};

exports.abandonarBanda = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const bandaId = req.params.id;
    const userId = req.user.id;

    // Verificar si el usuario es miembro de la banda
    const [miembro] = await connection.query(
      'SELECT es_lider FROM integrante WHERE id_banda = ? AND id_usuario = ?',
      [bandaId, userId]
    );

    if (miembro.length === 0) {
      await connection.rollback();
      return res.status(404).json({ mensaje: 'No eres miembro de esta banda' });
    }

    if (miembro[0].es_lider === 1) {
      // Si el usuario es líder, verificar si hay otros miembros
      const [otrosMiembros] = await connection.query(
        'SELECT COUNT(*) as count FROM integrante WHERE id_banda = ? AND id_usuario != ?',
        [bandaId, userId]
      );

      if (otrosMiembros[0].count > 0) {
        // Si hay otros miembros, asignar el liderazgo a otro miembro
        await connection.query(
          'UPDATE integrante SET es_lider = 1 WHERE id_banda = ? AND id_usuario != ? LIMIT 1',
          [bandaId, userId]
        );
      } else {
        // Si no hay otros miembros, eliminar la banda
        await connection.query('DELETE FROM bandas WHERE id_banda = ?', [bandaId]);
      }
    }

    // Eliminar al usuario de la banda
    await connection.query(
      'DELETE FROM integrante WHERE id_banda = ? AND id_usuario = ?',
      [bandaId, userId]
    );

    await connection.commit();
    res.json({ mensaje: 'Has abandonado la banda exitosamente' });
  } catch (error) {
    await connection.rollback();
    console.error('Error al abandonar la banda:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor al abandonar la banda' });
  } finally {
    connection.release();
  }
};
exports.obtenerTodasLasBandas = async (req, res) => {
  try {
    const [bandas] = await db.query('SELECT * FROM bandas');
    res.json(bandas);
  } catch (error) {
    console.error('Error al obtener todas las bandas:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor al obtener las bandas' });
  }
};

exports.unirseABanda = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const bandaId = req.params.id;
    const userId = req.user.id;

    // Verificar si el usuario ya es miembro de la banda
    const [miembroExistente] = await connection.query(
      'SELECT * FROM integrante WHERE id_banda = ? AND id_usuario = ?',
      [bandaId, userId]
    );

    if (miembroExistente.length > 0) {
      await connection.rollback();
      return res.status(400).json({ mensaje: 'Ya eres miembro de esta banda' });
    }

    // Añadir al usuario como integrante de la banda
    await connection.query(
      'INSERT INTO integrante (id_usuario, id_banda, es_lider) VALUES (?, ?, 0)',
      [userId, bandaId]
    );

    await connection.commit();
    res.json({ mensaje: 'Te has unido a la banda exitosamente' });
  } catch (error) {
    await connection.rollback();
    console.error('Error al unirse a la banda:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor al unirse a la banda' });
  } finally {
    connection.release();
  }
};
