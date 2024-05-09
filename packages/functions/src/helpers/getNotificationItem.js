const getNotificationItem = async (shop, shopifyDomain, orderData) => {
  const product = orderData.line_items[0];

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
    id: orderData.id,
    firstName: orderData.billing_address.first_name,
    city: orderData.billing_address.city,
    productName: product.title,
    country: orderData.billing_address.country,
    productImage: productDetails.product.images.map(image => image.src)[0]
  };
  return notification;
};

export default getNotificationItem;
