const express = require('express');
const router = express.Router();
const bandaController = require('../controllers/bandaController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:id', authMiddleware, bandaController.obtenerBandaPorId);

module.exports = router;