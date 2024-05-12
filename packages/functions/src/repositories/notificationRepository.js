// Database
const admin = require('firebase-admin');
const db = admin.firestore();
const notificationRef = db.collection('notifications');
// End Database

import paginationHelper from '../helpers/pagination.helper';

export async function getNotifications({limit, page, sort}) {
  const objectPagination = paginationHelper(limit, page);

  const [sortField, sortOrder] = sort.split(':');

  console.log('sortField: ', sortField);
  console.log('sortOrder: ', sortOrder);

  const snapShot = await notificationRef
    .orderBy(sortField, sortOrder)
    .limit(objectPagination.limitItems)
    .offset(objectPagination.skip)
    .get();
  const snapShotAll = await notificationRef.get();
  const length = snapShotAll.docs.map(doc => doc.data()).length;
  const totalPages = Math.ceil(length / limit);
  return {
    data: snapShot.docs.map(doc => doc.data()),
    pageInfo: {
      hasNext: page == totalPages ? false : true,
      hasPre: page == 1 ? false : true
    }
  };
}

export async function addNotifications(shopify, orders, shop) {
  try {
    const notifications = await Promise.all(
      orders.map(async order => {
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
          createdAt: new Date(order.created_at).getTime()
        };

        return notificationRef.add(notification);
      })
    );

    return notifications;
  } catch (e) {
    console.error(e);
  }
}
