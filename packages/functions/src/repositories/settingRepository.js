// Database
const admin = require('firebase-admin');
const serviceAccount = require('../../../functions/serviceAccount.development.json');

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
