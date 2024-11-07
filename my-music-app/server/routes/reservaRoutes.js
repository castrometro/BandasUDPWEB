const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/proximas/:bandaId', authMiddleware, reservaController.obtenerProximasReservas);

module.exports = router;