import { default as supertest } from 'supertest';
import app from '#/app.js';
import auth from '#utils/tests/setupAuth.foreign.js';
const request = supertest(app);

describe('validate-token endpoints work correctly', function () {
    it('should pass if token is valid', async () => {
        const response = await request
            .get('/api/validate-token')
            .set('Authorization', `Bearer ${auth.accessToken}`);
        expect(response.status).toBe(200);
    });

    it('should deny access if token is not present in header', async () => {
        const response = await request.get('/api/validate-token');
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'No authorization token was found',
        });
    });

    it('should deny access if token is invalid', async () => {
        const response = await request
            .get('/api/validate-token')
            .set('Authorization', `Bearer falseToken`);
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({ error: 'jwt malformed' });
    });
});
