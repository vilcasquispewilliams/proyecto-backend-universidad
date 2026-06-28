const request = require('supertest');
const app = require('../src/server');

describe('Pruebas del Microservicio de Cursos', () => {
  
  test('GET / debe responder "Microservicio Cursos corriendo"', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Microservicio Cursos corriendo');
  });

  test('GET /api/cursos debe listar cursos', async () => {
    const res = await request(app).get('/api/cursos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/cursos/CODIGO_FALSO debe retornar 404', async () => {
    const res = await request(app).get('/api/cursos/CODIGO_FALSO_999');
    expect(res.statusCode).toBe(404);
  });

});