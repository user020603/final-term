// Database
const admin = require('firebase-admin');
const db = admin.firestore();
const notificationRef = db.collection('notifications');
// End Database

import paginationHelper from '../helpers/pagination.helper';

export async function getNotifications({limit, page}) {
  const objectPagination = paginationHelper(limit, page);
  const snapShot = await notificationRef
    .limit(objectPagination.limitItems)
    .offset(objectPagination.skip)
    .get();
  return snapShot.docs.map(doc => doc.data());
}

export async function addNotifications(shopify, orders, shop) {
  try {
    const notifications = await Promise.all(orders.map(async (order) => {
      const productId = order.line_items[0].product_id;
      const product = await shopify.product.get(productId);

      const notification = {
        id: order.id,
        firstName: order.billing_address.first_name,
        shopId: shop.id,
        shopifyDomain: shop.shopifyDomain,
        city: order.billing_address.city,
        productName: product.title,
        country: order.billing_address.country,
        productImage: product.image.src,
        timestamp: new Date(order.created_at).getTime()
      };

      return notificationRef.add(notification);
    }));

    return notifications;
  } catch (e) {
    console.error(e);
  }
}
