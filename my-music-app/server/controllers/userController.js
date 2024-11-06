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

    // Validar formato de RUT (puedes implementar una validación más robusta si lo deseas)
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
      SELECT u.nombre, u.apellido, u.carrera, u.correo, b.nombre_banda AS nombre_banda
      FROM usuarios u
      LEFT JOIN bandas b ON u.id_banda = b.id_banda
      WHERE u.id_usuario = ?
    `;

    // Consulta para obtener las reservas del usuario
    const reservationQuery = `
      SELECT 
        r.fecha, r.hora_inicio, r.hora_fin, s.nombre AS nombre_sala
      FROM 
        reservas r
      LEFT JOIN salas s ON r.sala_id = s.id
      WHERE 
        r.banda_id = ?
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
    const [reservationResult] = await db.query(reservationQuery, [user.id_banda]);

    // Construir el objeto de perfil del usuario con el nombre de la banda y las reservas
    const userProfile = {
      nombre: user.nombre,
      apellido: user.apellido,
      carrera: user.carrera,
      correo: user.correo,
      banda: user.nombre_banda, // Mostrar el nombre de la banda directamente
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
    const query = `SELECT id_usuario, nombre, apellido, rut, correo, id_banda, es_udp, carrera FROM usuarios WHERE id_usuario = ?`;
    const [rows] = await db.query(query, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

