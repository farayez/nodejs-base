import app from './app.js';
import {
    gracefulShutdown,
    unGracefulShutdown,
} from '#utils/shutdownRoutine.js';
import { API_PORT } from '#config/index.js';

const server = app.listen(API_PORT, () =>
    console.log(`API Server listening on port ${API_PORT}`),
);

process.on('SIGINT', (signal) => gracefulShutdown(signal, server));
process.on('SIGTERM', (signal) => gracefulShutdown(signal, server));
process.on('SIGUSR2', (signal) => gracefulShutdown(signal, server));
process.on('uncaughtException', (error) =>
    unGracefulShutdown('uncaughtException', error, server),
);
process.on('unhandledRejection', (reason, promise) =>
    unGracefulShutdown('unhandledRejection', reason, server),
);
