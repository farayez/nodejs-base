import dotenv from 'dotenv';

if (process.env.NODE_ENV == 'test') {
    dotenv.config({ path: './.env.test' });
} else {
    dotenv.config({ path: './.env' });
}

/** Application */
// export const PORT = 8000;
export const NODE_ENV = process.env.NODE_ENV;
export const APP_NAME = process.env.APP_NAME;
export const APP_ENV = process.env.APP_ENV;
export const API_PORT = process.env.API_PORT;
export const APP_ROOT_DIRECTORY = process.env.APP_ROOT_DIRECTORY;
export const APP_MODEL_DIRECTORY = APP_ROOT_DIRECTORY + '/src/models';
export const BASE_URL = process.env.BASE_URL;

/** Auth0 */
export const AUTH0_BASE_URL = process.env.AUTH0_BASE_URL;
export const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;
export const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
export const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
export const AUTH0_SCOPE = process.env.AUTH0_SCOPE;

/** Database */
export const DB_ENGINE = process.env.DB_ENGINE;
export const DB_HOST = process.env.DB_HOST;
export const DB_HOST_FILE = undefined;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_USERNAME_FILE = process.env.DB_USERNAM_FILEE;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_PASSWORD_FILE = process.env.DB_PASSWORD_FILE;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_DATABASE_FILE = undefined;

if (process.env.NODE_ENV != 'test') {
    if (!BASE_URL) {
        throw new Error(
            'Please make sure that the file .env is in place and populated',
        );
    }
    if (!AUTH0_ISSUER_BASE_URL) {
        throw new Error('AUTH0_ISSUER_BASE_URL is not set');
    }
    if (!AUTH0_AUDIENCE) {
        console.log(
            'AUTH0_AUDIENCE not set in .env. Shutting down API server.',
        );
        process.exit(1);
    }
}
