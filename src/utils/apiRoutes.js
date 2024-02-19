/**
 * Controllers (route handlers).
 */
import getAppHealth from '../controllers/utils/health-check.js';
import getError from '../controllers/utils/error-test.js';
import validateToken from '../controllers/utils/validate-token.js';
import getItems from '../routes/getItems.js';
import addItem from '../routes/addItem.js';
import updateItem from '../routes/updateItem.js';
import deleteItem from '../routes/deleteItem.js';

import checkJwt from './auth.js';

export default function addRoutes(app) {
    app.get('/api/health-check', getAppHealth);
    app.get('/api/error', getError);
    app.get('/api/shows', checkJwt, validateToken);
    app.get('/api/items', getItems);
    app.post('/api/items', addItem);
    app.put('/api/items/:id', updateItem);
    app.delete('/api/items/:id', deleteItem);

    app.use((err, req, res, next) => {
        console.log('error:', err);
        res.status(err.status || 500).json({ error: err.message });
    });
}
