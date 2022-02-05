import request from 'supertest';
import app from '../../src/app';

describe('Get /random-url', () => {
    it('should return a 404', async () => {
        const response = await request(app).get('/random-url');
        expect(response.statusCode).toEqual(404);
    });
});


describe('Get /login', () => {
    it('should return a 200 OK', async () => {
        const response = await request(app).get('/login');
        expect(response.statusCode).toEqual(200);
    });
});

describe('Post /login', () => {
    it('should return 401 from invalid field', async () => {
        const response = await request(app).post('/login').send({ email:'', password: '' });
        expect(response.statusCode).toEqual(401);
    });
});
