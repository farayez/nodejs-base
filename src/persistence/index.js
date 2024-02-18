// if (process.env.POSTGRES_HOST) module.exports = require('./postgres');
// else module.exports = require('./sqlite');

// import postgres from './postgres.js';
import sqlite from './sqlite.js';
// let db;
// if (process.env.POSTGRES_HOST) db = sqlite;
// else db = sqlite;

export default sqlite;
