import {getShopByShopifyDomain} from '@avada/core';
import {getSetting} from '../repositories/settingRepository';
import {getNotifications} from '../repositories/notificationRepository';

export const getData = async ctx => {
  try {
    const domain = ctx.query.shopifyDomain;
    const shop = await getShopByShopifyDomain(domain);
    const shopId = shop.id;

    const [{data: dataNotifications}, dataSetting] = await Promise.all([
      getNotifications({shopId}),
      getSetting(shopId)
    ]);

    return (ctx.body = {
      notifications: dataNotifications,
      setting: dataSetting
    });
  } catch (e) {
    console.error(e);
  }
};
