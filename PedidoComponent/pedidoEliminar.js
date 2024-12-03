class Pedido extends HTMLElement {
    #urlService = 'http://localhost:3000/api/v1/pedido/';
    
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.#agregaEstilo(shadow);
        this.#render(shadow);
        this.#consultaPedido(shadow);

    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./PedidoComponent/css/pedido.css");
        shadow.appendChild(link);
    }

    #render(shadow) {
        shadow.innerHTML += `
        <div> <h1>Gestión de Pedido</h1> </div>		
		<section class="container">			
			<div class="item">
				<div class="input">
					<h2 class="textosDetalles">ID</h2>
					<input type="text" id="txtId">
				</div>
				<div class="botones">
					<button type="button" class="button-1" id="btnEliminar" onClick="eliminarPedido()">Eliminar</button>
				</div>
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

    #despliegaPedido(tmp, div, pedido) {
        let clone = tmp.content.cloneNode(true);

        let element = clone.querySelector("#idArticulo");
        element.innerHTML = pedido._id;
        
        element = clone.querySelector("#fechaArticulo");
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