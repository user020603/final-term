import {getSetting} from '../repositories/settingRepository';
import {updateSetting} from '../repositories/settingRepository';
import {getCurrentUserShopId} from '@avada/core/build/authentication';

export async function handleGetSetting(ctx) {
  try {
    console.log('######### handleGetSetting');
    const shopId = getCurrentUserShopId(ctx);
    const data = await getSetting(shopId);
    ctx.body = data[0];
  } catch (e) {
    console.error(e);
  }
}

export function handleUpdateSetting(ctx) {
  try {
    const setting = ctx.req.body;
    const shopId = getCurrentUserShopId(ctx);
    updateSetting(shopId, setting);
    ctx.body = setting;
  } catch (e) {
    console.error(e);
  }
}
