import {CollectionGroup} from '@google-cloud/firestore';
import {getNotifications} from '../repositories/notificationRepository';
import {getCurrentUserShopId} from '@avada/core/build/authentication';

export async function handleGetNotifications(ctx) {
  try {
    const limit = ctx.query.limit;
    const page = ctx.query.page;
    const sort = ctx.query.sort;
    const shopId = getCurrentUserShopId(ctx);
    const {data, pageInfo} = await getNotifications({limit, page, sort, shopId});
    ctx.body = {
      data,
      pageInfo
    };
  } catch (e) {
    console.error(e);
  }
}
