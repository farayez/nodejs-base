import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { NODE_ENV } from '#config/index.js';

export default (app) => {
    if (NODE_ENV == 'development') {
        app.use(morgan('dev',));
    }

    const logsDirectory = import.meta.dirname + '/../storage/logs';

    if (!fs.existsSync(logsDirectory)) {
        fs.mkdirSync(logsDirectory, { recursive: true });
    }

    app.use(morgan('combined', {
        stream: fs.createWriteStream(path.join(logsDirectory, 'access.log'), { flags: 'a' }),
        skip: function (req, res) { return res.statusCode < 400 }
    }))
}