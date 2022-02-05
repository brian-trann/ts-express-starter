import request from 'supertest';
import app from '../../src/app';

describe('Get /random-url', () => {
    it('should return a 404', async () => {
        const response = await request(app).get('/random-url');
        expect(response.statusCode).toEqual(404);
    });
});
