import { app } from './app';
import request from 'supertest';

describe('GET /', () => {
    it('return default response', () => {
        return request(app).get('/')
            .expect(200)
            .expect('API is working 🤓');

    })
})