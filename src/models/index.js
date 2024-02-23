import fs from 'fs';
import path from 'path';
import { APP_MODEL_DIRECTORY } from '#config/index.js';

const basename = 'index.js';
const dirname = APP_MODEL_DIRECTORY;

const db = {};

fs.readdirSync(dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(function (file) {
        import(path.join(dirname, file)).then((model) => {
            db[model.default.name] = model.default;
        });
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

export default db;
