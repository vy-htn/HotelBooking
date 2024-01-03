const request = require('supertest');
const app = require('../server'); // Assuming your app is in a file named 'app.js'
const mongoose = require('mongoose');


describe('Test Express App', () => {

  beforeEach(async () => {
    
    await mongoose.connection.close();
  });
  it('should respond with "Server is running on port..." on / GET request', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Server is running on port');
  });

  it('should respond with a 404 status on an invalid route', async () => {
    const response = await request(app).get('/invalidroute');
    expect(response.status).toBe(404);
  });

  // Add more test cases for your routes and functionality


});
