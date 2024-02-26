/**
 * Controllers (route handlers).
 */
import getAppHealth from '../controllers/utils/healthCheck.js';
import getError from '../controllers/utils/errorTest.js';
import validateToken from '../controllers/utils/validateToken.js';
import getItems from '#controllers/demos/itemController/getItems.js';
import addItem from '#controllers/demos/itemController/addItem.js';
import updateItem from '#controllers/demos/itemController/updateItem.js';
import deleteItem from '#controllers/demos/itemController/deleteItem.js';

import taskItems from '#controllers/demos/taskItemController.js';

import { checkJwt } from './auth.js';

export default function addRoutes(app) {
    app.get('/api/health-check', getAppHealth);
    app.get('/api/error', getError);
    app.get('/api/shows', checkJwt, validateToken);
    app.get('/api/items', getItems);
    app.post('/api/items', addItem);
    app.put('/api/items/:id', updateItem);
    app.delete('/api/items/:id', deleteItem);

    app.get('/api/task-items', taskItems.getTaskItems);
    app.post('/api/task-items', taskItems.addTaskItem);
    app.put('/api/task-items/:id', taskItems.updateTaskItem);
    app.delete('/api/task-items/:id', taskItems.deleteTaskItem);

    app.use((err, req, res, next) => {
        console.log('error:', err);
        res.status(err.status || 500).json({ error: err.message });
    });
}
