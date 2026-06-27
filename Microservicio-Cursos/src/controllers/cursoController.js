const { sql, poolPromise } = require('../config/db');

// GET - Listar todos los cursos
const getCursos = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Cursos');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// GET - Buscar curso por código
const getCursoByCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
     .input('codigo', sql.VarChar, codigo)
     .query('SELECT * FROM Cursos WHERE Codigo = @codigo');
    
    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).send({ message: 'Curso no encontrado' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// POST - Crear nuevo curso
const createCurso = async (req, res) => {
  try {
    const { Codigo, Nombre, Creditos, Docente } = req.body;
    const pool = await poolPromise;
    await pool.request()
     .input('codigo', sql.VarChar, Codigo)
     .input('nombre', sql.VarChar, Nombre)
     .input('creditos', sql.Int, Creditos)
     .input('docente', sql.VarChar, Docente)
     .query('INSERT INTO Cursos (Codigo, Nombre, Creditos, Docente) VALUES (@codigo, @nombre, @creditos, @docente)');
    res.status(201).send({ message: 'Curso creado correctamente' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// PUT - Actualizar curso
const updateCurso = async (req, res) => {
  try {
    const { codigo } = req.params;
    const { Nombre, Creditos, Docente } = req.body;
    const pool = await poolPromise;
    await pool.request()
     .input('codigo', sql.VarChar, codigo)
     .input('nombre', sql.VarChar, Nombre)
     .input('creditos', sql.Int, Creditos)
     .input('docente', sql.VarChar, Docente)
     .query('UPDATE Cursos SET Nombre = @nombre, Creditos = @creditos, Docente = @docente WHERE Codigo = @codigo');
    res.send({ message: 'Curso actualizado correctamente' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// DELETE - Eliminar curso
const deleteCurso = async (req, res) => {
  try {
    const { codigo } = req.params;
    const pool = await poolPromise;
    await pool.request()
     .input('codigo', sql.VarChar, codigo)
     .query('DELETE FROM Cursos WHERE Codigo = @codigo');
    res.send({ message: 'Curso eliminado correctamente' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getCursos,
  getCursoByCodigo,
  createCurso,
  updateCurso,
  deleteCurso
};