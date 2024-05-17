import {addDefaultSetting} from './settingService';
import {addNotifications} from './notificationService';
import {getShopByShopifyDomain} from '@avada/core';
import {createWebhook} from './webhookService';
import {createShopify} from './shopifyService';

export const afterInstall = async ctx => {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    console.log('\n#######\n', shopifyDomain, '\n########\n');
    const shop = await getShopByShopifyDomain(shopifyDomain);

    const shopify = createShopify(shop);

    const orders = await shopify.order.list({
      status: 'any',
      limit: 30
    });

    await Promise.all([
      addNotifications({shopify, shop, orders}),
      addDefaultSetting(shop),
      createWebhook(shopify)
    ]);
    console.log('\n################\n Added after install \n###############\n');
  } catch (e) {
    console.error(e);
  }
};

/**
 * @param {*} param0
 */
