class Ingrediente extends HTMLElement {
	//api de prueba
	//#urlService = 'https://jsonplaceholder.typicode.com/posts/';
	//#urlComments = '/comments/';

	//#urlService = 'http://localhost:3000/api/v1';
	//#urlComments = '/ingrediente/';
	#urlService = 'http://localhost:3000/api/v1/ingrediente/';

	constructor() {
		super();
	}

	connectedCallback() { 		
        const shadow = this.attachShadow({ mode: "open" });
		this.#agregaEstilo(shadow);	
		this.#render(shadow);
		this.#consultaIngredientes(shadow);

		//utilizando api para demostrar que si
		//se muestran los datos
		//this.#consultaComentarios(2,shadow);		
	}		
	
	#agregaEstilo(shadow){
		let link = document.createElement("link");
		link.setAttribute("rel","stylesheet");
		link.setAttribute("href","./IngredienteComponent/css/ingrediente.css");		
		shadow.appendChild(link);	
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
				<button type="button" id="btnAgregar">Agregar</button>
				<button type="button" id="btnActualizar">Actualizar</button>
				<button type="button" id="btnEliminar">Eliminar</button>
				<button type="button" id="btnBuscar">Buscar Todos</button>
				<button type="button" id="btnBuscarID">Buscar por ID</button>
			</div>
			<div id="bd">				
			</div>
			<template id="tmpIngrediente">
				<div class="articuloBd">
					<p><b id="idArticulo"></b> - <b id="nombreArticulo"></b></p>
            		<p><p id="cantidadArticulo"></p> <p id="medidaArticulo"></p></p>
				</div>
			</template>
		</section>
		`;		
	}

	#consultaIngredientes(shadow){
		//fetch(this.#urlService+this.#urlComments)
		fetch(this.#urlService)
		  .then(response => response.json())
		  .then(ingredientes => {
			let div = shadow.querySelector("#bd");
			let tmp = shadow.querySelector("#tmpIngrediente");
			ingredientes.forEach(c => this.#despliegaIngrediente(tmp,div,c));
		  });	
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