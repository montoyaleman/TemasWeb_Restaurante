const express = require('express');
const router = express.Router();
const ingredienteController = require('../controllers/ingredienteController');

// get all ingredientes
router.get('/ingrediente', ingredienteController.getAllIngredientes);
//insertar ingredientes
router.post('/ingrediente', ingredienteController.addIngrediente);
//get ingrediente por id
router.get('/ingrediente/:id', ingredienteController.getIngredienteById);
//update
router.put('/ingrediente/:id/:cantidad', ingredienteController.updateIngrediente);
//delete
router.delete('/ingrediente/:id', ingredienteController.deleteIngrediente);

module.exports = router;
