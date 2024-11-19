const mongoose = require('mongoose');
const Platillo = mongoose.model('Platillos', {
  nombre: String,
  tipo: String,
  desc: String,
  cantidad: Number,
  ingredientes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredientes' }],
  precio: Number
});

async function connectarMongoose(){    
  return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost/restaurante');
      mongoose.connection.on('open', _ => {
          console.log("Se ha conectado a la base de datos.");
          resolve();            
      });
  });
}

exports.getAllPlatillos = async (req, res) => {
  try {
    await connectarMongoose();
    const platillosData = await Platillo.find().populate('ingredientes').exec();
    res.status(200).json(platillosData);
    mongoose.disconnect();
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'No se pudieron obtener los platillos' });
  }
};

exports.getPlatilloById = async (req, res) => {
  const platilloId = req.params.id;
  try {
    await connectarMongoose();
    const platilloData = await Platillo.findById(platilloId).populate('ingredientes').exec();
    if (!platilloData) res.status(404).json("No se encontró un platillo con ese ID.");
    else res.status(200).json(platilloData);
    mongoose.disconnect();
  } catch (err) {
    res.status(500).json({ error: 'No se pudo obtener el platillo' });
  }
};

exports.addPlatillo = async (req, res) => {
  if (!req.body.nombre || !req.body.tipo || !req.body.desc || !req.body.cantidad || !req.body.precio) 
    return res.status(400).json("No se insertaron valores correctos para un platillo");
  try {
    await connectarMongoose();
    const newPlatillo = new Platillo({
      nombre: req.body.nombre,
      tipo: req.body.tipo,
      desc: req.body.desc,
      cantidad: req.body.cantidad,
      ingredientes: req.body.ingredientes,
      precio: req.body.precio
    });
    await newPlatillo.save();
    res.status(201).json(newPlatillo);
    mongoose.disconnect();
  } catch (err) {
    res.status(500).json({ error: 'No se pudo agregar el platillo' });
  }
};

exports.updatePlatillo = async (req, res) => {
  const filter = { _id: req.params.id };
  const update = req.body;
  
  try {
    await connectarMongoose();
    const updatedPlatillo = await Platillo.findOneAndUpdate(filter, update, { new: true });
    if (!updatedPlatillo) res.status(404).json("No se encontró un platillo con ese ID.");
    else res.status(200).json(updatedPlatillo);
    mongoose.disconnect();
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'No se pudo actualizar el platillo' });
  }
};

exports.deletePlatillo = async (req, res) => {
  const filter = { _id: req.params.id };
  try {
    await connectarMongoose();
    const platilloEliminado = await Platillo.findOneAndDelete(filter);
    if (!platilloEliminado) res.status(404).json("No se encontró un platillo con ese ID .");
    else res.status(200).json({ message: 'Platillo eliminado exitosamente' });
    mongoose.disconnect();
  } catch (err) {
    res.status(500).json({ error: 'No se pudo eliminar el platillo' });
  }
};