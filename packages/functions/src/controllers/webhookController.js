import {getShopByShopifyDomain} from '@avada/core';
import getNotificationItem from '../helpers/getNotificationItem';
import addNotification from '../helpers/addNotification';
import Shopify from 'shopify-api-node';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.req.body;
    const shop = await getShopByShopifyDomain(shopifyDomain);

    const shopify = new Shopify({
      accessToken: shop.accessToken,
      shopName: shop.shopifyDomain
    });

    const notification = await getNotificationItem(shopify, orderData);
    notification.shopId = shop.id;
    notification.shopifyDomain = shopifyDomain;

    addNotification(notification);
    console.log('\n########\nAdded order to notification\n########\n');

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
