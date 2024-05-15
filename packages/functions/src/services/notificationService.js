// Database
const admin = require('firebase-admin');
const db = admin.firestore();
const notificationsRef = db.collection('notifications');
// End Database

export async function addNotifications({shopify, shop, orders}) {
  try {
    const productIds = [...new Set(orders.map(order => order.line_items[0].product_id))];
    const products = await shopify.product.list({ids: productIds.join(',')});
    const productsMap = new Map(products.map(product => [product.id, product]));

    return Promise.all(
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
  } catch (e) {
    console.error(e);
  }
}
