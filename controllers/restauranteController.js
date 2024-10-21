const fs = require('fs');
const Ingrediente = require('../models/ingrediente.js');
const dataPath = './data/restaurante.json';

// Funciones del controlador
exports.getAllIngredientes = (req, res) => {
    try {
      const restauranteData = JSON.parse(fs.readFileSync(dataPath));
      res.json(restauranteData);
    } catch (err) {
      res.status(500).json({ error: 'No se pudieron obtener los ingredientes' });
    }
};


exports.getIngredienteById = (req, res) => {
    const ingredienteId = parseInt(req.params.id);
  
    if (isNaN(ingredienteId)) {
      return res.status(400).json({ error: 'ID de Ingrediente no válido' });
    }
  
    try {
      const ingredienteData = JSON.parse(fs.readFileSync(dataPath));
      const ingrediente = ingredienteData.find((a) => a.id === ingredienteId);
  
      if (!ingrediente) {
        return res.status(404).json({ error: 'Animal no encontrado' });
      }
  
      res.json(ingrediente);
    } catch (err) {
      res.status(500).json({ error: 'No se pudo obtener el animal' });
    }
  };
  
  exports.addIngrediente = (req, res) => {
    try {
      const restauranteData = JSON.parse(fs.readFileSync(dataPath));
      const newIngrediente = new Ingrediente(Date.now(), req.body.nombre, req.body.medida, req.body.cantidad);
      restauranteData.push(newIngrediente);
      fs.writeFileSync(dataPath, JSON.stringify(restauranteData, null, 0));
  
      res.json(newIngrediente);
    } catch (err) {
      res.status(500).json({ error: 'No se pudo agregar el animal' });
    }
  };
  
  exports.updateIngrediente = (req, res) => {
    const ingredienteId = parseInt(req.params.id);
  
    if (isNaN(ingredienteId)) {
      return res.status(400).json({ error: 'ID de animal no válido' });
    }
  
    try {
      const restauranteData = JSON.parse(fs.readFileSync(dataPath));
      const index = restauranteData.findIndex((a) => a.id === ingredienteId);
  
      if (index === -1) {
        return res.status(404).json({ error: 'Animal no encontrado' });
      }
  
      const updatedIngrediente = restauranteData[index];
      if (req.body.nombre) {
        updatedIngrediente.nombre = req.body.nombre;
      }
      if (req.body.medida) {
        updatedIngrediente.medida = req.body.medida;
      }
      if (req.body.cantidad) {
        updatedIngrediente.cantidad = req.body.cantidad;
      }
  
      fs.writeFileSync(dataPath, JSON.stringify(restauranteData, null, 2));
  
      res.json(updatedIngrediente);
    } catch (err) {
      res.status(500).json({ error: 'No se pudo actualizar el animal' });
    }
  };
  
  exports.deleteIngrediente = (req, res) => {
    const ingredienteId = parseInt(req.params.id);
  
    if (isNaN(ingredienteId)) {
      return res.status(400).json({ error: 'ID de animal no válido' });
    }
  
    try {
      const restauranteData = JSON.parse(fs.readFileSync(dataPath));
      const index = restauranteData.findIndex((a) => a.id === ingredienteId);
  
      if (index === -1) {
        return res.status(404).json({ error: 'Animal no encontrado' });
      }
  
      restauranteData.splice(index, 1);
      fs.writeFileSync(dataPath, JSON.stringify(restauranteData, null, 2));
  
      res.json({ message: 'Animal eliminado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: 'No se pudo eliminar el animal' });
    }
  };
  