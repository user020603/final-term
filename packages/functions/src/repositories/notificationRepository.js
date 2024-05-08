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
  orders.map(order => {
    const product = order.line_items[0];
    const notification = {
      id: order.id,
      shopId: shop.id,
      shopifyDomain: shopifyDomain,
      firstName: order.billing_address.first_name,
      city: order.billing_address.city,
      productName: product.title,
      country: order.billing_address.country,
      productImage:
        product.image ||
        'https://th.bing.com/th/id/OIP.vTAHYPeLEe8WzfcZyndQugHaEK?rs=1&pid=ImgDetMain',
      timestamp: new Date(order.created_at).getTime()
    };
    return notificationRef.add(notification);
  });
}
