const readline = require('readline-sync');
const mongoose = require('mongoose');
const Ingrediente = require('./Ingrediente').Ingrediente;


const Schema = mongoose.Schema;

const platilloSchema = new Schema({
    nombre: String,
    tipo: String,
    desc: String,
    cantidad: Number,
    ingredientes:[{ type: Schema.Types.ObjectId, ref: 'Ingrediente' }],
    precio: Number
});

const Platillo = mongoose.model('Platillo', platilloSchema);

async function menuPlatillo(mongoose) {
    let exit = false;

    while (!exit) {
        console.log("\n--- Menú Principal ---");
        console.log("1. Agregar platillo");
        console.log("2. Actualizar platillo");
        console.log("3. Eliminar platillo");
        console.log("4. Listar platillos");
        console.log("5. Listar platillo Por ID");
        console.log("6. Salir");

        const option = readline.question("Seleccione una opcion: ");

        switch (option) {
        case "1":        await agregarPlatillos(mongoose);       break;              
        case "2":        await actualizarPlatillos(mongoose);    break;        
        case "3":        await eliminarPlatillos(mongoose);       break;
        case "4":        await listarPlatillos(mongoose);        break;
        case "5":        await listarPlatilloPorID(mongoose);    break;
        case "6":
            exit = true;
            return;
        default:        console.log("Opcion no valida. Por favor, seleccione una opcion valida.");
        }
    }
}


async function agregarPlatillos(mongoose) {
    
    const ingrediente = await Ingrediente.find().exec();
    console.log("\nIngredientes existentes:");
    ingrediente.forEach((ingrediente, index) => {
        console.log(`${index + 1}. ${ingrediente.nombre}`);
    });

    var ingredientesSeleccionados = [];

    while (true) {
        const opcion = readline.question("Seleccione un ingrediente (o 's' para salir): ");
        if (opcion.toLowerCase() === 's') {
            break;
        }
        const ingredienteIndex = parseInt(opcion) - 1;
        if (ingredienteIndex >= 0 && ingredienteIndex < ingrediente.length) {
            ingredientesSeleccionados.push(ingrediente[ingredienteIndex]._id);
            console.log("Ingrediente seleccionado.");
        } else {
            console.log("Opción no válida. Por favor, seleccione un ingrediente válido.");
        }
    }

    var nombre = readline.question("Ingrese el nombre del platillo: ");
    var tipo = readline.question("Ingrese el tipo del platillo: ");
    var desc = readline.question("Ingrese la descripción del platillo: ");
    var cantidad = readline.question("Ingrese la cantidad del platillo: ");
    var precio = readline.question("Ingrese el precio del platillo: ");
    
    const platillo = new Platillo({
        nombre,
        tipo,
        desc,
        cantidad: parseInt(cantidad),
        ingredientes: ingredientesSeleccionados,
        precio: parseFloat(precio)
    });

    try {
        await platillo.save();
        console.log("Platillo agregado con éxito.");
    } catch (error) {
        console.log("Error al agregar el platillo:", error);
    }
}

async function actualizarPlatillos(mongoose) {
    
    var id = readline.question("Ingrese el ID del platillo a actualizar: ");
    const platillo = await Platillo.find({_id: new mongoose.Types.ObjectId(id)}).exec();

    if (platillo.length === 0) {
        console.log("No se encontró ningún platillo con ese ID.");
        return;
    }

    var nombre = readline.question(`Ingrese el nuevo nombre del platillo (${platillo[0].nombre}): `);
    var tipo = readline.question(`Ingrese el nuevo tipo del platillo (${platillo[0].tipo}): `);
    var desc = readline.question(`Ingrese la nueva descripción del platillo (${platillo[0].desc}): `);
    var cantidad = readline.question(`Ingrese la nueva cantidad del platillo (${platillo[0].cantidad}): `);
    var precio = readline.question(`Ingrese el nuevo precio del platillo (${platillo[0].precio}): `);

    const ingrediente = await Ingrediente.find().exec();
    console.log("\nIngredientes existentes:");
    ingrediente.forEach((ingrediente, index) => {
        console.log(`${index + 1}. ${ingrediente.nombre}`);
    });
    const ingredientesSeleccionados = [];
    while (true) {
        const opcion = readline.question("Seleccione un ingrediente (o 's' para salir): ");
        if (opcion.toLowerCase() === 's') {
            break;
        }
        const ingredienteIndex = parseInt(opcion) - 1;
        if (ingredienteIndex >= 0 && ingredienteIndex < ingrediente.length) {
            ingredientesSeleccionados.push(ingrediente[ingredienteIndex]._id);
        } else {
            console.log("Opción no válida. Por favor, seleccione un ingrediente válido.");
        }
    }

    platillo[0].nombre = nombre || platillo[0].nombre;
    platillo[0].tipo = tipo || platillo[0].tipo;
    platillo[0].desc = desc || platillo[0].desc;
    platillo[0].cantidad = parseInt(cantidad) || platillo[0].cantidad;
    platillo[0].precio = parseFloat(precio) || platillo[0].precio;
    platillo[0].ingredientes = ingredientesSeleccionados;

    try {
        await platillo[0].save();
        console.log("Platillo actualizado con éxito.");
    } catch (error) {
        console.log("Error al actualizar el platillo:", error);
    }
}

async function eliminarPlatillos(mongoose) {
    
    var id = readline.question("Ingrese el ID del platillo a eliminar: ");
    const platillo = await Platillo.find({_id: new mongoose.Types.ObjectId(id)}).exec();

    if (platillo.length === 0) {
        console.log("No se encontró ningún platillo con ese ID.");
        return;
    }
    try {
        await Platillo.deleteOne({_id: new mongoose.Types.ObjectId(id)});
        console.log("Platillo eliminado con éxito.");
    } catch (error) {
        console.log("Error al eliminar el platillo:", error);
    }
}

async function listarPlatillos(mongoose) {
    
    const platillos = await Platillo.find().exec();
    console.log("\nPlatillos:");
    platillos.forEach((platillo, index) => {
        console.log(`${index + 1}. - ID: ${platillo._id} -Nombre: ${platillo.nombre} -Tipo:${platillo.tipo} - Precio: ${platillo.precio}`);
    });
}

async function listarPlatilloPorID(mongoose) {
    var id = readline.question("Ingrese el ID del platillo a mostrar: ");
    const platillo = await Platillo.find({_id: new mongoose.Types.ObjectId(id)}).exec();

    if (platillo.length === 0) {
        console.log("No se encontró ningún platillo con ese ID.");
        return;
    }

    console.log("\nPlatillo:");
    console.log(`Nombre: ${platillo[0].nombre}`);
    console.log(`Tipo: ${platillo[0].tipo}`);
    console.log(`Descripción: ${platillo[0].desc}`);
    console.log(`Cantidad: ${platillo[0].cantidad}`);
    console.log(`Precio: ${platillo[0].precio}`);
    console.log("Ingredientes:");

    const ingrdits = await Ingrediente.find({_id: {$in: platillo[0].ingredientes}}).exec();
    ingrdits.forEach((ingrediente, index) => {
        console.log(`${index + 1}. ${ingrediente.nombre}`);
    });
}

module.exports = {Platillo, menuPlatillo};


