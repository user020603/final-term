import Shopify from 'shopify-api-node';
import {addDefaultSettings} from '../repositories/settingRepository';
import {addNotifications} from '../repositories/notificationRepository';
import {getShopByShopifyDomain} from '@avada/core';

export const afterInstall = async ctx => {
  try {
    const shopifyDomain = ctx.state.shopify.shop;
    console.log('\n#######\n', shopifyDomain, '\n########\n');
    const shop = await getShopByShopifyDomain(shopifyDomain);

    const shopify = new Shopify({
      accessToken: shop.accessToken,
      shopName: shop.shopifyDomain
    });

    const orders = await shopify.order.list({
      status: 'any',
      limit: 30
    });
    await Promise.all([addNotifications(shopify, orders, shop), addDefaultSettings(shop)]);
    console.log('\n################\n Added after install \n###############\n');
    // await Promise.all(addNotifications(orders, shop, shopifyDomain), addDefaultSettings(shop));
  } catch (e) {
    console.error(e);
  }
};

/**
 * @param {*} param0
 */


