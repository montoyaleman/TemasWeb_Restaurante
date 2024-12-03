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
        <div> <h1>Actualizar Pedido</h1> </div>		
		<section class="container">			
			<div class="item">
				<div class="input">
					<h2 class="textosDetalles">ID</h2>
					<input type="text" id="txtId">

					<h2 class="textosDetalles">Fecha</h2>
					<input type="date" id="txtFecha">

					<h2 class="textosDetalles">ID Usuario</h2>
					<input type="text" id="txtIdUsuario">

					<h2 class="textosDetalles">Mesa</h2>
					<input type="text" id="txtMesa">

                    <h2 class="textosDetalles">Orden</h2>
					<input type="text" id="txtOrden">

                    <h2 class="textosDetalles">Total</h2>
					<input type="text" id="txtTotal">
				</div>
				<div class="botones">
					<button type="button" class="button-1" id="btnActualizar" onClick="actualizarPedido()">Actualizar</button>
				</div>
			</div>
		</section>`;
    }

}

window.customElements.define('pedido-info', Pedido);