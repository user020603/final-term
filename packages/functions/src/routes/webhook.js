import Router from 'koa-router';
import * as webhookController from '../controllers/webhookController';
// import { verifyWebhook } from "@avada/core";

const router = new Router({
  prefix: '/webhook'
});

// router.use(verifyWebhook);
router.post('/order/new', webhookController.listenNewOrder);

export default router;
