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
		link.setAttribute("href","./IngredienteComponent/css/ingrediente.css");
	}

	#render(shadow){
		shadow.innerHTML += `
		<section class="ingredientes">
			<h1>Gestión de Ingredientes</h1>
			<div class="input">
				<p class="textosDetalles">ID</p>
				<input type="text" id="txtId">

				<p class="textosDetalles">Nombre</p>
				<input type="text" id="txtNombre">

				<p class="textosDetalles">Medida</p>
				<input type="text" id="txtMedida">

				<p class="textosDetalles">Cantidad</p>
				<input type="text" id="txtCantidad">
			</div>
			<div class="botones">
				<button type="button" id="btnAgregar" onClick="agregarIngrediente()">Agregar</button>
				<button type="button" id="btnActualizar" onClick="actualizarIngrediente()">Actualizar</button>
				<button type="button" id="btnEliminar" onClick="eliminarIngrediente()">Eliminar</button>
				<button type="button" id="btnBuscar" onClick="buscarIngrediente()">Buscar Todos</button>
				<button type="button" id="btnBuscarID" onClick="buscarIngredientePorID()">Buscar por ID</button>
			</div>
			<div id="bd">				
			</div>
			<template id="tmpIngrediente">
				<div class="articuloBd">
					<p><b id="idArticulo"></b> - <b id="nombreArticulo"></b></p>
            		<p><b id="cantidadArticulo"></b> <b id="medidaArticulo"></b></p>
				</div>
			</template>
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
	
	//utilizados para probar que la pagina si puede mostrar los 
	//los datos de la api
	// #consultaComentarios(postId,shadow){
	// 	fetch(this.#urlService+postId+this.#urlComments)
	// 	  .then(response => response.json())
	// 	  .then(comments => {
	// 		let div = shadow.querySelector("#bd");
	// 		let tmp = shadow.querySelector("#tmpIngrediente");
	// 		comments.forEach(c => this.#despliegaComentario(tmp,div,c));
	// 	  });	
	// }
	// #despliegaComentario(tmp,div,comment){
	// 	let clone = tmp.content.cloneNode(true);		 
	// 	let element = clone.querySelector("#idArticulo");
	// 	element.innerHTML=comment.email;
	// 	element = clone.querySelector("#cantidadArticulo");
	// 	element.innerHTML=comment.body;
	// 	div.appendChild(clone);
	// }
}

window.customElements.define('ingrediente-info', Ingrediente);