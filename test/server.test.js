const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');

describe('Test the hompage', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(app).get('/home');
    expect(response.statusCode).toBe(200);
}, 10000); 
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Test the booking page', () => {
  test('It should respond to the GET method', async () => {
    const response = await request(app).get('/availability');
    expect(response.statusCode).toBe(200);
}, 10000); 
});

describe('POST /book', () => {
  it('should return suitable rooms when available', async () => {
      const res = await request(app)
          .post('/book')
          .send({
              checkInDate: '2023-12-01',
              checkOutDate: '2023-12-10',
              guests: 2
          });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('length');
      expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return 404 when no suitable rooms are available', async () => {
      const res = await request(app)
          .post('/book')
          .send({
              checkInDate: '2023-12-01',
              checkOutDate: '2023-12-10',
              guests: 100
          });
      expect(res.statusCode).toEqual(404);
  });
});
describe('Test about page.',()=>{
  it('it should get GET method about page',async () =>{
    const response = await request(app).get('/about');
    expect(response.statusCode).toBe(200);
  } )
})

afterAll(async () => {
  await mongoose.connection.close();
});
