const mongoose = require('mongoose');
const Pedido = mongoose.model('Pedidos', {fecha: Date, idUsuario: {type: Schema.Types.ObjectId, ref:'Usuario'}, mesa:Number, orden:Array,total: Number});

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
exports.listarPedidos = async (req, res) => {
    try {
      await connectarMongoose();
      const restauranteData = IngredienteModel.listarPedidos(mongoose);
      res.status(200).json(restauranteData);
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'No se pudieron obtener los Pedidos' });
    }
};

  exports.crearPedido = async (req, res) => {
    if (!req.body.fecha || !req.body.idUsuario || !req.body.mesa || !req.body.orden || !req.body.total)
      return res.status(400).json("No se inserto valores correctos para un pedido");
    try {
      await connectarMongoose();
      const newPedido = new Pedido({
        fecha: req.body.fecha, 
        idUsuario: req.body.idUsuario, 
        mesa: req.body.mesa,
        orden: req.body.orden,
        total: req.body.total
      });
      await newPedido.save();
      res.status(201).json(newPedido);
      //mongoose.disconnect();
    } catch (err) {
      res.status(500).json({ error: 'No se pudo agregar el pedido' });
    }
  };
  
  exports.actualizarPedido = async (req, res) => {
    if (isNaN(parseInt(req.params.mesa))) 
      return res.status(400).json("Mesa insertada no valida");
    if(isvalid(req.params,idUsuario))
        return res.status(400).json("El usuario no es valido")
    if(isNaN(parseFloat(req.params.total)))
        return res.status(400).json("El total ingresado no es valido")
    const filter = { _id: req.params.id };
    const updateMesa = { mesa: req.params.mesa };
    const updateIdUsuario={ idUsuario: req.params.mesa}
    const updateTotal={total: req.params.mesa}
    
    try {
      await connectarMongoose();
      const updatedPedidoMesa = await Ingrediente.findOneAndUpdate(filter, updateMesa, { new: true });
      const updatedPedidoUsuario = await Ingrediente.findOneAndUpdate(filter, updateIdUsuario, { new: true });
      const updatedPedidoTotal = await Ingrediente.findOneAndUpdate(filter, updateTotal, { new: true });
      if (!updatedPedidoMesa || !updatedPedidoUsuario ||! updatedPedidoTotal) res.status(404).json("No se encontro un Pedido con ese ID.");
      else res.status(200).json(updatedIngrediente);
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'No se pudo actualizar el Pedido' });
    }
  };
  
  exports.eliminarIngrediente = async (req, res) => {
    const filter = { _id: req.params.id };
    try {
      await connectarMongoose();
      const pedidoEliminado = await Pedido.findOneAndDelete(filter);
      if (!pedidoEliminado) res.status(404).json("No se encontro un pedido con ese ID.");
      else res.status(200).json({ message: 'Pedido eliminado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: 'No se pudo eliminar el pedido' });
    }
  };
  