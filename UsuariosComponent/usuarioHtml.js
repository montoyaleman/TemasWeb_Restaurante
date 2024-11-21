class Usuario extends HTMLElement {
    #urlService = 'http://localhost:3000/api/v1/usuario/';

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.#agregaEstilo(shadow);
        this.#render(shadow);
        this.#consultaUsuarios(shadow);
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", "./UsuariosComponent/css/usuario.css");
        shadow.appendChild(link);
    }

    #render(shadow) {
        shadow.innerHTML = `
        <div><h1>Gestión de Usuarios</h1></div>
        <section class="usuarios container">
            <div class="item">
                <div class="input">
                    <h2 class="textosDetalles">Nombre de usuario</h2>
                    <input type="text" id="txtUsername">

                    <h2 class="textosDetalles">Contraseña</h2>
                    <input type="password" id="txtPassword">

                    <h2 class="textosDetalles">Nombre</h2>
                    <input type="text" id="txtNombre">

                    <h2 class="textosDetalles">Rol</h2>
                    <input type="number" id="txtRol">
                </div>
                <div class="botones">
                    <button type="button" class="button-1" id="btnAgregar">Agregar</button>
                    <button type="button" class="button-1" id="btnActualizar">Actualizar</button>
                    <button type="button" class="button-1" id="btnEliminar">Eliminar</button>
                    <br>
                    <button type="button" class="button-1" id="btnBuscarTodos">Buscar Todos</button>
                    <button type="button" class="button-1" id="btnBuscarID">Buscar por ID</button>
                </div>
            </div>
            <div class="item">
                <div id="bd"></div>
                <template id="tmpUsuario">
                    <div class="articuloBd">
                        <p><b id="usernameArticulo"></b> - <b id="nombreArticulo"></b></p>
                        <p>Rol: <span id="rolArticulo"></span></p>
                    </div>
                </template>
            </div>
        </section>
        `;

        this.#agregarEventListeners(shadow);
    }

    #agregarEventListeners(shadow) {
        shadow.querySelector("#btnAgregar").addEventListener("click", () => agregarUsuario);
        shadow.querySelector("#btnActualizar").addEventListener("click", () => actualizarUsuario);
        shadow.querySelector("#btnEliminar").addEventListener("click", () => eliminarUsuario);
        shadow.querySelector("#btnBuscarTodos").addEventListener("click", () => consultarUsuarios);
        shadow.querySelector("#btnBuscarID").addEventListener("click", () => buscarUsuarioPorId);
    }

    #consultaUsuarios(shadow) {
        fetch(this.#urlService)
            .then(response => response.json())
            .then(usuarios => {
                let div = shadow.querySelector("#bd");
                let tmp = shadow.querySelector("#tmpUsuario");
                usuarios.forEach(u => this.#despliegaUsuario(tmp, div, u));
            })
            .catch(err => console.error('Error fetching usuarios:', err));
    }

    #despliegaUsuario(tmp, div, usuario) {
        let clone = tmp.content.cloneNode(true);
        let element = clone.querySelector("#usernameArticulo");
        element.innerHTML = usuario.username;

        element = clone.querySelector("#nombreArticulo");
        element.innerHTML = usuario.name;

        element = clone.querySelector("#rolArticulo");
        element.innerHTML = usuario.role;

        div.appendChild(clone);
    }
}

window.customElements.define('usuario-info', Usuario);