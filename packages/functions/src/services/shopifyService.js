import Shopify from 'shopify-api-node';

export const createShopify = shop => {
  return new Shopify({
    accessToken: shop.accessToken,
    shopName: shop.shopifyDomain
  });
};

