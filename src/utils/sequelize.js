import process from 'process';
import databaseConfig from '#config/database-config.js';
const env = process.env.NODE_ENV || 'development';
const config = databaseConfig[env];

import { Sequelize } from 'sequelize';

if (config.logging) {
    console.log('database-config', config);
}

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
);

export default sequelize;
