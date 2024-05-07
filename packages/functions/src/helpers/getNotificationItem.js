const getNotificationItem = async orderData => {
  const product = orderData.line_items[0];
  const notification = {
    id: orderData.id,
    firstName: orderData.billing_address.first_name,
    city: orderData.billing_address.city,
    productName: product.title,
    country: orderData.billing_address.country,
    productImage:
      product.image ||
      'https://th.bing.com/th/id/OIP.vTAHYPeLEe8WzfcZyndQugHaEK?rs=1&pid=ImgDetMain',
    timestamp: new Date(orderData.created_at).getTime()
  };
  return notification;
};

export default getNotificationItem;
