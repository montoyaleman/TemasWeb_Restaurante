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
        <section class="platillos">
            <h1>Gestión de Platillos</h1>
            <div class="input">
                <p>Nombre</p>
                <input type="text" id="txtNombre">
                <p>Tipo</p>
                <input type="text" id="txtTipo">
                <p>Descripción</p>
                <input type="text" id="txtDescripcion">
                <p>Cantidad</p>
                <input type="number" id="txtCantidad">
                <p>Precio</p>
                <input type="number" id="txtPrecio">
                <p>Ingredientes</p>
                <select id="selectIngredientes" multiple></select>
            </div>
            <div class="botones">
                <button id="btnAgregar">Agregar</button>
                <button id="btnActualizar">Actualizar</button>
                <button id="btnEliminar">Eliminar</button>
                <button id="btnBuscarTodos">Buscar Todos</button>
                <button id="btnBuscarID">Buscar por ID</button>
            </div>
            <div id="bd"></div>
            <template id="tmpPlatillo">
                <div class="articuloBd">
                    <p><b id="nombreArticulo"></b> - <b id="tipoArticulo"></b></p>
                    <p>Descripción: <span id="descripcionArticulo"></span></p>
                    <p>Cantidad: <span id="cantidadArticulo"></span></p>
                    <p>Precio: <span id="precioArticulo"></span></p>
                    <p>Ingredientes: <span id="ingredientesArticulo"></span></p>
                </div>
            </template>
        </section>`;

        
        shadow.querySelector("#btnAgregar").addEventListener("click", () => this.#agregarPlatillo(shadow));
    }

    #consultaPlatillos(shadow) {
        fetch(this.#urlService)
            .then(response => response.json())
            .then(platillos => {
                let div = shadow.querySelector("#bd");
                let tmp = shadow.query .querySelector("#tmpPlatillo");
                platillos.forEach(p => this.#despliegaPlatillo(tmp, div, p));
            })
            .catch(err => console.error('Error fetching platillos:', err));
    }

    #consultaIngredientes(shadow) {
        fetch(this.#urlIngredientService)
            .then(response => response.json())
            .then(ingredientes => {
                let select = shadow.querySelector("#selectIngredientes");
                ingredientes.forEach(ingrediente => {
                    let option = document.createElement("option");
                    option.value = ingrediente._id; // ID del ingrediente
                    option.textContent = `${ingrediente.nombre} (${ingrediente.medida})`; // Nombre y medida del ingrediente
                    select.appendChild(option);
                });
            })
            .catch(err => console.error('Error fetching ingredientes:', err));
    }

    #despliegaPlatillo(tmp, div, platillo) {
        let clone = tmp.content.cloneNode(true);
        let element = clone.querySelector("#nombreArticulo");
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

    #agregarPlatillo(shadow) {
        const nombre = shadow.querySelector("#txtNombre").value;
        const tipo = shadow.querySelector("#txtTipo").value;
        const descripcion = shadow.querySelector("#txtDescripcion").value;
        const cantidad = shadow.querySelector("#txtCantidad").value;
        const precio = shadow.querySelector("#txtPrecio").value;
        const select = shadow.querySelector("#selectIngredientes");
        const ingredientes = Array.from(select.selectedOptions).map(option => option.value);

        const nuevoPlatillo = {
            nombre,
            tipo,
            desc: descripcion,
            cantidad: parseInt(cantidad),
            precio: parseFloat(precio),
            ingredientes
        };

        fetch(this.#urlService, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoPlatillo)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Platillo agregado:', data);
            this.#consultaPlatillos(shadow);
        })
        .catch(err => console.error('Error agregando platillo:', err));
    }
}

window.customElements.define('platillo-info', Platillo);