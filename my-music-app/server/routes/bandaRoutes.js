const express = require('express');
const router = express.Router();
const bandaController = require('../controllers/bandaController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:id', authMiddleware, bandaController.obtenerBandaPorId);
router.post('/', authMiddleware, bandaController.crearBanda);
router.delete('/:id', authMiddleware, bandaController.eliminarBanda);
router.post('/:id/leave', authMiddleware, bandaController.abandonarBanda);
router.get('/', bandaController.obtenerTodasLasBandas);
router.post('/:id/join', authMiddleware, bandaController.unirseABanda);

module.exports = router;