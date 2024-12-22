const express = require('express');
const app = express();
const joyasRoutes = require('../src/routes/routes');

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Se consultó la ruta: ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/', joyasRoutes);

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.type === 'query_error') {
    return res.status(400).json({ error: 'Error en la consulta SQL' });
  }

  res.status(500).json({ error: 'Error interno del servidor' });
});

module.exports = app;
