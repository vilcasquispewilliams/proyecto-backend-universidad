const request = require('supertest');
const app = require('../src/server'); // <- Cambiado: usamos tu server.js

describe('Pruebas del Microservicio de Estudiantes', () => {
  
  // Test 1: La ruta principal debe responder
  test('GET / debe responder "Microservicio Estudiantes corriendo"', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Microservicio Estudiantes corriendo');
  });

  // Test 2: Listar estudiantes debe devolver un array
  test('GET /api/estudiantes debe listar estudiantes', async () => {
    const res = await request(app).get('/api/estudiantes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test 3: Buscar estudiante que no existe debe dar 404
  test('GET /api/estudiantes/CODIGO_FALSO debe retornar 404', async () => {
    const res = await request(app).get('/api/estudiantes/CODIGO_FALSO_999');
    expect(res.statusCode).toBe(404);
  });

});