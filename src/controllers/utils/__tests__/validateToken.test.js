import { jest } from '@jest/globals';

const { default: validateToken } = await import('../validateToken.js');

describe('validateToken controller should work properly', () => {
    it('validateToken controller method replies with proper response', async function () {
        const res = { json: jest.fn() };
        validateToken({ auth: { values: 'auth middleware values' } }, res);

        expect(res.json).toHaveBeenCalledWith({
            msg: 'Your access token was successfully validated!',
            auth: { values: 'auth middleware values' },
        });
    });
});
