const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const authMiddleware = require('../middleware/authMiddleware');
const authMiddleware_reservas = require('../middleware/authMiddleware_reservas');

router.get('/proximas/:bandaId', authMiddleware, reservaController.obtenerProximasReservas);
router.post('/create', authMiddleware, reservaController.createReserva);

// Nueva ruta para obtener todas las reservas
router.get('/', authMiddleware_reservas, reservaController.obtenerTodasReservas);

module.exports = router;
