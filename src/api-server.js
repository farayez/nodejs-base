import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import addRoutes from './utils/apiRoutes.js';
import setupMorgan from '#config/setupMorgan.js';
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
    let server;

    db.init()
        .then(() => {
            server = app.listen(API_PORT, () =>
                console.log(`API Server listening on port ${API_PORT}`),
            );
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });

    function gracefulShutdown(signal) {
        console.log(`${signal} received. Shutting down gracefully...`);

        server.close(() => {
            console.log('Server closed.');
            db.teardown().catch(() => {});
            console.log('DB closed');
            process.exit(0);
        });

        // Force close the server after 5 seconds
        setTimeout(() => {
            console.error(
                'Could not close connections in time, forcefully shutting down',
            );
            process.exit(1);
        }, 5000);
    }

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGUSR2', gracefulShutdown);
}

export default app;
