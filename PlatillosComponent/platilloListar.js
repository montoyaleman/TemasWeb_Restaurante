class Platillo extends HTMLElement {
    #urlService = 'http://localhost:3000/api/v1/platillo/';
    #urlIngredientService = 'http://localhost:3000/api/v1/ingrediente/';

    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        this.#agregaEstilo(shadow);
        this.#render(shadow);
        this.#consultaPlatillos(shadow);
        this.#consultaIngredientes(shadow);
    }

    #agregaEstilo(shadow) {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./PlatillosComponent/css/platillo.css");
        shadow.appendChild(link);
    }

    #render(shadow) {
        shadow.innerHTML += `
        <div> <h1>Buscar/Listar Platillos</h1> </div>
        <section class="container">
        <div class="item">
            <div class="input">
                <h2 class="textosDetalles">ID</h2>
                <input type="text" id="txtId">
                <h2 class="textosDetalles">Nombre</h2>
                <input type="text" id="txtNombre">
                <h2 class="textosDetalles">Tipo</h2>
                <input type="text" id="txtTipo">
                <h2 class="textosDetalles">Descripción</h2>
                <input type="text" id="txtDescripcion">
                <h2 class="textosDetalles">Cantidad</h2>
                <input type="number" id="txtCantidad">
                <h2 class="textosDetalles">Precio</h2>
                <input type="number" id="txtPrecio">
                <h2 class="textosDetalles">Ingredientes</h2>
                <select id="selectIngredientes" multiple></select>
            </div>
            <div class="botones">
					<button type="button" class="button-1" id="btnBuscarTodos" onClick="consultarPlatillos()">Buscar Todos</button>
					<button type="button" class="button-1" id="btnBuscarID" onClick="buscarPlatilloPorID()">Buscar por ID</button>
            </div>
        </div>
        <div class="item">
            <div id="bd">
            </div>
            <template id="tmpPlatillo">
                <div class="articuloBd">
                    <p><b id="idArticulo"></b></p>
                    <p><b id="nombreArticulo"></b> - <b id="tipoArticulo"></b></p>
                    <p>Descripción: <span id="descripcionArticulo"></span></p>
                    <p>Cantidad: <span id="cantidadArticulo"></span></p>
                    <p>Precio: <span id="precioArticulo"></span></p>
                    <p>Ingredientes: <span id="ingredientesArticulo"></span></p>
                </div>
            </template>
            </div>
        </section>`;


    }
    #consultaPlatillos(shadow){
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
			let tmp = shadow.querySelector("#tmpPlatillo");
			data.forEach(c => this.#despliegaPlatillo(tmp, div, c));
		})
		.catch(error => console.error('Error al obtener Platillos:', error));
	}

    #consultaIngredientes(shadow) {
        fetch(this.#urlIngredientService)
            .then(response => {
                if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
                return response.json();
            })
            .then(ingredientes => {
                let select = shadow.querySelector("#selectIngredientes");
                ingredientes.forEach(ingrediente => {
                    let option = document.createElement("option");
                    option.value = ingrediente._id;
                    option.textContent = `${ingrediente.nombre} (${ingrediente.medida})`;
                    select.appendChild(option);
                });
            })
            .catch(err => console.error('Error fetching ingredientes:', err));
    }

    #despliegaPlatillo(tmp, div, platillo) {
        let clone = tmp.content.cloneNode(true);		 
		let element = clone.querySelector("#idArticulo");
		element.innerHTML=platillo._id;

        element = clone.querySelector("#nombreArticulo");
        element.innerHTML = platillo.nombre;

        element = clone.querySelector("#tipoArticulo");
        element.innerHTML = platillo.tipo;

        element = clone.querySelector("#descripcionArticulo");
        element.innerHTML = platillo.desc;

        element = clone.querySelector("#cantidadArticulo");
        element.innerHTML = platillo.cantidad;

        element = clone.querySelector("#precioArticulo");
        element.innerHTML = platillo.precio;

        element = clone.querySelector("#ingredientesArticulo");
        element.innerHTML = platillo.ingredientes.join(", "); 

        div.appendChild(clone);
    }
}

window.customElements.define('platillo-info', Platillo);