import { app } from './app';
import request from 'supertest';

describe('GET /', () => {
    it('return default response', () => {
        return request(app).get('/')
            .expect(200)
            .expect('API is working 🤓');

    });
});

describe('GET /weather/78701', () => {
    it('return default response', () => {
        return request(app).get('/weather/78701')
            .expect(200)
            .expect('{"current":88.83,"high":91,"low":86}');

    });
});