const urlService = 'http://localhost:3000/api/v1/ingrediente/';
const txtId = document.getElementById('txtId');
const txtNombre = document.getElementById('txtNombre');
const txtMedida = document.getElementById('txtMedida');
const txtCantidad = document.getElementById('txtCantidad');

function eliminarIngrediente(){
    console.log(document);
    
    const id = txtId.value;
    console.log(id);
    if (!id) alert('Por favor de Insertar un ID para eliminar.');
    else {
        var result = confirm('¿Estás seguro de borrar el ingrediente'+id+'?');
        if (result == true){
            fetch(this.urlService+id)({
                method: "DELETE"
            })
            .then(response => {
                console.log('Estado de la respuesta:', response.status);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                clear();
                return response.json();
            })
        }
    }    
}
function agregarIngrediente(){    
    const idIng = txtId.value;
    const nombreIng = txtNombre.value;
    const cantidadIng = txtCantidad.value;
    const medidaIng = txtMedida.value;

    if (!idIng || !nombreIng || !cantidadIng || !medidaIng) alert('Por favor de Insertar todos los datos necesarios');
    else {
        fetch(this.urlService+id)({
            method: "POST",
            body: JSON.stringify({
                nombre: nombreIng,
                medida: cantidadIng,
                cantidad: cantidadIng
            })
        })
        .then(response => {
            console.log('Estado de la respuesta:', response.status);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            clear();
            return response.json();
        })
        
    }   
}


function actualizarIngrediente(){    
    const id = txtId.value;
    console.log(id);
    if (!id) alert('Por favor de Insertar un ID para actualizar.');
    else {
        var result = confirm('¿Estás seguro de actualizar el ingrediente'+id+'?');
        if (result == true){
            fetch(this.urlService+id)({
                method: "PUT"
            })
            .then(response => {
                console.log('Estado de la respuesta:', response.status);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                clear();
                return response.json();
            })
        }
    }    
}

function buscarIngredientePorID(){    
    const id = txtId.value;
    if (!id) alert('Por favor de Insertar un ID para buscar.');
    else {
        fetch(this.urlService+id)({
            method: "GET"
        })
        .then(response => {
            console.log('Estado de la respuesta:', response.status);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            txtId.value = 'sdsasdsadsa';
            txtCantidad.value = 'dasdadsada';
            txtMedida.value = 'sadsdasda';
            txtNombre.value = 'dadasdasd';
            return response.json();
        })
        
    }    
}

function clear(){    
    txtId.value = '';
    txtCantidad.value = '';
    txtMedida.value = '';
    txtNombre.value = '';
}