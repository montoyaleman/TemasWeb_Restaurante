const pedidoInfo = document.querySelector('pedido-info');
const txtId = pedidoInfo.shadowRoot.querySelector('#txtId');
const txtFecha = pedidoInfo.shadowRoot.querySelector('#txtFecha');
const txtIdUsuario = pedidoInfo.shadowRoot.querySelector('#txtIdUsuaio');
const txtMesa = pedidoInfo.shadowRoot.querySelector('#txtMesa');
const txtOrden = pedidoInfo.shadowRoot.querySelector('#txtOrden');
const txtTotal = pedidoInfo.shadowRoot.querySelector('#txtTotal');

function eliminarPedido(){
    const id = txtId.value.trim();
    if (!id) {
        alert('Por favor, inserte un ID para eliminar.');
        return;
    }

    const result = confirm(`¿Estás seguro de borrar el pedido con ID ${id}?`);
    if (result) {
        fetch(`http://localhost:3000/api/v1/pedido/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(`Pedido con ID ${id} eliminado correctamente.`);
            location.reload();
        })
        .catch(error => {
            console.error('Error al eliminar el pedido:', error);
            alert('Ocurrió un error al eliminar el pedido.');
        });
    }  
}
async function agregarPedido(){    
    const fechaPedido = txtFecha.value.trim();
    const idUsuarioPedido = txtIdUsuario.value.trim();
    const mesaPedido = txtMesa.value.trim();
    const ordenPedido = txtOrden.value.trim();
    const totalPedido = txtTotal.value.trim();


    const pedido = JSON.stringify({
        fecha: fechaPedido,
        idUsuario: idUsuarioPedido,
        mesa: mesaPedido,
        orden: ordenPedido,
        total: totalPedido
    });
    console.log(pedido)

    if (!fechaPedido || !idUsuarioPedido || !mesaPedido || !ordenPedido || !totalPedido){
        alert('Por favor de Insertar todos los datos necesarios');
        return;
    } 
    else {
        fetch(`http://localhost:3000/api/v1/pedido/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: pedido
        })
        .then(response => {
            console.log('Estado de la respuesta:', response.status);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            return response.json();
        })
        .then(data => {
            alert(`Pedido agregado correctamente.`);
            location.reload();
        })
        .catch(error => {
            console.error('Error al agregar el pedido:', error);
            alert('Ocurrió un error al agregar el pedido.');
        });
    }   
}


function actualizarIngrediente(){    
    const id = txtId.value.trim();
    const mesa = txtMesa.value.trim();
    const total = txtTotal.value.trim();
  
    if (!id || !mesa ||!total) {
        alert('Por favor, inserte un ID, mesa y total para actualizar.');
        return;
    }

    const result = confirm(`¿Estás seguro de actualizar el pedido con ID ${id}?`);
    if (result) {
        fetch(`http://localhost:3000/api/v1/pedido/${id}`, {
            method: 'PUT',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(`Pedido con ID ${id} actualizado correctamente.`);
            location.reload();
        })
        .catch(error => {
            console.error('Error al actualizar el pedido:', error);
            alert('Ocurrió un error al actualizar el pedido.');
        });
    }     
}


function buscarPedido(){
    location.reload();
}

function clear(){    
    txtId.value = '';
    txtFecha.value ='';
    txtIdUsuario.value = '';
    txtMesa.value = '';
    txtOrden.value = '';
    txtTotal.value = '';
}
