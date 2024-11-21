class Pedido extends HTMLElement {
    #urlService = 'http://localhost:3000/api/v1/pedido/';
    #urlUsuarioService ='https://localhost:300/api/v1/pedido';

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.#agregaEstilo(shadow);
        this.#render(shadow);
        this.#consultaPedido(shadow);
        this.#consultaUsuarios(shadow);
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./PedidoComponent/css/pedido.css");
        shadow.appendChild(link);
    }

    #render(shadow) {
        shadow.innerHTML += `
        <div><h1>Gestión de Pedidos</h1></div>
        <section class="container">
            <div class="item">
                <div class="input">
                    <p>Fecha del Pedido</p>
                    <input type="date" id="txtFecha">
                    <p>ID del Usuario</p>
                    <input type="text" id="txtIdUsuario">
                    <p>Mesa</p>
                    <input type="number" id="txtMesa">
                    <p>Orden</p>
                    <input type="text" id="txtOrden">
                    <p>Precio Total</p>
                    <input type="text" id="txtTotal">
                </div>
                <div class="botones">
                    <button type="button" class="boton-1" id="btnCrear" onClick="crearPedido()">Crear </button>
                    <button type="button" class="boton-1" id="btnActualizar" onClick="actualizarPedido()">Actualizar</button>
                    <button type="button" class="boton-1" id="btnEliminar" onClick="eliminarPedido()">Eliminar</button>
                    <button type="button" class="boton-1" id="btnBuscarTodos" onClick="listarPedido()">Buscar Todos</button>
                </div>
            </div>
            <div class="item">
                <div id="bd"></div>
                    <template id="tmpPedido">
                        <div class="articuloBd">
                            <p><b id="idArticulo"></b>
                            <p>Fecha: <span id="fechaArticulo"></span></p>
                            <p>Id de Usuario: <span id="idUsuarioArticulo"></span></p>
                            <p>Mesa: <span id="mesaArticulo"></span></p>
                            <p>Orden: <span id="ordenArticulo"></span></p>
                            <p>Total: <span id="totalArticulo"></span></p>
                        </div>
                     </template>
            </div>
        </section>`;
    }

    #consultaPedido(shadow) {
        fetch(this.#urlService)
            .then(response => response.json())
            .then(pedidos => {
                let div = shadow.querySelector("#bd");
                let tmp = shadow.querySelector("#tmpPedido");
                pedidos.forEach(u => this.#despliegaPedido(tmp, div, u));
            })
            .catch(err => console.error('Error fetching pedidos:', err));
    }

    #consultaUsuarios(shadow) {
        fetch(this.#urlUsuarioService)
            .then(response => response.json())
            .then(ingredientes => {
                let select = shadow.querySelector("#selectUsuarios");
                ingredientes.forEach(usuario => {
                    let option = document.createElement("option");
                    option.value = usuario._id; 
                    option.textContent = `${usuario._id}`; 
                    select.appendChild(option);
                });
            })
            .catch(err => console.error('Error fetching usuarios:', err));
    }

    #despliegaPedido(tmp, div, pedido) {
        let clone = tmp.content.cloneNode(true);
        
        let element = clone.querySelector("#fechaArticulo");
        element.innerHTML = pedido.fecha;

        element = clone.querySelector("#idUsuarioArticulo");
        element.innerHTML = pedido.idUsuario;

        element = clone.querySelector("#mesaArticulo");
        element.innerHTML = pedido.mesa;

        element = clone.querySelector("#ordenArticulo");
        element.innerHTML = pedido.orden;

        element = clone.querySelector("#totalArticulo");
        element.innerHTML = pedido.total;

        div.appendChild(clone);
    }
}

window.customElements.define('pedido-info', Pedido);