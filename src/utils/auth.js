import { expressjwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { AUTH0_ISSUER_BASE_URL, AUTH0_AUDIENCE } from '#config/index.js';

export const checkJwt = expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`,
    }),
    audience: AUTH0_AUDIENCE,
    issuer: `${AUTH0_ISSUER_BASE_URL}/`,
    algorithms: ['RS256'],
});
