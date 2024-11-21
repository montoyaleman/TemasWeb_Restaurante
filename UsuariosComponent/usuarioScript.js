const usuarioInfo = document.querySelector('usuario-info');
const txtId = usuarioInfo.shadowRoot.querySelector('#txtId');
const txtUsername = usuarioInfo.shadowRoot.querySelector('#txtUsername');
const txtPassword = usuarioInfo.shadowRoot.querySelector('#txtPassword');
const txtNombre = usuarioInfo.shadowRoot.querySelector('#txtNombre');
const txtRol = usuarioInfo.shadowRoot.querySelector('#txtRol');

function agregarUsuario() {
    const username = txtUsername.value.trim();
    const pw = txtPassword.value.trim();
    const name = txtNombre.value.trim();
    const role = txtRol.value.trim();

    const usuario = JSON.stringify({
        username,
        pw,
        name,
        role,
    });

    if (!username || !pw || !name || !role) {
        alert('Por favor, inserte todos los datos necesarios.');
        return;
    } else {
        fetch(`http://localhost:3000/api/v1/usuario/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: usuario,
        })
        .then(response => {
            console.log('Estado de la respuesta:', response.status);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(`Usuario agregado correctamente.`);
            location.reload();
        })
        .catch(error => {
            console.error('Error al agregar el usuario:', error);
            alert('Ocurrió un error al agregar el usuario.');
        });
    }
}

function actualizarUsuario() {
    const id = txtId.value.trim();
    const username = txtUsername.value.trim();
    const password = txtPassword.value.trim();
    const name = txtNombre.value.trim();
    const role = txtRol.value.trim();

    if (!id) {
        alert('Por favor, inserte el ID y al menos un campo para actualizar.');
        return;
    }

    // Crear objeto de actualización con solo los campos no vacíos
    const updates = {};
    if (username) updates.username = username;
    if (password) updates.password = password;
    if (name) updates.name = name;
    if (role) updates.role = isNaN(role) ? role : parseInt(role); // Convertir rol a número si es válido

    if (Object.keys(updates).length === 0) {
        alert('Por favor, inserte al menos un campo para actualizar.');
        return;
    }

    const result = confirm(`¿Estás seguro de actualizar el usuario con el ID ${id}?`);
    if (result) {
        fetch(`http://localhost:3000/api/v1/usuario/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updates),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(`Usuario con ID ${id} actualizado correctamente.`);
            location.reload();
        })
        .catch(error => {
            console.error('Error al actualizar el usuario:', error);
            alert('Ocurrió un error al actualizar el usuario.');
        });
    }
}

function eliminarUsuario() {
    const id = txtId.value.trim();
    if (!id) {
        alert('Por favor, inserte un id para eliminar.');
        return;
    }

    const result = confirm(`¿Estás seguro de borrar el usuario con Username ${id}?`);
    if (result) {
        fetch(`http://localhost:3000/api/v1/usuario/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(`Usuario con Username ${id} eliminado correctamente.`);
            location.reload();
        })
        .catch(error => {
            console.error('Error al eliminar el usuario:', error);
            alert('Ocurrió un error al eliminar el usuario.');
        });
    }
}

function buscarUsuarioPorId() {
    const objectId = txtId.value.trim(); // Se asume que el ObjectId está en este campo.
    if (!objectId) {
        alert('Por favor, inserte un ObjectId para buscar.');
        return;
    } else {
        fetch(`http://localhost:3000/api/v1/usuario/${objectId}`, {
            method: 'GET',
        })
        .then(async response => {
            console.log('Estado de la respuesta:', response.status);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const usuario = await response.json();

            if (!usuario) {
                alert('No se encontró un usuario con el ObjectId especificado.');
                return;
            }

            txtUsername.value = usuario.username;
            txtPassword.value = ''; // Por seguridad, no mostramos la contraseña.
            txtNombre.value = usuario.name;
            txtRol.value = usuario.role;

            return usuario;
        })
        .catch(error => {
            console.error('Error al buscar el usuario:', error);
            alert('Ocurrió un error al buscar el usuario.');
        });
    }
}

function consultarUsuarios(){
    location.reload();
}

function limpiarCamposUsuario() {
    txtUsername.value = '';
    txtPassword.value = '';
    txtNombre.value = '';
    txtRol.value = '';
}