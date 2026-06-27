const { poolPromise, sql } = require('../config/db');

// 1. LISTAR todos los estudiantes
exports.listar = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Estudiantes');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. CONSULTAR un estudiante por codigo
exports.consultar = async (req, res) => {
  try {
    const { codigo } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
    .input('codigo', sql.VarChar, codigo)
    .query('SELECT * FROM Estudiantes WHERE Codigo = @codigo');
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. REGISTRAR nuevo estudiante
exports.registrar = async (req, res) => {
  const { codigo, nombres, apellidos, correo, carrera } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
    .input('codigo', sql.VarChar, codigo)
    .input('nombres', sql.VarChar, nombres)
    .input('apellidos', sql.VarChar, apellidos)
    .input('correo', sql.VarChar, correo)
    .input('carrera', sql.VarChar, carrera)
    .query(`INSERT INTO Estudiantes (Codigo, Nombres, Apellidos, Correo, Carrera) 
              VALUES (@codigo, @nombres, @apellidos, @correo, @carrera)`);
    
    res.status(201).json({ message: 'Estudiante registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. ACTUALIZAR estudiante
exports.actualizar = async (req, res) => {
  const { codigo } = req.params;
  const { nombres, apellidos, correo, carrera } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
    .input('codigo', sql.VarChar, codigo)
    .input('nombres', sql.VarChar, nombres)
    .input('apellidos', sql.VarChar, apellidos)
    .input('correo', sql.VarChar, correo)
    .input('carrera', sql.VarChar, carrera)
    .query(`UPDATE Estudiantes SET 
              Nombres = @nombres, 
              Apellidos = @apellidos, 
              Correo = @correo, 
              Carrera = @carrera 
              WHERE Codigo = @codigo`);
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.json({ message: 'Estudiante actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. ELIMINAR estudiante
exports.eliminar = async (req, res) => {
  try {
    const { codigo } = req.params;
    const pool = await poolPromise;
    const result = await pool.request()
    .input('codigo', sql.VarChar, codigo)
    .query('DELETE FROM Estudiantes WHERE Codigo = @codigo');
    
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.json({ message: 'Estudiante eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};