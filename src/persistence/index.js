import sqlite from './sqlite.js';
import postgres from './postgres.js';

let db;
if (process.env.POSTGRES_HOST) db = postgres;
else db = sqlite;

export default db;
