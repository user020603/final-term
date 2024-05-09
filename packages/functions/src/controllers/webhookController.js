import {getShopByShopifyDomain} from '@avada/core';
import getNotificationItem from '../helpers/getNotificationItem';
import addNotification from '../helpers/addNotification';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.req.body;
    const shop = await getShopByShopifyDomain(shopifyDomain);

    const notification = await getNotificationItem(shop, shopifyDomain, orderData);
    notification.shopId = shop.id;
    notification.shopifyDomain = shopifyDomain;

    addNotification(notification);
    console.log('Added order to notification');

    return (ctx.body = {
      data: orderData,
      status: 200
    });
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}
