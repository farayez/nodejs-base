import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import addRoutes from './utils/apiRoutes.js';
import setupMorgan from './utils/morganSetupRoutine.js';
import {
    gracefulShutdown,
    unGracefulShutdown,
} from './utils/shutdownRoutine.js';
import { API_PORT, AUTH0_BASE_URL } from '#config/index.js';
import db from './persistence/index.js';
import 'express-async-errors';

const app = express();

app.use(helmet());
app.use(cors({ origin: AUTH0_BASE_URL }));
app.use(express.json());
setupMorgan(app);

addRoutes(app);

if (process.env.NODE_ENV != 'test') {
    var server;

    db.init()
        .then(() => {
            server = app.listen(API_PORT, () =>
                console.log(`API Server listening on port ${API_PORT}`),
            );
            // shutdownRoutine(server, db);
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });

    process.on('SIGINT', (signal) => gracefulShutdown(signal, server, db));
    process.on('SIGTERM', (signal) => gracefulShutdown(signal, server, db));
    process.on('SIGUSR2', (signal) => gracefulShutdown(signal, server, db));
    process.on('uncaughtException', (error) =>
        unGracefulShutdown('uncaughtException', error, server, db),
    );
    process.on('unhandledRejection', (reason, promise) =>
        unGracefulShutdown('unhandledRejection', reason, server, db),
    );
}

export default app;
