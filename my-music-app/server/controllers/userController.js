const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  console.log('Datos recibidos en el backend:', req.body);
  try {
    const { nombre, apellido, rut, correo, password, es_udp, carrera } = req.body;

    // Validar campos requeridos
    if (!nombre || !apellido || !rut || !correo || !password || !es_udp || !carrera) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Validar formato de correo
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(correo)) {
      return res.status(400).json({ message: 'Formato de correo inválido' });
    }

    // Validar formato de RUT
    const rutRegex = /^\d{7,8}-[\dkK]$/;
    if (!rutRegex.test(rut)) {
      return res.status(400).json({ message: 'Formato de RUT inválido' });
    }

    // Validar es_udp
    if (es_udp !== 'si' && es_udp !== 'no') {
      return res.status(400).json({ message: 'El campo es_udp debe ser "si" o "no"' });
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Preparar la consulta SQL
    const query = `
      INSERT INTO usuarios (nombre, apellido, rut, correo, password, es_udp, carrera)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // Ejecutar la consulta
    const result = await db.query(query, [nombre, apellido, rut, correo, hashedPassword, es_udp, carrera]);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      userId: result.insertId
    });

  } catch (error) {
    console.error('Error al registrar usuario:', error);

    // Verificar errores de entrada duplicada
    if (error.code === 'ER_DUP_ENTRY') {
      if (error.sqlMessage.includes('rut')) {
        return res.status(409).json({ message: 'El RUT ya está registrado' });
      }
      if (error.sqlMessage.includes('correo')) {
        return res.status(409).json({ message: 'El correo ya está registrado' });
      }
    }

    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    console.log('Datos recibidos en el backend:', req.body);
    const { correo, password } = req.body;

    // Validar los campos requeridos
    if (!correo || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    // Buscar el usuario por correo
    const query = `SELECT * FROM usuarios WHERE correo = ?`;
    const [rows] = await db.query(query, [correo]);

    // Verificar si el usuario existe
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = rows[0];

    // Comparar la contraseña ingresada con la almacenada
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar un token de autenticación
    const token = jwt.sign({ id: user.id_usuario, correo: user.correo }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token: token
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.getUserProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    // Consulta para obtener la información del usuario incluyendo el nombre de la banda
    const userQuery = `
      SELECT u.nombre, u.apellido, u.carrera, u.correo, b.nombre_banda
      FROM usuarios u
      LEFT JOIN integrante i ON u.id_usuario = i.id_usuario
      LEFT JOIN bandas b ON i.id_banda = b.id_banda
      WHERE u.id_usuario = ?
    `;

    // Consulta para obtener las reservas del usuario
    const reservationQuery = `
      SELECT 
        r.fecha, r.hora_inicio, r.hora_fin, s.nombre AS nombre_sala
      FROM 
        reservas r
      JOIN integrante i ON r.banda_id = i.id_banda
      LEFT JOIN salas s ON r.sala_id = s.id
      WHERE 
        i.id_usuario = ?
      ORDER BY 
        r.fecha DESC
    `;

    // Ejecutar la consulta para el perfil del usuario
    const [userResult] = await db.query(userQuery, [userId]);

    if (userResult.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = userResult[0];

    // Ejecutar la consulta para las reservas
    const [reservationResult] = await db.query(reservationQuery, [userId]);

    // Construir el objeto de perfil del usuario con el nombre de la banda y las reservas
    const userProfile = {
      nombre: user.nombre,
      apellido: user.apellido,
      carrera: user.carrera,
      correo: user.correo,
      banda: user.nombre_banda,
      reservas: reservationResult
    };

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error al obtener perfil del usuario', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const query = `
      SELECT u.id_usuario, u.nombre, u.apellido, u.rut, u.correo, u.es_udp, u.carrera,
             b.id_banda, b.nombre_banda
      FROM usuarios u
      LEFT JOIN integrante i ON u.id_usuario = i.id_usuario
      LEFT JOIN bandas b ON i.id_banda = b.id_banda
      WHERE u.id_usuario = ?
    `;
    const [rows] = await db.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const userData = {
      id_usuario: rows[0].id_usuario,
      nombre: rows[0].nombre,
      apellido: rows[0].apellido,
      rut: rows[0].rut,
      correo: rows[0].correo,
      es_udp: rows[0].es_udp,
      carrera: rows[0].carrera,
      banda: rows[0].id_banda ? {
        id_banda: rows[0].id_banda,
        nombre_banda: rows[0].nombre_banda
      } : null
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.addInstrument = async (req, res) => {
  const { nombre } = req.body;
  const userId = req.user.id;

  if (!nombre) {
    return res.status(400).json({ message: 'El nombre del instrumento es requerido' });
  }

  try {
    const query = `INSERT INTO instrumentos (id_usuario, nombre) VALUES (?, ?)`;
    const result = await db.query(query, [userId, nombre]);

    // Devolver el instrumento recién añadido
    res.status(201).json({
      message: 'Instrumento añadido exitosamente',
      instrumento: {
        id_instrumento: result.insertId,
        nombre,
      },
    });
  } catch (error) {
    console.error('Error al añadir instrumento:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};




exports.getInstruments = async (req, res) => {
  const userId = req.params.userId;
  try {
    const query = `SELECT * FROM instrumentos WHERE id_usuario = ?`;
    const [rows] = await db.query(query, [userId]);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener instrumentos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.getUserBands = async (req, res) => {
  try {
    const userId = req.params.userId;
    const query = `
      SELECT b.id_banda, b.nombre_banda, b.descripcion_banda, b.prox_eventos
      FROM bandas b
      INNER JOIN integrante i ON b.id_banda = i.id_banda
      WHERE i.id_usuario = ?
    `;
    const [rows] = await db.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron bandas para este usuario' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener las bandas del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
exports.obtenerBandasDeUsuario = async (req, res) => {
  try {
    const userId = req.params.id;

    const [bandas] = await db.query(`
      SELECT b.*, i.es_lider 
      FROM bandas b
      INNER JOIN integrante i ON b.id_banda = i.id_banda
      WHERE i.id_usuario = ?
    `, [userId]);

    res.json(bandas);
      } catch (error) {
        console.error('Error al obtener las bandas del usuario:', error);
       res.status(500).json({ mensaje: 'Error interno del servidor al obtener las bandas del usuario' });
      }
  };
  exports.deleteInstrument = async (req, res) => {
    const { id } = req.params; // ID del instrumento a eliminar
    const userId = req.user.id; // ID del usuario autenticado
  
    try {
      // Verificar que el instrumento pertenece al usuario autenticado
      const query = `SELECT * FROM instrumentos WHERE id_instrumento = ? AND id_usuario = ?`;
      const [rows] = await db.query(query, [id, userId]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Instrumento no encontrado o no autorizado para eliminar.' });
      }
  
      // Eliminar el instrumento
      const deleteQuery = `DELETE FROM instrumentos WHERE id_instrumento = ? AND id_usuario = ?`;
      await db.query(deleteQuery, [id, userId]);
  
      res.status(200).json({ message: 'Instrumento eliminado con éxito' });
    } catch (error) {
      console.error('Error al eliminar instrumento:', error);
      res.status(500).json({ message: 'Error al eliminar el instrumento.' });
    }
  };

