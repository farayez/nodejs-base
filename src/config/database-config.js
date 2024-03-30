import {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PASSWORD_FILE,
    DB_DATABASE,
    DB_ENGINE,
    DB_PORT,
    DB_STORAGE,
} from '#config/index.js';
import fs from 'fs';

const database_config = {
    development: {
        dialect: DB_ENGINE ?? 'sqlite',
        username: DB_USERNAME,
        password:
            DB_PASSWORD ??
            (DB_PASSWORD_FILE
                ? fs.readFileSync(DB_PASSWORD_FILE, 'utf8')
                : undefined),
        database: DB_DATABASE ?? 'db_test',
        host: DB_HOST,
        port: DB_PORT,
        storage: DB_STORAGE ?? ':memory:',
        logging: false,
        dialectOptions: {
            bigNumberStrings: true,
            // ssl: {
            //     ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
            // }
        },
    },
    test: {
        dialect: DB_ENGINE ?? 'sqlite',
        username: DB_USERNAME,
        password:
            DB_PASSWORD ??
            (DB_PASSWORD_FILE
                ? fs.readFileSync(DB_PASSWORD_FILE, 'utf8')
                : undefined),
        database: DB_DATABASE ?? 'db_test',
        host: DB_HOST,
        port: DB_PORT,
        storage: DB_STORAGE ?? ':memory:',
        logging: false,
    },
};

export default database_config;
