// Esta es una copia de la clase usuarioController 
// que tiene todos los comandos necesarios para correr
// sin depender en la archivos hechos en el avance anterior

// Importar Mongoose
const mongoose = require('mongoose');

// Conectar a MongoDB
async function connectarMongoose() {    
  return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost/restaurante', { useNewUrlParser: true, useUnifiedTopology: true });
      mongoose.connection.on('open', () => {
          console.log("Conectado a la base de datos.");
          resolve();            
      });
      mongoose.connection.on('error', (err) => {
          console.log('Error al conectar a la base de datos:', err);
          reject(err);
      });
  });
}

// Definición del esquema y modelo de usuario
const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true },
    pw: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: Number, required: true }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Controlador de Usuario
// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
    try {
      await connectarMongoose();
      const usuariosData = await Usuario.find().exec();
      res.status(200).json(usuariosData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'No se pudieron obtener los usuarios' });
    }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
    const usuarioId = req.params.id;
    try {
      await connectarMongoose();
      const usuarioData = await Usuario.findById(usuarioId).exec();
      if (!usuarioData) res.status(404).json("No se encontró un usuario con ese ID.");
      else res.status(200).json(usuarioData);
    } catch (err) {
      res.status(500).json({ error: 'No se pudo obtener el usuario' });
    }
};

// Agregar un usuario
exports.addUsuario = async (req, res) => {
    if (!req.body.username || !req.body.pw || !req.body.name || typeof req.body.role !== 'number') 
      return res.status(400).json("No se proporcionaron todos los valores requeridos para crear un usuario");

    try {
      await connectarMongoose();
      const newUsuario = new Usuario({
        username: req.body.username, 
        pw: req.body.pw, 
        name: req.body.name, 
        role: req.body.role
      });
      await newUsuario.save();
      res.status(201).json(newUsuario);
    } catch (err) {
      res.status(500).json({ error: 'No se pudo agregar el usuario' });
    }
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
    const usuarioId = req.params.id;
    const update = {
      username: req.body.username,
      pw: req.body.pw,
      name: req.body.name,
      role: req.body.role
    };

    try {
      await connectarMongoose();
      const updatedUsuario = await Usuario.findByIdAndUpdate(usuarioId, update, { new: true });
      if (!updatedUsuario) res.status(404).json("No se encontró un usuario con ese ID.");
      else res.status(200).json(updatedUsuario);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'No se pudo actualizar el usuario' });
    }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
    const usuarioId = req.params.id;
    try {
      await connectarMongoose();
      const usuarioEliminado = await Usuario.findByIdAndDelete(usuarioId);
      if (!usuarioEliminado) res.status(404).json("No se encontró un usuario con ese ID.");
      else res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: 'No se pudo eliminar el usuario' });
    }
};