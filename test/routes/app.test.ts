import request from 'supertest';
import createApp from '../../src/app';
import express from 'express';

describe('Get /random-url', () => {
    let app: express.Express;
    beforeAll(async () => {
        app = await createApp();
    });
    it('should return a 404', async () => {
        const response = await request(app).get('/random-url');
        expect(response.statusCode).toEqual(404);
    });
});
