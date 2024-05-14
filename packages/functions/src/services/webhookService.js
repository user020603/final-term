import data from '../../../functions/.runtimeconfig.json';

export const createWebhook = async (shopify) => {
  console.log('\n****************\n Create webhook \n**************\n');
  await shopify.webhook.create({
    topic: 'orders/create',
    address: `https://${data.app.base_url}/webhook/order/new`,
    format: 'json'
  });
  console.log('\n****************\n End create webhook \n**************\n');
}