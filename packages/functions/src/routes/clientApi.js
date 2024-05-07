import Router from 'koa-router';
import * as clientApiController from '../controllers/clientApiController';
// import { verifyWebhook } from "@avada/core";

const router = new Router({
  prefix: '/clientApi'
});

// router.use(verifyWebhook);
router.get('/getdata', clientApiController.getData);

export default router;
