const urlService = 'http://localhost:3000/api/v1/ingrediente/';
const ingredienteInfo = document.querySelector('ingrediente-info');
const txtId = ingredienteInfo.shadowRoot.querySelector('#txtId');
const txtNombre = ingredienteInfo.shadowRoot.querySelector('#txtNombre');
const txtMedida = ingredienteInfo.shadowRoot.querySelector('#txtMedida');
const txtCantidad = ingredienteInfo.shadowRoot.querySelector('#txtCantidad');

function eliminarIngrediente(){
    const id = txtId.value.trim();
    if (!id) {
        alert('Por favor, inserte un ID para eliminar.');
        return;
    }

    const result = confirm(`¿Estás seguro de borrar el ingrediente con ID ${id}?`);
    if (result) {
        fetch(`http://localhost:3000/api/v1/ingrediente/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(`Ingrediente con ID ${id} eliminado correctamente.`);
            // ingredienteInfo.shadowRoot.querySelector("#bd").innerHTML = '';
            // ingredienteInfo.connectedCallback();
            location.reload();
        })
        .catch(error => {
            console.error('Error al eliminar el ingrediente:', error);
            alert('Ocurrió un error al eliminar el ingrediente.');
        });
    }  
}
async function agregarIngrediente(){    
    const nombreIng = txtNombre.value.trim();
    const cantidadIng = txtCantidad.value.trim();
    const medidaIng = txtMedida.value.trim();


    const ing = JSON.stringify({
        nombre: nombreIng,
        medida: medidaIng,
        cantidad: cantidadIng
    });
    console.log(ing)

    if (!nombreIng || !cantidadIng || !medidaIng){
        alert('Por favor de Insertar todos los datos necesarios');
        return;
    } 
    else {
        fetch(`http://localhost:3000/api/v1/ingrediente/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: ing
        })
        .then(response => {
            console.log('Estado de la respuesta:', response.status);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            return response.json();
        })
        .then(data => {
            alert(`Ingrediente agregado correctamente.`);
            // ingredienteInfo.shadowRoot.querySelector("#bd").innerHTML = '';
            // ingredienteInfo.connectedCallback();
            location.reload();
        })
        .catch(error => {
            console.error('Error al agregar el ingrediente:', error);
            alert('Ocurrió un error al agregar el ingrediente.');
        });
    }   
}


function actualizarIngrediente(){    
    const id = txtId.value.trim();
    const cantidad = txtCantidad.value.trim();
    if (!id || !cantidad) {
        alert('Por favor, inserte un ID y Cantidad para actualizar.');
        return;
    }

    const result = confirm(`¿Estás seguro de actualizar el ingrediente con ID ${id}?`);
    if (result) {
        fetch(`http://localhost:3000/api/v1/ingrediente/${id}/${cantidad}`, {
            method: 'PUT',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(`Ingrediente con ID ${id} actualizado correctamente.`);
            // clear();
            // ingredienteInfo.shadowRoot.querySelector("#bd").innerHTML = '';
            // ingredienteInfo.connectedCallback();
            location.reload();
        })
        .catch(error => {
            console.error('Error al actualizar el ingrediente:', error);
            alert('Ocurrió un error al actualizar el ingrediente.');
        });
    }     
}

function buscarIngredientePorID(){    
    const id = txtId.value.trim();
    if (!id) {
        alert('Por favor, inserte un ID para buscar.');
        return;
    }
    else {
        fetch(`http://localhost:3000/api/v1/ingrediente/${id}`, {
            method: 'GET',
        })
        .then(async response => {
            console.log('Estado de la respuesta:', response.status);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            var res = await response.json();

            console.log(res[0]._id);
            txtId.value = res[0]._id;
            txtCantidad.value = res[0].cantidad;
            txtMedida.value = res[0].medida;
            txtNombre.value = res[0].nombre;
            return res;
        })        
    }    
}

function buscarIngrediente(){
    location.reload();
}

function clear(){    
    txtId.value = '';
    txtCantidad.value = '';
    txtMedida.value = '';
    txtNombre.value = '';
}