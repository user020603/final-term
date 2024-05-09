// Database
const admin = require('firebase-admin');
const db = admin.firestore();
const notificationRef = db.collection('notifications');
// End Database

export async function getNotifications() {
  const snapShot = await notificationRef.get();
  return snapShot.docs.map(doc => doc.data());
}

export async function addNotifications(orders, shop, shopifyDomain) {
  try {
    for (const order of orders) {
      const product = order.line_items[0];

      const response = await fetch(
        `https://${shopifyDomain}/admin/api/2023-10/products/${product.product_id}.json`,
        {
          headers: {
            'X-Shopify-Access-Token': shop.accessToken
          }
        }
      );

      const productDetails = await response.json();

      const notification = {
        id: order.id,
        shopId: shop.id,
        shopifyDomain: shopifyDomain,
        firstName: order.billing_address.first_name,
        city: order.billing_address.city,
        productName: product.title,
        country: order.billing_address.country,
        productImage: productDetails.product.images.map(image => image.src)[0],
        timestamp: new Date(order.created_at).getTime()
      };
      return notificationRef.add(notification);
    }
  } catch (e) {
    console.error(e);
  }
}
