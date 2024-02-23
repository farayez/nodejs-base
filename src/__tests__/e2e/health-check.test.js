import { default as request } from 'supertest';
import app from '#/app.js';

describe('GET /api/health-check', function () {
    it('responds with json', function (done) {
        request(app)
            .get('/api/health-check')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(done);
    });
});
