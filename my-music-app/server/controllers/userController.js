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
  console.log('Datos recibidos para login:', req.body);
  try {
    const { correo, password } = req.body;

    // Validar campos requeridos
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
    const token = jwt.sign({ userId: user.id, correo: user.correo }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token: token
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
