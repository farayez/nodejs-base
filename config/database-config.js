import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } from './index.js';
// import fs from 'fs';

const database_config = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        host: DB_HOST,
        port: 5432,
        dialect: 'postgres',
        dialectOptions: {
            bigNumberStrings: true,
        },
    },
    test: {
        database: 'test_test',
        dialect: 'sqlite',
        // storage: ':memory:',
        storage: 'database.sqlite3',
        logging: false,
    },
    // production: {
    //   username: DB_USERNAME,
    //   password: DB_PASSWORD,
    //   database: DB_DATABASE,
    //   host: DB_HOST,
    //   port: 3306,
    //   dialect: 'mysql',
    //   dialectOptions: {
    //     bigNumberStrings: true,
    //     ssl: {
    //       ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
    //     }
    //   }
    // }
};

export default database_config;
