import {getNotifications} from '../repositories/notificationRepository';

export async function handleGetNotifications(ctx) {
  try {
    const limit = ctx.query.limit;
    const page = ctx.query.page;
    const data = await getNotifications({limit, page});
    ctx.body = data;
  } catch (e) {
    console.error(e);
  }
}
