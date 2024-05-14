// Database
const admin = require('firebase-admin');
const db = admin.firestore();
const notificationsRef = db.collection('notifications');
// End Database

import paginationHelper from '../helpers/pagination.helper';

export async function getNotifications({limit, page, sort, shopId}) {
  try {
    const objectPagination = paginationHelper(limit, page);

    const [sortField, sortOrder] = sort.split(':');

    console.log('sortField: ', sortField);
    console.log('sortOrder: ', sortOrder);

    const snapShot = await notificationsRef
      .where('shopId', '==', shopId)
      .orderBy(sortField, sortOrder)
      .limit(objectPagination.limitItems)
      .offset(objectPagination.skip)
      .get();
    const snapShotAll = await notificationsRef.get();
    const length = snapShotAll.docs.map(doc => doc.data()).length;
    const totalPages = Math.ceil(length / limit);
    return {
      data: snapShot.docs.map(doc => doc.data()),
      pageInfo: {
        hasNext: page == totalPages ? false : true,
        hasPre: page == 1 ? false : true
      }
    };
  } catch (e) {
    console.error(e);
  }
}

export async function addNotifications(shopify, shop, orders) {
  try {
    const productIds = [...new Set(orders.map(order => order.line_items[0].product_id))];
    const products = await shopify.product.list({ids: productIds.join(',')});
    const productsMap = new Map(products.map(product => [product.id, product]));
    const notifications = await Promise.all(
      orders.map(async order => {
        const productId = order.line_items[0].product_id;
        const product = productsMap.get(productId);
        const notification = {
          id: order.id,
          firstName: order.billing_address.first_name,
          shopId: shop.id,
          shopifyDomain: shop.shopifyDomain,
          city: order.billing_address.city,
          productName: product.title,
          country: order.billing_address.country,
          productImage: product.image.src,
          createdAt: new Date(order.created_at)
        };

        return notificationsRef.add(notification);
      })
    );

    return notifications;
  } catch (e) {
    console.error(e);
  }
}

export const getNotificationsClientApi = async domain => {
  try {
    const snapshotNotifications = await notificationsRef.where('shopifyDomain', '==', domain).get();
    return snapshotNotifications.docs.map(doc => doc.data());
  } catch (e) {
    console.error(e);
  }
};
