const usuarioInfo = document.querySelector('usuario-info');
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
        password: pw,
        name,
        rol: role,
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
    const username = txtUsername.value.trim();
    const password = txtPassword.value.trim();
    const name = txtNombre.value.trim();
    const rol = txtRol.value.trim();

    if (!username || (!password && !name && !rol)) {
        alert('Por favor, inserte el Username y al menos un campo para actualizar.');
        return;
    }

    const updates = JSON.stringify({ password, name, rol });

    const result = confirm(`¿Estás seguro de actualizar el usuario con Username ${username}?`);
    if (result) {
        fetch(`http://localhost:3000/api/v1/usuario/${username}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: updates,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(`Usuario con Username ${username} actualizado correctamente.`);
            location.reload();
        })
        .catch(error => {
            console.error('Error al actualizar el usuario:', error);
            alert('Ocurrió un error al actualizar el usuario.');
        });
    }
}

function eliminarUsuario() {
    const username = txtUsername.value.trim();
    if (!username) {
        alert('Por favor, inserte un Username para eliminar.');
        return;
    }

    const result = confirm(`¿Estás seguro de borrar el usuario con Username ${username}?`);
    if (result) {
        fetch(`http://localhost:3000/api/v1/usuario/${username}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert(`Usuario con Username ${username} eliminado correctamente.`);
            location.reload();
        })
        .catch(error => {
            console.error('Error al eliminar el usuario:', error);
            alert('Ocurrió un error al eliminar el usuario.');
        });
    }
}

function buscarUsuarioPorUsername() {
    const username = txtUsername.value.trim();
    if (!username) {
        alert('Por favor, inserte un Username para buscar.');
        return;
    } else {
        fetch(`http://localhost:3000/api/v1/usuario/${username}`, {
            method: 'GET',
        })
        .then(async response => {
            console.log('Estado de la respuesta:', response.status);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const res = await response.json();
            txtUsername.value = res[0].username;
            txtPassword.value = ''; // Por seguridad, no mostramos la contraseña
            txtNombre.value = res[0].name;
            txtRol.value = res[0].rol;
            return res;
        })
        .catch(error => {
            console.error('Error al buscar el usuario:', error);
            alert('Ocurrió un error al buscar el usuario.');
        });
    }
}

function limpiarCamposUsuario() {
    txtUsername.value = '';
    txtPassword.value = '';
    txtNombre.value = '';
    txtRol.value = '';
}