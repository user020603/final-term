import {CollectionGroup} from '@google-cloud/firestore';
import {getNotifications} from '../repositories/notificationRepository';

export async function handleGetNotifications(ctx) {
  try {
    const limit = ctx.query.limit;
    const page = ctx.query.page;
    const sort = ctx.query.sort;
    const {data, pageInfo} = await getNotifications({limit, page, sort});
    ctx.body = {
      data,
      pageInfo
    };
  } catch (e) {
    console.error(e);
  }
}
