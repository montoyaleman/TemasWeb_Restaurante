//const fs = require('fs');
//const IngredienteModel = require('../models/ingrediente.js');
//const dataPath = './data/restaurante.json';
const mongoose = require('mongoose');
const Ingrediente = mongoose.model('Ingredientes', {nombre: String, medida: String, cantidad: Number});

//funcion para conectarse a la base de datos de mongodb
async function connectarMongoose(){    
  return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost/restaurante');
      mongoose.connection.on('open', _ => {
          console.log("Se ha conectado a la base de datos.");
          resolve();            
      });
  });
}

// Funciones del controlador
exports.getAllIngredientes = async (req, res) => {
    try {
      await connectarMongoose();
      const restauranteData = await Ingrediente.find().exec(); 
      res.json(restauranteData);
      //mongoose.disconnect();
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'No se pudieron obtener los ingredientes' });
    }
};


exports.getIngredienteById = async (req, res) => {
    const ingredienteId = req.params.id;
    console.log(ingredienteId);  
    try {
      await connectarMongoose();
      const ingredienteData = await Ingrediente.find({_id: ingredienteId}).exec();  
      res.json(ingredienteData);
      //mongoose.disconnect();
    } catch (err) {
      res.status(500).json({ error: 'No se pudo obtener el Ingrediente' });
    }
  };
  
  exports.addIngrediente = async (req, res) => {
    try {
      await connectarMongoose();
      const newIngrediente = new Ingrediente(
      {
        nombre: req.body.nombre, 
        medida: req.body.medida, 
        cantidad: req.body.cantidad
      });
      await newIngrediente.save();
      res.json(newIngrediente);
      //mongoose.disconnect();
    } catch (err) {
      res.status(500).json({ error: 'No se pudo agregar el ingrediente' });
    }
  };
  
  exports.updateIngrediente = async (req, res) => {
    const filter = { _id: req.params.id };
    const update = { cantidad: req.params.cantidad };
    try {
      await connectarMongoose();
      const updatedIngrediente = await Ingrediente.findOneAndUpdate(filter, update, { new: true });
      res.json(updatedIngrediente);
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'No se pudo actualizar el ingrediente' });
    }
  };
  
  exports.deleteIngrediente = async (req, res) => {
    const filter = { _id: req.params.id };
    try {
      await connectarMongoose();
      const ingredienteEliminado = await Ingrediente.findOneAndDelete(filter);
      res.json({ message: 'Ingrediente eliminado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: 'No se pudo eliminar el animal' });
    }
  };
  