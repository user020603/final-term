// Database
const admin = require('firebase-admin');
const serviceAccount = require('../../../functions/serviceAccount.development.json');

const defaultSettings = {
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

const settingsRef = db.collection('settings');

// End Database

export async function getSettings(shopId) {
  const snapShot = await settingsRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  return snapShot.docs.map(doc => doc.data());
}

export async function updateSettings(shopId, settings) {
  const snapshotSettings = await settingsRef
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  if (!snapshotSettings.empty) {
    const doc = snapshotSettings.docs[0];
    await settingsRef.doc(doc.id).update(settings);
  }
}

export async function addDefaultSettings(shop) {
  const shopId = shop.id;
  const shopifyDomain = shop.shopifyDomain
  defaultSettings.shopId = shopId;
  defaultSettings.shopifyDomain = shopifyDomain
  await settingsRef.add(defaultSettings);
}
