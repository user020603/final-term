import {Firestore} from '@google-cloud/firestore';
const db = new Firestore();

const addNotification = async notification => {
  try {
    const notificationRef = db.collection('notifications');
    await notificationRef.add(notification);
  } catch (e) {
    console.error(e);
  }
};

export default addNotification;
