import { default as supertest } from 'supertest';
import mockAuth, {
    mockSuccessfulValidation,
    resetMock,
} from '#utils/__mocks__/auth.js';

mockAuth();

const { default: app } = await import('#/app.js');
const mockedAuth = await import('#utils/auth.js');

const request = supertest(app);

describe('validate-token endpoints work correctly', function () {
    afterEach(() => {
        resetMock(mockedAuth);
    });

    it('should pass if token is valid', async () => {
        mockSuccessfulValidation(mockedAuth);
        const response = await request.get('/api/validate-token');
        expect(response.status).toBe(200);
    });

    it('should deny access if token is not present in header', async () => {
        const response = await request.get('/api/validate-token');
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'No authorization token was found',
        });
    });

    it('should deny access if token is malformed', async () => {
        const response = await request
            .get('/api/validate-token')
            .set('Authorization', `Bearer MalformedToken`);
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({ error: 'jwt malformed' });
    });

    it('should deny access if token is invalid', async () => {
        const response = await request
            .get('/api/validate-token')
            .set(
                'Authorization',
                `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
            );
        expect(response.status).toBe(401);
        expect(response.body).toMatchObject({
            error: 'secret or public key must be provided',
        });
    });

    it('should deny access if token is expired', async () => {
        // TODO: implement
    });
});
