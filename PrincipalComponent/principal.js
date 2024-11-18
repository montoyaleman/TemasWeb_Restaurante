class Principal extends HTMLElement {
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
		link.setAttribute("href","./PrincipalComponent/css/principal.css");		
		shadow.appendChild(link);	
	}
	#render(shadow){
		shadow.innerHTML += `
			<div class="mensajePrincipal">
				<h1>Bienvenido al Sistema de restaurantes.</h1>
    			<h3>Por favor de escoger un apartado para interactuar con el sistema.</h3>
			</div>			
		`;		
	}
}
window.customElements.define('principal-info', Principal);