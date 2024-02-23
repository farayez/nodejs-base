import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import addApiRoutes from '#utils/apiRoutes.js';
import addWebRoutes from '#utils/webRoutes.js';
import setupMorgan from '#utils/morganSetupRoutine.js';
import { AUTH0_BASE_URL, APP_ROOT_DIRECTORY } from '#config/index.js';
import 'express-async-errors';

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ['*', "'unsafe-inline'"],
                scriptSrc: ['*', "'unsafe-inline'"],
            },
        },
    }),
);

app.use(cors({ origin: AUTH0_BASE_URL }));
app.use(express.json());
app.use(express.static(APP_ROOT_DIRECTORY + '/src/static'));
app.set('views', path.join(APP_ROOT_DIRECTORY, '/src/views'));
app.set('view engine', 'ejs');

setupMorgan(app);
addApiRoutes(app);
addWebRoutes(app);

export default app;
