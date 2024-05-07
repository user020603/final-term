import Router from 'koa-router';
import * as sampleController from '@functions/controllers/sampleController';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import * as appNewsController from '@functions/controllers/appNewsController';
import {getApiPrefix} from '@functions/const/app';

// Database
const admin = require('firebase-admin');
const serviceAccount = require('../../../functions/serviceAccount.development.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
// End Database

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/notifications', async ctx => {
    try {
      const notificationRef = db.collection('notifications');
      const snapShot = await notificationRef.get();
      const data = snapShot.docs.map(doc => doc.data());
      return (ctx.body = data);
    } catch (e) {
      console.error(e);
    }
  });

  router.get('/settings', async ctx => {
    try {
      const settingsRef = db.collection('settings');
      const shopInfosRef = db.collection('shopInfos');

      const snapShotShopInfos = await shopInfosRef.get();
      const dataShopInfos = snapShotShopInfos.docs.map(doc => doc.data());

      const shopId = dataShopInfos[0].shopId;

      const snapShot = await settingsRef
        .where('shopId', '==', shopId)
        .limit(1)
        .get();
      const data = snapShot.docs.map(doc => doc.data());
      return (ctx.body = data[0]);
    } catch (e) {
      console.error(e);
    }
  });

  router.put('/settings', async ctx => {
    try {
      const settings = ctx.req.body;
      ctx.body = settings;

      const settingsRef = db.collection('settings');
      const shopInfosRef = db.collection('shopInfos');

      const snapShotShopInfos = await shopInfosRef.get();
      const dataShopInfos = snapShotShopInfos.docs.map(doc => doc.data());

      const shopId = dataShopInfos[0].shopId;

      const snapshotSettings = await settingsRef
        .where('shopId', '==', shopId)
        .limit(1)
        .get();

      if (!snapshotSettings.empty) {
        const doc = snapshotSettings.docs[0];
        await settingsRef.doc(doc.id).update(settings);
      }
    } catch (e) {
      console.error(e);
    }
  });

  router.get('/samples', sampleController.exampleAction);
  router.get('/shops', shopController.getUserShops);
  router.get('/subscription', subscriptionController.getSubscription);
  router.get('/appNews', appNewsController.getList);

  return router;
}
