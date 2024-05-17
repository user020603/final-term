import {getShopByShopifyDomain} from '@avada/core';
import {addNotifications} from '../services/notificationService';
import {createShopify} from '../services/shopifyService';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orders = [ctx.req.body];
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = createShopify(shop);
    await addNotifications({shopify, shop, orders});
    console.log('\n########\nAdded order to notification\n########\n');

    return (ctx.body = {
      data: orders,
    });
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}
