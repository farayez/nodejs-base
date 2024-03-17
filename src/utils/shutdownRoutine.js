export function gracefulShutdown(signal, server) {
    console.log(`${signal} received. Shutting down gracefully...`);

    // server.close(() => {
    //     console.log('Server closed.');
    //     db.teardown()
    //         .catch(() => {})
    //         .then(() => {
    //             console.log('DB closed');
    //             process.exit(0);
    //         });
    // });
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });

    scheduleForceExit();
}

export function unGracefulShutdown(event, error, server) {
    console.error(event, error);
    process.exit(1);
}

export function scheduleForceExit() {
    // Force close the server after 5 seconds
    setTimeout(() => {
        console.error(
            'Could not close connections in time, forcefully shutting down',
        );
        process.exit(1);
    }, 5000);
}
