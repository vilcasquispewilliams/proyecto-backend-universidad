const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Importar rutas de cursos
const cursoController = require('./controllers/cursoController');

// Ruta principal
app.get('/', (req, res) => {
  res.send('Microservicio Cursos corriendo');
});

// Rutas CRUD para Cursos
app.get('/api/cursos', cursoController.getCursos);
app.get('/api/cursos/:codigo', cursoController.getCursoByCodigo);
app.post('/api/cursos', cursoController.createCurso);
app.put('/api/cursos/:codigo', cursoController.updateCurso);
app.delete('/api/cursos/:codigo', cursoController.deleteCurso);

app.listen(PORT, () => {
  console.log('Servidor Cursos corriendo en http://localhost:' + PORT);
});

module.exports = app; // ← IMPORTANTE para los tests