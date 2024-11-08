// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/profile/:id', userController.getUserProfile);
router.get('/me', authMiddleware, userController.getMe);
router.get('/instruments/:userId', userController.getInstruments); 
router.post('/add-instrument', authMiddleware, userController.addInstrument);
router.get('/:userId/bandas', authMiddleware, userController.getUserBands);
router.get('/:id/bandas', authMiddleware, userController.obtenerBandasDeUsuario);


// Agrega la ruta de prueba aquí
router.get('/test', (req, res) => {
  res.send("Ruta de prueba en userRoutes.js está funcionando");
});

module.exports = router;
