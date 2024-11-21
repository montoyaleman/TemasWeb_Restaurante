const urlService = 'http://localhost:3000/api/v1/platillo/';
const platilloInfo = document.querySelector('platillo-info');
const txtId = platilloInfo.shadowRoot.querySelector('#txtId');
const txtNombre = platilloInfo.shadowRoot.querySelector('#txtNombre');
const txtTipo = platilloInfo.shadowRoot.querySelector('#txtTipo');
const txtDescripcion = platilloInfo.shadowRoot.querySelector('#txtDescripcion');
const txtCantidad = platilloInfo.shadowRoot.querySelector('#txtCantidad');
const txtPrecio = platilloInfo.shadowRoot.querySelector('#txtPrecio');
const selectIngredientes = platilloInfo.shadowRoot.querySelector('#selectIngredientes');

function eliminarPlatillo() {
    const id = txtId.value.trim();
    if (!id) {
        alert('Por favor, inserte un ID para eliminar.');
        return;
    }

    const result = confirm(`¿Estás seguro de borrar el platillo con ID ${id}?`);
    if (result) {
        fetch(`${urlService}${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(`Platillo con ID ${id} eliminado correctamente.`);
            // platilloInfo.#consultaPlatillos(platilloInfo.shadowRoot);
            location.reload();

        })
        .catch(error => {
            console.error('Error al eliminar el platillo:', error);
            alert('Ocurrió un error al eliminar el platillo.');
        });
    }
}

async function agregarPlatillo() {
    console.log(txtDescripcion.value.trim());
    const nuevoPlatillo = {
        nombre: txtNombre.value.trim(),
        tipo: txtTipo.value.trim(),
        desc: txtDescripcion.value.trim(),
        cantidad: parseInt(txtCantidad.value),
        precio: parseFloat(txtPrecio.value),
        ingredientes: Array.from(selectIngredientes.selectedOptions).map(option => option.value)
    };

    if (!nuevoPlatillo.nombre || !nuevoPlatillo.tipo || !nuevoPlatillo.desc || isNaN(nuevoPlatillo.cantidad) || isNaN(nuevoPlatillo.precio)) {
        alert('Por favor de insertar todos los datos necesarios');
        return;
    }

    try {
        const response = await fetch(urlService, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoPlatillo)
        });
        const data = await response.json();
        alert(`Platillo agregado correctamente.`);
        //platilloInfo.#consultaPlatillos(platilloInfo.shadowRoot);
        location.reload();
    } catch (error) {
        console.error('Error al agregar el platillo:', error);
        alert('Ocurrió un error al agregar el platillo.');
    }
}

function actualizarPlatillo() {
    const id = txtId.value.trim();
    if (!id) {
        alert('Por favor, inserte un ID para actualizar.');
        return;
    }

    const platilloActualizado = {
        nombre: txtNombre.value.trim(),
        tipo: txtTipo.value.trim(),
        descripcion: txtDescripcion.value.trim(),
        cantidad: parseInt(txtCantidad.value),
        precio: parseFloat(txtPrecio.value),
        ingredientes: Array.from(selectIngredientes.selectedOptions).map(option => option.value)
    };

    fetch(`${urlService}${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(platilloActualizado)
    })
    .then(response => response.json())
    .then(data => {
        alert(`Platillo con ID ${id} actualizado correctamente.`);
        //platilloInfo.#consultaPlatillos(platilloInfo.shadowRoot);
        location.reload();
    })
    .catch(err => {
        console.error('Error actualizando platillo:', err);
        alert('Ocurrió un error al actualizar el platillo.');
    });
}

function buscarPlatilloPorID() {
    const id = txtId.value.trim();
    if (!id) {
        alert('Por favor, inserte un ID para buscar.');
        return;
    }

    fetch(`${urlService}${id}`, {
        method: 'GET',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        txtNombre.value = data.nombre;
        txtTipo.value = data.tipo;
        txtDescripcion.value = data.descripcion;
        txtCantidad.value = data.cantidad;
        txtPrecio.value = data.precio;

        Array.from(selectIngredientes.options).forEach(option => {
            option.selected = data.ingredientes.includes(option.value);
        });
    })
    .catch(err => {
        console.error('Error buscando platillo:', err);
        alert('Ocurrió un error al buscar el platillo.');
    });
}

function buscarPlatillo(){
    location.reload();
}
function clear(){    
    txtId.value = '';
    txtNombre.value = '';
    txtTipo.value = '';
    txtDescripcion.value = '';
    txtCantidad.value = '';
    txtPrecio.value = '';
}