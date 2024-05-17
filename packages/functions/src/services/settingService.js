import {addSetting} from '../repositories/settingRepository';
import {defaultSetting} from '../helpers/defaultSetting';

export async function addDefaultSetting(shop, setting = defaultSetting) {
  const shopId = shop.id;
  const shopifyDomain = shop.shopifyDomain;
  setting.shopId = shopId;
  setting.shopifyDomain = shopifyDomain;
  await addSetting(setting);
}
