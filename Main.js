//modulos necesarios para el programa
//incluye las otras clases de este mismo programa
const readline = require('readline-sync');
const mongoose = require('mongoose');
const pedidos = require('./Pedido')
const ingredientes = require('./Ingrediente')
const platillos =  require('./Platillo')
const usuarios = require('./Usuario')


//menu principal donde se van a acceder todos los menus
async function mainMenu() {
    //boolean utilizado para el menu principal
    let exit = false;

    while (!exit) {
        //se muestra las opciones
        console.log("\n--- Menú Principal ---");
        console.log("1. Menu ingrediente");
        console.log("2. Menu Platillo");
        console.log("3. Menu Pedido");
        console.log("4. Menu Usuario");
        console.log("5. Salir");

        //se pregunta al usuario que tipo de menu quiere acceder
        const option = readline.question("Seleccione una opcion: ");

        switch (option) {
        case "1":        await ingredientes.menuIngrediente(mongoose);      break;              
        case "2":        await platillos.menuPlatillo(mongoose);            break;        
        case "3":        await pedidos.menuPedido(mongoose);               break;
        case "4":        await usuarios.menuUsuario(mongoose);              break;
        //en caso de escoger 6, se cierra el programa
        case "5":
            exit = true;
            //tambien se cierra la conexion con la bd
            mongoose.disconnect()
            console.log("Saliendo del sistema...");
            break;
        default:        console.log("Opcion no valida. Por favor, seleccione una opcion valida.");
    }
  }
}

connectarMongoose();
mainMenu();

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
module.exports = {mongoose}