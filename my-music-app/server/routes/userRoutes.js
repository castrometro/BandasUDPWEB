// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.post('/add-instrument', authMiddleware, userController.addInstrument);
router.get('/profile/:id', userController.getUserProfile);
router.get('/me', authMiddleware, userController.getMe);
router.get('/instruments/:userId', userController.getInstruments); 
router.get('/:userId/bandas', authMiddleware, userController.getUserBands);
router.get('/:id/bandas', authMiddleware, userController.obtenerBandasDeUsuario);
router.get('/mis-reservas', authMiddleware, userController.getMisReservas);
router.delete('/instruments/:id', authMiddleware, userController.deleteInstrument);
router.put('/update', authMiddleware, userController.updateUserProfile);
router.get('/my-bands', authMiddleware, userController.getUserBands);



// Agrega la ruta de prueba aquí
router.get('/test', (req, res) => {
  res.send("Ruta de prueba en userRoutes.js está funcionando");
});

module.exports = router;
