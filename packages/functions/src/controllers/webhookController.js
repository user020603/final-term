import {getShopByShopifyDomain} from '@avada/core';
import Shopify from 'shopify-api-node';
import getNotificationItem from '../helpers/getNotificationItem';
import addNotification from '../helpers/addNotification';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.req.body;
    const shop = await getShopByShopifyDomain(shopifyDomain);

    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    });

    // console.log(orderData.line_items[0]);

    const notification = await getNotificationItem(orderData);
    notification.shopId = shop.id;
    notification.shopifyDomain = shopifyDomain;
    // console.log(notification);
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
