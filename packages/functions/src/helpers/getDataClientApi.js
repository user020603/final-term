import {Firestore} from '@google-cloud/firestore';
const db = new Firestore();

const settingRef = db.collection('settings');
const notificationsRef = db.collection('notifications');

export const getNotifications = async (domain) => {
    const snapshotNotifications = await notificationsRef.where('shopifyDomain', '==', domain).get();
    return snapshotNotifications.docs.map(doc => doc.data());
}

export const getSetting = async (shop) => {
    const snapshotSetting = await settingRef.where('shopId', '==', shop.id).get();
    return snapshotSetting.docs.map(doc => doc.data());
}