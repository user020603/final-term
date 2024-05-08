const Shopify = require('shopify-api-node');

(async () => {
  const shopify = new Shopify({
    shopName: 'quickstart-b973b955.myshopify.com',
    accessToken: 'shpua_ac37edfd84a761c031e44c0db866dd6d'
  });

  const scriptTags = await shopify.scriptTag.list();
  console.log(scriptTags);

    // await shopify.scriptTag.create({
    //   event: "onload",
    //   src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js'
    // })

    // await shopify.scriptTag.delete(235403968673);
})();
