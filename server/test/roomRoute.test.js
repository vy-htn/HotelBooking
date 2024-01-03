const request = require('supertest');
const app = require('../server'); 


describe('call rooms available', () => {
  test('should return suitable rooms when available', async () => {
      const response = await request(app)
          .post('/rooms/book')
          .send({
              checkInDate: '2024-01-10',
              checkOutDate: '2024-01-15',
              guests: {
                  adults: 2,
                  children: 1
              }
          });

      expect(response.status).toBe(200);
  });

  test('should return 404 when no suitable rooms are available', async () => {
      const response = await request(app)
          .post('/rooms/book')
          .send({
              checkInDate: '2024-01-10',
              checkOutDate: '2024-01-15',
              guests: {
                  adults: 10,
                  children: 5
              }
          });

      expect(response.status).toBe(404);
      expect(response.text).toBe('No rooms available that can accommodate the number of guests.');
  });
});