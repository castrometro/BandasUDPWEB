const mysql = require('mysql2/promise');

// Crear un pool de conexiones (mejor rendimiento para múltiples solicitudes)
const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'BandasUDPWEB'
});

// No necesitas llamar a connect() manualmente

module.exports = connection;
