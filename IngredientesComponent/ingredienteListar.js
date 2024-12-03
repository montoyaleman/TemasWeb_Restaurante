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
		this.#consultaIngredientes(shadow);	
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

					<h2 class="textosDetalles">Nombre</h2>
					<input type="text" id="txtNombre">

					<h2 class="textosDetalles">Medida</h2>
					<input type="text" id="txtMedida">

					<h2 class="textosDetalles">Cantidad</h2>
					<input type="text" id="txtCantidad">
				</div>
				<div class="botones">
					<button type="button" class="button-1" id="btnBuscar" onClick="buscarIngrediente()">Buscar Todos</button>
					<button type="button" class="button-1" id="btnBuscarID" onClick="buscarIngredientePorID()">Buscar por ID</button>
				</div>
			</div>
			<div class="item">
				<div id="bd">				
				</div>
				<template id="tmpIngrediente">
					<div class="articuloBd">
						<p><b id="idArticulo"></b></p>
						<p><b id="nombreArticulo"></b> - <b id="cantidadArticulo"></b> <b id="medidaArticulo"></b></p>
					</div>
				</template>
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

	#consultaIngredientes(shadow){
		fetch(this.#urlService)
		.then(response => {
			console.log('Estado de la respuesta:', response.status);
			if (!response.ok) {
				throw new Error(`Error HTTP: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			console.log('Datos recibidos:', data);
			let div = shadow.querySelector("#bd");
			let tmp = shadow.querySelector("#tmpIngrediente");
			data.forEach(c => this.#despliegaIngrediente(tmp, div, c));
		})
		.catch(error => console.error('Error al obtener ingredientes:', error));
	}

	#despliegaIngrediente(tmp,div,ingrediente){
		let clone = tmp.content.cloneNode(true);		 
		let element = clone.querySelector("#idArticulo");
		element.innerHTML=ingrediente._id;

		element = clone.querySelector("#nombreArticulo");
		element.innerHTML=ingrediente.nombre;

		element = clone.querySelector("#cantidadArticulo");
		element.innerHTML=ingrediente.cantidad;

		element = clone.querySelector("#medidaArticulo");
		element.innerHTML=ingrediente.medida;
		div.appendChild(clone);
	}
}

window.customElements.define('ingrediente-info', Ingrediente);