// Database
const admin = require('firebase-admin');
const db = admin.firestore();
const notificationsRef = db.collection('notifications');
// End Database

import paginationHelper from '../helpers/pagination.helper';

export async function getNotifications({limit, page, sort, shopId}) {
  try {
    const objectPagination = paginationHelper(limit, page);

    let query = notificationsRef.where('shopId', '==', shopId);

    const snapshot = await query.count().get();
    const length = snapshot.data().count;

    if (sort) {
      const [sortField, sortOrder] = sort.split(':');
      console.log('sortField: ', sortField);
      console.log('sortOrder: ', sortOrder);
      query = query.orderBy(sortField, sortOrder);
    }

    if (limit) {
      query = query.limit(objectPagination.limitItems).offset(objectPagination.skip);
    }

    const snapShotPagi = await query.get();

    const totalPages = Math.ceil(length / limit);
    const noData = snapShotPagi.docs.length === 0;
    return {
      data: snapShotPagi.docs.map(doc => doc.data()),
      pageInfo: {
        hasNext: noData ? false : page == totalPages ? false : true,
        hasPre: noData ? false : page == 1 ? false : true
      }
    };
  } catch (e) {
    console.error(e);
  }
}
