import {getShopByShopifyDomain} from '@avada/core';
import {addNotifications} from '../services/notificationService';
import Shopify from 'shopify-api-node';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orders = [ctx.req.body];
    const shop = await getShopByShopifyDomain(shopifyDomain);

    const shopify = new Shopify({
      accessToken: shop.accessToken,
      shopName: shop.shopifyDomain
    });

    await addNotifications({shopify, shop, orders});
    console.log('\n########\nAdded order to notification\n########\n');

    return (ctx.body = {
      data: orders,
      status: 200
    });
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}
