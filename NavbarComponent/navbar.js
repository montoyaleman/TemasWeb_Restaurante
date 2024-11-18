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
					<a href="#" class="logo">Restaurante</a>
					<a href="#">Ingredientes</a>
					<a href="#">Platillos</a>
					<a href="#">Pedidos</a>
					<a href="#">Usuarios</a>
				</div>
			</nav>	
		`;		
	}
}
window.customElements.define('navbar-info', Navbar);