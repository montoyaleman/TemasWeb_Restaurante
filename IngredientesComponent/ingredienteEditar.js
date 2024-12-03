class Ingrediente extends HTMLElement {
	//url de la api
	#urlService = 'http://localhost:3000/api/v1/ingrediente/';

	constructor() {
		super();
	}

	connectedCallback() { 		
        const shadow = this.attachShadow({ mode: "open" });
		this.#agregaEstilo(shadow);	
		this.#render(shadow);
	}		
	
	#agregaEstilo(shadow){
		let link = document.createElement("link");
		link.setAttribute("rel","stylesheet");
		link.setAttribute("href","./IngredientesComponent/css/ingrediente.css");
		shadow.appendChild(link);	
	}

	#render(shadow){
		shadow.innerHTML += `
		<div> <h1>Gestión de Ingredientes</h1> </div>		
		<section class="ingredientes container">			
			<div class="item">
				<div class="input">
					<h2 class="textosDetalles">ID</h2>
					<input type="text" id="txtId">

					<h2 class="textosDetalles">Cantidad</h2>
					<input type="text" id="txtCantidad">
				</div>
				<div class="botones">
					<button type="button" class="button-1" id="btnActualizar" onClick="actualizarIngrediente()">Actualizar</button>
				</div>
			</div>
		</section>
		`;		
	}

	// #consultaIngredientes(shadow){
	// 	fetch(this.#urlService+this.#urlComments)
	// 	//fetch(this.#urlService)
	// 	  .then(response => response.json())
	// 	  .then(ingredientes => {
	// 		let div = shadow.querySelector("#bd");
	// 		let tmp = shadow.querySelector("#tmpIngrediente");
	// 		ingredientes.forEach(c => this.#despliegaIngrediente(tmp,div,c));
	// 	  });	
	// }
}

window.customElements.define('ingrediente-info', Ingrediente);