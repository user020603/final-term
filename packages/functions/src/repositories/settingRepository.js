// Database
const admin = require('firebase-admin');
const serviceAccount = require('../../../functions/serviceAccount.development.json');

const defaultSetting = {
  position: 'bottom-left',
  hideTimeAgo: false,
  truncateProductName: false,
  displayDuration: 3,
  firstDelay: 5,
  popsInterval: 2,
  maxPopsDisplay: 10,
  includedUrls: 'http://example.com/?account=basket&airport=approval',
  excludedUrls: 'http://www.example.com/approval/act.html',
  allowShow: 'all'
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const settingRef = db.collection('settings');

// End Database

export async function getSetting(shopId) {
  const snapShot = await settingRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  return snapShot.docs.map(doc => doc.data());
}

export async function updateSetting(shopId, setting) {
  const snapshotSetting = await settingRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  if (!snapshotSetting.empty) {
    const doc = snapshotSetting.docs[0];
    await settingRef.doc(doc.id).update(setting);
  }
}

export async function addDefaultSetting(shop, setting = defaultSetting) {
  const shopId = shop.id;
  const shopifyDomain = shop.shopifyDomain;
  setting.shopId = shopId;
  setting.shopifyDomain = shopifyDomain;
  await settingRef.add(setting);
}
