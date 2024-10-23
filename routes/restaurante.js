const express = require('express');
const router = express.Router();
const ingredienteController = require('../models/Ingrediente');
const platilloController = require('../models/Platillo');
const pedidoController = require('../models/Pedido')
const usuarioController = require('../models/Usuario')

// Rutas para los ingredientes

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

// Rutas para los platillos

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

// Rutas para los pedidos

// get todos los pedidos
router.get('/pedido', pedidoController.listarPedidos);
//insertar pedidos
router.post('/pedido', pedidoController.crearPedido);
//update
router.put('/pedido/:id', pedidoController.actualizarPedido);
//delete
router.delete('/pedido/:id', pedidoController.eliminarPedido);

// Rutas para usuarios

// Obtener todos los usuarios
router.get('/usuario', usuarioController.getAllUsuarios);
// Obtener usuario por ID
router.get('/usuario/:id', usuarioController.getUsuarioById);
// Insertar un nuevo usuario
router.post('/usuario', usuarioController.addUsuario);
// Actualizar un usuario
router.put('/usuario/:id', usuarioController.updateUsuario);
// Eliminar un usuario
router.delete('/usuario/:id', usuarioController.deleteUsuario);


module.exports = router;