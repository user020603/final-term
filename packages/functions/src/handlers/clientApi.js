import App from 'koa';
import * as errorService from '@functions/services/errorService';
import router from '../routes/clientApi';

// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;

api.use(router.allowedMethods());
api.use(router.routes());

// Handling all errors
api.on('error', errorService.handleError);

export default api;