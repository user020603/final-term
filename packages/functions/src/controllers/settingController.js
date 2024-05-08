import {getSettings} from '../repositories/settingRepository';
import {updateSettings} from '../repositories/settingRepository';
import {getCurrentUserShopId} from '@avada/core/build/authentication';

export async function handleGetSettings(ctx) {
  try {
    console.log('######### handleGetSettings');
    const shopId = getCurrentUserShopId(ctx);
    const data = await getSettings(shopId);
    ctx.body = data[0];
  } catch (e) {
    console.error(e);
  }
}

export function handleUpdateSettings(ctx) {
  try {
    const settings = ctx.req.body;
    const shopId = getCurrentUserShopId(ctx);
    updateSettings(shopId, settings);
    ctx.body = settings;
  } catch (e) {
    console.error(e);
  }
}
