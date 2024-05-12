import {Firestore} from '@google-cloud/firestore';
import {getShopByShopifyDomain} from '@avada/core';
const db = new Firestore();

export const getData = async ctx => {
  const domain = ctx.query.shopifyDomain;
  const shop = await getShopByShopifyDomain(domain);
  
  const settingRef = db.collection('settings');
  const notificationsRef = db.collection('notifications');

  const snapshotSetting = await settingRef.where('shopId', '==', shop.id).get();
  const dataSetting = snapshotSetting.docs.map(doc => doc.data());

  const snapshotNotifications = await notificationsRef.where('shopifyDomain', '==', domain).get();
  const dataNotifications = snapshotNotifications.docs.map(doc => doc.data());

  return (ctx.body = {
    notifications: dataNotifications,
    settings: dataSetting
  });
};
