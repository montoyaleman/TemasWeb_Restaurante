const mongoose = require('mongoose');
const readline = require('readline-sync');

// Definición del schema de usuario
const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true },
    pw: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: Number, required: true }
});

// Modelo de usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

class UsuarioApp {
    constructor() {
        this.connectDB();
        this.menuUsuario();
    }

    async connectDB() {
        try {
            // Define tu URI de MongoDB aquí
            const mongoURI = 'mongodb://localhost:27017/tu_basededatos';
            await mongoose.connect(mongoURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Conectado a MongoDB');
        } catch (err) {
            console.error('Error conectando a MongoDB:', err);
        }
    }

    async menuUsuario() {
        let exit = false;

        while (!exit) {
            console.log("\n--- Menú de Usuarios ---");
            console.log("1. Crear usuario");
            console.log("2. Buscar usuario por ID");
            console.log("3. Actualizar usuario");
            console.log("4. Eliminar usuario");
            console.log("5. Salir");

            const option = readline.question("Seleccione una opción: ");

            switch (option) {
                case "1": await this.crearUsuario(); break;
                case "2": await this.buscarUsuarioPorId(); break;
                case "3": await this.actualizarUsuario(); break;
                case "4": await this.eliminarUsuario(); break;
                case "5":
                    exit = true;
                    await mongoose.connection.close(); // Cerrar conexión al salir
                    break;
                default: console.log("Opción no válida. Por favor, seleccione una opción válida.");
            }
        }
    }

    async crearUsuario() {
        const nuevoUsuario = {
            username: readline.question("Ingrese el nombre de usuario: "),
            pw: readline.question("Ingrese la contraseña: "),
            name: readline.question("Ingrese el nombre completo: "),
            role: parseInt(readline.question("Ingrese el rol (número): "), 10)
        };

        try {
            const usuario = new Usuario(nuevoUsuario);
            await usuario.save();
            console.log('Usuario creado:', usuario);
        } catch (err) {
            console.error('Error al crear usuario:', err);
        }
    }

    async buscarUsuarioPorId() {
        const idBuscar = readline.question("Ingrese el ID del usuario a buscar: ");

        try {
            const usuario = await Usuario.findById(idBuscar);
            if (usuario) {
                console.log('Usuario encontrado:', usuario);
            } else {
                console.log('Usuario no encontrado');
            }
        } catch (err) {
            console.error('Error al buscar usuario:', err);
        }
    }

    async actualizarUsuario() {
        const idActualizar = readline.question("Ingrese el ID del usuario a actualizar: ");
        const usuarioActualizado = {
            username: readline.question("Ingrese el nuevo nombre de usuario: "),
            pw: readline.question("Ingrese la nueva contraseña: "),
            name: readline.question("Ingrese el nuevo nombre completo: "),
            role: parseInt(readline.question("Ingrese el nuevo rol (número): "), 10)
        };

        try {
            const usuario = await Usuario.findByIdAndUpdate(idActualizar, usuarioActualizado, { new: true });
            if (usuario) {
                console.log('Usuario actualizado:', usuario);
            } else {
                console.log('Usuario no encontrado');
            }
        } catch (err) {
            console.error('Error al actualizar usuario:', err);
        }
    }

    async eliminarUsuario() {
        const idEliminar = readline.question("Ingrese el ID del usuario a eliminar: ");

        try {
            const resultado = await Usuario.findByIdAndDelete(idEliminar);
            if (resultado) {
                console.log('Usuario eliminado:', resultado);
            } else {
                console.log('Usuario no encontrado');
            }
        } catch (err) {
            console.error('Error al eliminar usuario:', err);
        }
    }
}

// Exportar la clase y el modelo
module.exports = { Usuario, UsuarioApp };