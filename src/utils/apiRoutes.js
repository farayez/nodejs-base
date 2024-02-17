/**
 * Controllers (route handlers).
 */
import getAppHealth from '../controllers/utils/health-check.js';
import validateToken from '../controllers/utils/validate-token.js';

import checkJwt from './auth.js';

export default function addRoutes(app) {
  app.get('/api/health-check', getAppHealth);
  app.get('/api/shows', checkJwt, validateToken);
}
