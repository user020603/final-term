import {getNotifications} from '../repositories/notificationRepository';

export async function handleGetNotifications(ctx) {
  try {
    const data = await getNotifications();
    ctx.body = data;
  } catch (e) {
    console.error(e);
  }
}
