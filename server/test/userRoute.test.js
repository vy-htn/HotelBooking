const request = require('supertest');
const app = require('../server'); 
const mongoose = require('mongoose');

describe('User Routes', () => {

  const testUser = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    password: 'password123',
  };
  const testFailUser = {
    firstname: 'John',
    lastname: 'Doe',
    phone: '1234567890',
    password: '',
  };
  it('should register a new member', async () => {
    const response = await request(app)
      .post('/users/register')
      .send(testUser);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Member Registered Successfully');
  });
  it('should handle register error', async () => {
    const response = await request(app)
      .post('/users/register')
      .send(testFailUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users/create-user')
      .send(testUser);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Create User Successfully');
  });

  it('should login a user', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({ email: testUser.email, password: testUser.password });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('login successfully');
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('should return user not found for non-existing user login', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({ email: 'nonexistent@example.com', password: 'password123' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('user not found');
  });

  it('should check if a user exists', async () => {
    const response = await request(app)
      .post('/users/check')
      .send({ email: 'john.doe@example.com' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('exists', true);
  });

});

// describe('call rooms available', () => {
//   test('should return suitable rooms when available', async () => {
//       const response = await request(app)
//           .post('/rooms/book')
//           .send({
//               checkInDate: '2024-01-10',
//               checkOutDate: '2024-01-15',
//               guests: {
//                   adults: 2,
//                   children: 1
//               }
//           });

//       expect(response.status).toBe(200);
//   });

//   test('should return 404 when no suitable rooms are available', async () => {
//       const response = await request(app)
//           .post('/rooms/book')
//           .send({
//               checkInDate: '2024-01-10',
//               checkOutDate: '2024-01-15',
//               guests: {
//                   adults: 10,
//                   children: 5
//               }
//           });

//       expect(response.status).toBe(404);
//       expect(response.text).toBe('No rooms available that can accommodate the number of guests.');
//   });
// });