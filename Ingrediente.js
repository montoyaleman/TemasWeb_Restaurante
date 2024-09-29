const readline = require('readline-sync');
const mongoose = require('mongoose');

//se obtiene el schema actual de la bd
const Schema = mongoose.Schema;

const ingredienteSchema = new Schema({
    nombre: String,
    medida: String,
    cantidad: Number
});
//se hace la variable para obtener el estado actual de la tabla de ingredientes
const Ingrediente = mongoose.model('Ingrediente', ingredienteSchema);


//menu para las opciones relacionadas con el manejo de ingredientes
async function menuIngrediente(mongoose) {
    let exit = false;

    while (!exit) {
        console.log("\n--- Menú Principal ---");
        console.log("1. Agregar ingrediente");
        console.log("2. Actualizar ingrediente");
        console.log("3. Eliminar ingrediente");
        console.log("4. Listar ingredientes");
        console.log("5. Listar ingrediente Por ID");
        console.log("6. Salir");

        const option = readline.question("Seleccione una opcion: ");

        switch (option) {
        case "1":        await agregarIngredientes(mongoose);       break;              
        case "2":        await actualizarIngredientes(mongoose);    break;        
        case "3":        await eliminarIngrediente(mongoose);       break;
        case "4":        await listarIngredientes(mongoose);        break;
        case "5":        await listarIngredientePorID(mongoose);    break;
        case "6":
            exit = true;
            return;
        default:        console.log("Opcion no valida. Por favor, seleccione una opcion valida.");
        }
    }
}


//funcion utilizada para agregar ingredientes nuevos a la bd
async function agregarIngredientes(mongoose) {
    //se pregunta los datos necesarios para agregar un ingrediente
    var nombreIngrediente = readline.question("Inserte el nombre del ingrediente: ");
    var medidaIngrediente = readline.question("Inserte con qué se mide el ingrediente: ");
    var cantidadIngrediente = readline.question("Inserte la cantidad que actualmente hay del ingrediente: ");

    //se ponen todos los datos insertados en una variable
    const nuevoIngrediente = new Ingrediente({
        nombre: nombreIngrediente,
        medida: medidaIngrediente,
        cantidad: cantidadIngrediente
    });
    //y se insertan a la bd propio
    await nuevoIngrediente.save()
        .then(() => console.log('Ingrediente agregado exitosamente.'))
        .catch(err => console.error(err));
}

async function actualizarIngredientes(mongoose) {
    var nombreIngrediente = readline.question("Inserte el nombre del ingrediente que quiere actualizar: ");
    var cantidadIngrediente = readline.question("Inserte la nueva cantidad: ");

    const filter = { nombre: nombreIngrediente };
    const update = { cantidad: cantidadIngrediente };

    //en caso de el doc regrese falso o null, significa que no se encontro
    //el ingrediente que se inserto, o la cantidad no es valida
    const doc = await Ingrediente.findOneAndUpdate(filter, update, { new: true });
    if (doc)
        console.log("Ingrediente actualizado con éxito.");
    else
        console.log("Error al actualizar el ingrediente.");
}

async function eliminarIngrediente(mongoose) {
    var nombreIngrediente = readline.question("Inserte el nombre del ingrediente que quiere eliminar: ");

    const filter = { nombre: nombreIngrediente };
    doc = await Ingrediente.findOneAndDelete(filter);
    if (doc == null) console.log("Hubo un error al eliminar el ingrediente.")
        else console.log("Ingrediente Eliminado con exito.")
}

async function listarIngredientes(mongoose) {
    const ingredientes = await Ingrediente.find().exec();

    console.log("\n--- Lista de Ingredientes ---");
    ingredientes.forEach((ingrediente) => {        
        console.log(`${ingrediente._id} - ${ingrediente.nombre} (${ingrediente.medida}): ${ingrediente.cantidad}`);
    });
}

async function listarIngredientePorID(mongoose) {
    var idIngrediente = readline.question("Inserte el ID del ingrediente que quiere buscar: ");
    const ingredientes = await Ingrediente.find({_id: idIngrediente}).exec();

    console.log("\n--- Lista de Ingredientes ---");
    ingredientes.forEach((ingrediente) => {        
        console.log(`${ingrediente._id} - ${ingrediente.nombre} (${ingrediente.medida}): ${ingrediente.cantidad}`);
    });
}

module.exports = {menuIngrediente};