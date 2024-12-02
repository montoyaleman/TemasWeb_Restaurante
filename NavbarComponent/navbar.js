class Navbar extends HTMLElement {
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
		link.setAttribute("href","./NavbarComponent/css/navbar.css");		
		shadow.appendChild(link);	
	}

	#render(shadow){
		shadow.innerHTML += `
			<nav>
				<div class="nav-left">
					<a href="index.html" class="logo">Restaurante</a>
					<a href="ingredientes.html">Ingredientes</a>
					<a href="platillosHub.html">Platillos</a>
					<a href="pedido.html">Pedidos</a>
					<a href="usuariosHub.html">Usuarios</a>
				</div>
			</nav>	
		`;		
	}
}
window.customElements.define('navbar-info', Navbar);
