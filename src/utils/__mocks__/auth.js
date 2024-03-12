import { jest } from '@jest/globals';

const originalAuth = await import('../auth.js');

export default () =>
    jest.unstable_mockModule('#utils/auth.js', () => ({
        checkJwt: jest.fn(),
    }));

export const mockSuccessfulValidation = (mockedModule) => {
    jest.spyOn(mockedModule, 'checkJwt').mockImplementation(
        (req, res, next) => {
            next();
        },
    );
};

export const resetMock = (mockedModule) => {
    jest.spyOn(mockedModule, 'checkJwt').mockImplementation(
        originalAuth.checkJwt,
    );
};
