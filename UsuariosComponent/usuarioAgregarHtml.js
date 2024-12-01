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
        shadow.innerHTML += `
        <div><h1>Agregar Usuarios</h1></div>
        <section class="container">            
            <div class="item">
                <div class="input">
                    <h2>ID</h2>
                    <input type="text" id="txtId">
                    <h2>Nombre de usuario</h2>
                    <input type="text" id="txtUsername">
                    <h2>Contraseña</h2>
                    <input type="password" id="txtPassword">
                    <h2>Nombre</h2>
                    <input type="text" id="txtNombre">
                    <h2>Rol</h2>
                    <input type="number" id="txtRol">
                </div>
                    <div class="botones">
                        <button type="button" class="button-1" id="btnAgregar" onClick="agregarUsuario()">Agregar</button>
                    </div>
                </div>
            </div>
        </section>`;
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
        let element = clone.querySelector("#idArticulo");
        element.innerHTML = usuario._id;

        element = clone.querySelector("#usernameArticulo");
        element.innerHTML = usuario.username;

        element = clone.querySelector("#nombreArticulo");
        element.innerHTML = usuario.name;

        element = clone.querySelector("#rolArticulo");
        element.innerHTML = usuario.role;

        div.appendChild(clone);
    }
}

window.customElements.define('usuario-info', Usuario);