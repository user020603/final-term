const Shopify = require('shopify-api-node');

(async () => {
  const shopify = new Shopify({
    shopName: 'quickstart-b973b955.myshopify.com',
    accessToken: 'shpua_0a6541f541a80a23f1bde04150eb788b'
  });

  const webhook = await shopify.webhook.list();
  console.log("\n********\n", webhook, "\n********\n");

    // await shopify.scriptTag.create({
    //   event: "onload",
    //   src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js'
    // })

    // await shopify.scriptTag.delete(235403968673);
})();
