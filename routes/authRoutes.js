const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Cargar la clave secreta desde las variables de entorno
const secretKey = process.env.SECRET_KEY;

// Usuarios de ejemplo (esto debe almacenarse en una base de datos en una aplicación real)
const users = [
  { id: 1, username: 'user1', password: 'pass1' },
  { id: 2, username: 'user2', password: 'pass2' },
];

// Ruta para autenticar y obtener un token JWT
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
// Configura la duración de 1 minutos en segundos
const expiresIn = 60; // 60 segundos (1 minutos)

const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn });

//   const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  res.json({ token });
  console.log(token)
});

module.exports = router;
