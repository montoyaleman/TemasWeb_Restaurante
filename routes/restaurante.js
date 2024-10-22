const express = require('express');
const router = express.Router();
const ingredienteController = require('../models/Ingrediente');
const platilloController = require('../models/Platillo');

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

// get all platillos
router.get('/platillo', platilloController.getAllPlatillos);
//get platillo por id
router.get('/platillos/:id', platilloController.getPlatilloById);
//insertar platillos
router.post('/platillo', platilloController.addPlatillo);
//update
router.put('/platillo/:id', platilloController.updatePlatillo);
//delete
router.delete('/platillo/:id', platilloController.deletePlatillo);


module.exports = router;
