const readline = require('readline-sync');
const mongoose = require('mongoose');
const Platillo  = require('./Platillo').Platillo;
const Usuario = require('./Usuario').Usuario;


const Schema = mongoose.Schema;

// const ordenSchema = new Schema({
//     idPlatillo: [{type: Schema.Types.ObjectId, ref:'Platillo'}],
//     cantidad: Number,
// }, { _id: false});
const pedidoSchema = new Schema({
    fecha: Date,
    usuario: [{type: Schema.Types.ObjectId, ref:'Usuario'}],
    mesa: Number,
    orden: Array,
    total: Number
});


const Pedido = mongoose.model('Pedido', pedidoSchema);

async function menuPedido(mongoose) {
    let exit = false;

    while (!exit) {
        console.log("\n--- Menú Pedido ---");
        console.log("1. Agregar Pedido");
        console.log("2. Actualizar Pedido");
        console.log("3. Eliminar Pedido");
        console.log("4. Listar Pedidos");
        console.log("5. Salir");

        const option = readline.question("Seleccione una opcion: ");

        switch (option) {
        case "1":        await crearPedido(mongoose);       break;              
        case "2":        await actualizarPedido(mongoose);    break;        
        case "3":        await eliminarPedido(mongoose);       break;
        case "4":        await listarPedido(mongoose);        break;
        case "5":
            exit = true;
            return;
        default:        console.log("Opcion no valida. Por favor, seleccione una opcion valida.");
        }
    }
}


async function crearPedido(mongoose) {
    var fecha = new Date();
    const usuarios = await Usuario.find().exec();

    console.log("\nUsuarios existentes:");
    usuarios.forEach((usuario, index) => {
        console.log(`${index + 1}. ${usuario.id} - ${usuario.nombre} ,`);
    });

    var idUsuario = readline.question("Ingrese el ID de Usuario: ");
    //idUsuario = new mongoose.types.ObjectId(idUsuario); 
    var mesa = readline.question("Ingrese el numero de la Mesa: ");
    var respuesta = "si";
    var ordenes=[];
    while(respuesta==="si"){
        var platillos= await Platillo.find().exec();
        console.log("\nPlatillos:");
        platillos.forEach((platillo, index) => {
            console.log(`${index + 1}. ${platillo.id} - ${platillo.nombre} ,`);
        });

        var idPlatillo= readline.question("Ingrese el ID del Platillo: ");
        platillos = await Platillo.find({_id: new mongoose.Types.ObjectId(idPlatillo)}).exec();
        platillos.get
        var cantidad = readline.question("Ingrese la cantidad del platillo: ");        
        //idPlatillo = new mongoose.types.ObjectId(idPlatillo)
        var orden = {idPlatillo, cantidad}
        ordenes.push(orden)
        
        respuesta = readline.question("Desea agregar otro Platillo? (si/no): ");
    }

    var total = readline.question("Ingrese el total del pedido: ");
    
    const nuevoPedido = new Pedido({
        fecha: fecha,
        idUsuario: idUsuario,
        mesa: mesa,
        orden: ordenes,
        total: parseFloat(total)
    });

    console.log(nuevoPedido)

    try {
        await nuevoPedido.save();
        console.log("Pedido agregado con éxito.");
    } catch (error) {
        console.log("Error al agregar el pedido:", error);
    }
}

async function actualizarPedido(mongoose) {
    
    var id = readline.question("Ingrese el ID del pedido a actualizar: ");
    const pedido = await Pedido.find({_id: new mongoose.Types.ObjectId(id)}).exec();

    if (pedido.length === 0) {
        console.log("No se encontró ningún pedido con ese ID.");
        return;
    }

    var idUsuario = readline.question(`Ingrese el nuevo tipo del platillo (${pedido[0].tipo}): `);
    var mesa = readline.question(`Ingrese la nueva mesa del pedido (${pedido[0].desc}): `);
    var total = readline.question(`Ingrese el nuevo total (${pedido[0].cantidad}): `);
    


    pedido[0].idUsuario = idUsuario || pedido[0].idUsuario;
    pedido[0].mesa = mesa || pedido[0].mesa;
    pedido[0].total = parseInt(total) || pedido[0].total;
    

    try {
        await pedido[0].save();
        console.log("Pedido actualizado con éxito.");
    } catch (error) {
        console.log("Error al actualizar el pedido:", error);
    }
}

async function eliminarPedido(mongoose) {

    var id = readline.question("Ingrese el ID del pedido a actualizar: ");
    const pedido = await Pedido.find({_id: new mongoose.Types.ObjectId(id)}).exec();
    
    if (pedido.length === 0) {
        console.log("No se encontró ningún pedido con ese ID.");
        return;
    }
    try {
        await Pedido.deleteOne({_id: new mongoose.Types.ObjectId(id)});
        console.log("Pedido eliminado con éxito.");
    } catch (error) {
        console.log("Error al eliminar el pedido:", error);
    }
}

async function listarPedido(mongoose) {
    
    const pedidos = await Pedido.find().exec();
    console.log("\nPedidos:");
    pedidos.forEach((platillo, index) => {
        console.log(`${index + 1}. - ID: ${pedido._id} -Fecha: ${pedido.fecha} -Usuario: ${pedido.idUsuario} - Mesa: ${pedido.mesa} -Orden: ${pedido.orden} -Total: ${pedido.total}`);
    });
}
module.exports = {Pedido, menuPedido};
