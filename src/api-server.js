import app from './app.js';
import db from './persistence/index.js';
import {
    gracefulShutdown,
    unGracefulShutdown,
} from '#utils/shutdownRoutine.js';
import { API_PORT } from '#config/index.js';

await db.init();
const server = app.listen(API_PORT, () =>
    console.log(`API Server listening on port ${API_PORT}`),
);

process.on('SIGINT', (signal) => gracefulShutdown(signal, server, db));
process.on('SIGTERM', (signal) => gracefulShutdown(signal, server, db));
process.on('SIGUSR2', (signal) => gracefulShutdown(signal, server, db));
process.on('uncaughtException', (error) =>
    unGracefulShutdown('uncaughtException', error, server, db),
);
process.on('unhandledRejection', (reason, promise) =>
    unGracefulShutdown('unhandledRejection', reason, server, db),
);
