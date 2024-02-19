import sqlite from './sqlite.js';
import postgres from './postgres.js';
import { DB_ENGINE } from '#config/index.js';

let db;
if (DB_ENGINE) db = postgres;
else db = sqlite;

export default db;
