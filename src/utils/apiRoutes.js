/**
 * Controllers (route handlers).
 */
import getAppHealth from '../controllers/utils/healthCheck.js';
import getError from '../controllers/utils/errorTest.js';
import validateToken from '../controllers/utils/validateToken.js';

import taskItems from '#controllers/demos/taskItemController.js';

import { checkJwt } from './auth.js';

export default function addRoutes(app) {
    app.get('/api/health-check', getAppHealth);
    app.get('/api/error', getError);
    app.get('/api/validate-token', checkJwt, validateToken);

    app.get('/api/task-items', taskItems.getTaskItems);
    app.get('/api/task-items/:id', taskItems.getTaskItems);
    app.post('/api/task-items', taskItems.addTaskItem);
    app.patch('/api/task-items/:id', taskItems.updateTaskItem);
    app.delete('/api/task-items/:id', taskItems.deleteTaskItem);

    app.use((err, req, res, next) => {
        // TODO: Log Error
        res.status(err.status || 500).json({ error: err.message });
    });
}
