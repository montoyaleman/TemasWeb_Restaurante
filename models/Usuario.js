const mongoose = require('mongoose');

// Definición del schema de usuario
const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true },
    pw: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: Number, required: true }
});

// Modelo de usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);


// Conectar a la base de datos
async function connectarMongoose(){    
  return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost/restaurante');
      mongoose.connection.on('open', _ => {
          console.log("Conectado a la base de datos.");
          resolve();            
      });
  });
}

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
    try {
      await connectarMongoose();
      const usuariosData = await Usuario.find().exec(); 
      res.status(200).json(usuariosData);
    } catch (err) {
      console.log(err)
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
      console.log(err);
      res.status(500).json({ error: 'No se pudo obtener el usuario' });
    }
};

// Agregar un usuario
exports.addUsuario = async (req, res) => {
    const { username, pw, name, role } = req.body;
    if (!username || !pw || !name || !role) 
      return res.status(400).json("Valores insuficientes para crear un usuario");
    try {
      await connectarMongoose();
      const newUsuario = new Usuario({ username, pw, name, role });
      await newUsuario.save();
      res.status(201).json(newUsuario);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'No se pudo agregar el usuario' });
    }
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
    const usuarioId = req.params.id;
    const { username, pw, name, role } = req.body;

    try {
      await connectarMongoose();
      const updatedUsuario = await Usuario.findByIdAndUpdate(
        usuarioId, 
        { username, pw, name, role }, 
        { new: true }
      );
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
      console.log(err);
      res.status(500).json({ error: 'No se pudo eliminar el usuario' });
    }
};

