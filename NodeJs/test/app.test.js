const request = require('supertest');
const app = require('../src/app');
describe('GET /', () => {
  it('should return a 200 status', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Welcome to the Node.js API');
  });
});
