const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario')

// Conectar a la base de datos
async function connectarMongoose(){    
  return new Promise((resolve, reject) => {
      mongoose.connect('mongodb://localhost/restaurante');
      mongoose.connection.on('open', _ => {
          console.log("Conectado a la base de datos.");
          resolve();            
      });
  });
}

// Cargar la clave secreta desde las variables de entorno
const secretKey = process.env.SECRET_KEY;

// Usuarios de ejemplo (esto debe almacenarse en una base de datos en una aplicación real)
// Ruta para autenticar y obtener un token JWT
router.post('/login', async (req, res) => {
  //const { username, password } = req.body;
  const username = req.body.username;
  const pw = req.body.pw;

  if (!username || !pw) return res.status(401).json({ error: 'No se datos correctos para iniciar sesion.' })
  await connectarMongoose();

  const user = await Usuario.findOne({username: username}).exec();

  if (!user || user.pw !== pw) {
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
