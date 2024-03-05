import { default as supertest } from 'supertest';
import app from '#/app.js';
import auth from '#utils/tests/setupAuth.foreign.js';
const request = supertest(app);

describe('validate-token endpoints work correctly', function () {
    it('gets all task items using get all endpoint', async () => {
        const response = await request
            .get('/api/validate-token')
            .set('Authorization', `Bearer ${auth.accessToken}`);
        expect(response.status).toBe(200);
    });
});
