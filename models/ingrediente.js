const mongoose = require('mongoose');
//modelo para la tabla de ingrediente de mongodb
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

//obtener todos los ingredientes de la base de datos
exports.getAllIngredientes = async (req, res) => {
    try {
      //esperamos que mongoose que conecte a la base de datos antes de hacer cualquier cosa
      await connectarMongoose();
      //obtenemos todos los ingredientes actualmente presentes
      const restauranteData = await Ingrediente.find().exec(); 
      //mandamos como respuesta el codigo 200 y los ingredientes presentes
      res.status(200).json(restauranteData);
      mongoose.disconnect();
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'No se pudieron obtener los ingredientes' });
    }
};

//obtener un ingrediente basado en un id
exports.getIngredienteById = async (req, res) => {
    //obtenemos el id insertado por el cliente
    const ingredienteId = req.params.id;
    try {
      await connectarMongoose();
      //buscamos si hay un ingrediente con el ID insertado
      const ingredienteData = await Ingrediente.find({_id: ingredienteId}).exec();
      //en el caso de que el id no existe en la bd, se regresa un valor vacio
      //si es valor vacio, le decimos al cliente que no existe nada con ese id
      //voy a asumir que sabes que significa el codigo http 404
      if (!ingredienteData) res.status(404).json("No se encontro un ingrediente con ese ID.");
      //caso contrario, codigo 200 y mandamos los datos del ingrediente
      else res.status(200).json(ingredienteData);
      mongoose.disconnect();
    } catch (err) {
      res.status(500).json({ error: 'No se pudo obtener el Ingrediente' });
    }
};

//agregar ingredientes
exports.addIngrediente = async (req, res) => {
    //en caso de que los datos mandados por el cliente no tienen los
    //datos exactos que necesitamos para agregar un ingrediente, se
    //cancela la insercion
    if (!req.body.nombre || !req.body.medida || !req.body.cantidad) 
      return res.status(400).json("No se inserto valores correctos para un ingrediente");
    try {
      await connectarMongoose();
      //hacemos una variable con los datos
      const newIngrediente = new Ingrediente({
        nombre: req.body.nombre, 
        medida: req.body.medida, 
        cantidad: req.body.cantidad
      });
      //la guardamos
      await newIngrediente.save();
      //codigo 201 siginifica que se guardo con exito, y mandamos
      //los datos del nuevo ingrediente
      res.status(201).json(newIngrediente);
      mongoose.disconnect();
    } catch (err) {
      res.status(500).json({ error: 'No se pudo agregar el ingrediente' });
    }
};
//actualizar ingredientes
exports.updateIngrediente = async (req, res) => {
    //en caso que la cantidad insertada por el cliente no es
    //un numero integer, se cancela la operacion
    if (isNaN(parseInt(req.params.cantidad))) 
      return res.status(400).json("Cantidad insertada no valido");
    const filter = { _id: req.params.id };
    const update = { cantidad: req.params.cantidad };
    try {
      await connectarMongoose();
      const updatedIngrediente = await Ingrediente.findOneAndUpdate(filter, update, { new: true });
      if (!updatedIngrediente) res.status(404).json("No se encontro un ingrediente con ese ID.");
      else res.status(200).json(updatedIngrediente);
      mongoose.disconnect();
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'No se pudo actualizar el ingrediente' });
    }
  };

//eliminar ingrediente
exports.deleteIngrediente = async (req, res) => {
    const filter = { _id: req.params.id };
    try {
      await connectarMongoose();
      const ingredienteEliminado = await Ingrediente.findOneAndDelete(filter);
      if (!ingredienteEliminado) res.status(404).json("No se encontro un ingrediente con ese ID.");
      else res.status(200).json({ message: 'Ingrediente eliminado exitosamente' });
      mongoose.disconnect();
    } catch (err) {
      res.status(500).json({ error: 'No se pudo eliminar el ingrediente' });
    }
  };
  