import {getShopByShopifyDomain} from '@avada/core';
import {getSetting} from '../repositories/settingRepository';
import { getNotificationsClientApi } from '../repositories/notificationRepository';

export const getData = async ctx => {
  const domain = ctx.query.shopifyDomain;
  const shop = await getShopByShopifyDomain(domain);
  const shopId = shop.id;

  const dataNotifications = await getNotificationsClientApi(domain);
  const dataSetting = await getSetting(shopId);

  return (ctx.body = {
    notifications: dataNotifications,
    setting: dataSetting
  });
};
