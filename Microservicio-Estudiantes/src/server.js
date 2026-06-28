const express = require('express');
const cors = require('cors');
require('dotenv').config();
const estudianteCtrl = require('./controllers/estudianteController');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Microservicio Estudiantes corriendo');
});

// Rutas del CRUD de estudiantes
app.get('/api/estudiantes', estudianteCtrl.listar);
app.post('/api/estudiantes', estudianteCtrl.registrar);
app.get('/api/estudiantes/:codigo', estudianteCtrl.consultar);
app.put('/api/estudiantes/:codigo', estudianteCtrl.actualizar);
app.delete('/api/estudiantes/:codigo', estudianteCtrl.eliminar);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
module.exports = app;