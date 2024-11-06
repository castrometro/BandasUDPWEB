require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const bandasRoutes = require('./routes/bandaRoutes');
const reservasRoutes = require('./routes/reservaRoutes');

const app = express();

// Configurar CORS
app.use(cors());

app.use(express.json());

// Usar rutas de usuarios
app.use('/api/users', userRoutes);
app.use('/api/bandas', bandasRoutes);
app.use('/api/reservas', reservasRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
