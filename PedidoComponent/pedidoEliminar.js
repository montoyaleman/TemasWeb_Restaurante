class Pedido extends HTMLElement {
    #urlService = 'http://localhost:3000/api/v1/pedido/';
    
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.#agregaEstilo(shadow);
        this.#render(shadow);

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

}

window.customElements.define('pedido-info', Pedido);