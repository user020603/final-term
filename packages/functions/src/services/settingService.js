// Database
const admin = require('firebase-admin');
const db = admin.firestore();
const settingRef = db.collection('settings');
// End Database

import {defaultSetting} from '../helpers/defaultSetting';

export async function addDefaultSetting(shop, setting = defaultSetting) {
  const shopId = shop.id;
  const shopifyDomain = shop.shopifyDomain;
  setting.shopId = shopId;
  setting.shopifyDomain = shopifyDomain;
  await settingRef.add(setting);
}
