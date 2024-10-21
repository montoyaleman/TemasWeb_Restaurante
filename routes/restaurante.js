const express = require('express');
const router = express.Router();
const restauranteController = require('../controllers/restauranteController');

// Rutas
router.get('/', restauranteController.getAllIngredientes);
router.post('/ingrediente', restauranteController.addIngrediente);
router.get('/ingrediente/:id', restauranteController.getIngredienteById);
router.put('/ingrediente/:id', restauranteController.updateIngrediente);
router.delete('/ingrediente/:id', restauranteController.deleteIngrediente);

module.exports = router;
