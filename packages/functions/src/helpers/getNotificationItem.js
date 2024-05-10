const getNotificationItem = async (shopify, orderData) => {
  const productId = orderData.line_items[0].product_id;
  const product = await shopify.product.get(productId);
  const notification = {
    id: orderData.id,
    firstName: orderData.billing_address.first_name,
    city: orderData.billing_address.city,
    productName: product.title,
    country: orderData.billing_address.country,
    productImage: product.image.src
  };
  return notification;
};

export default getNotificationItem;
