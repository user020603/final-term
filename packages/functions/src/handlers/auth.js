import App from 'koa';
import 'isomorphic-fetch';
import {contentSecurityPolicy, shopifyAuth, getShopByShopifyDomain} from '@avada/core';
import shopifyConfig from '@functions/config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '@functions/middleware/errorHandler';
import firebase from 'firebase-admin';
import appConfig from '@functions/config/app';
import {Firestore} from '@google-cloud/firestore';

import Shopify from 'shopify-api-node';

const db = new Firestore();

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

const defaultSettings = {
  position: 'bottom-left',
  hideTimeAgo: false,
  truncateProductName: false,
  displayDuration: 3,
  firstDelay: 5,
  popsInterval: 2,
  maxPopsDisplay: 10,
  includedUrls: 'http://example.com/?account=basket&airport=approval',
  excludedUrls: 'http://www.example.com/approval/act.html',
  allowShow: 'all'
};

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());
app.use(contentSecurityPolicy(true));

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/embed',
    initialPlan: {
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      features: {}
    },
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true,
    afterThemePublish: ctx => {
      // Publish assets when theme is published or changed here
      return (ctx.body = {
        success: true
      });
    },
    afterInstall: async ctx => {
      try {
        const settingsRef = db.collection('settings');
        const notificationRef = db.collection('notifications');

        const shopifyDomain = ctx.state.shopify.shop;
        const shop = await getShopByShopifyDomain(shopifyDomain);

        const shopify = new Shopify({
          accessToken: shop.accessToken,
          shopName: shop.shopifyDomain
        });

        const orders = await shopify.order.list({
          status: 'any',
          limit: 30
        });

        let promises = orders.map(order => {
          const product = order.line_items[0];
          const notification = {
            id: orderData.id,
            shopId: shop.id,
            shopifyDomain: shopifyDomain,
            firstName: orderData.billing_address.first_name,
            city: orderData.billing_address.city,
            productName: product.title,
            country: orderData.billing_address.country,
            productImage:
              product.image ||
              'https://th.bing.com/th/id/OIP.vTAHYPeLEe8WzfcZyndQugHaEK?rs=1&pid=ImgDetMain',
            timestamp: new Date(orderData.created_at).getTime()
          };
          return notificationRef.add(notification);
        });

        Promise.all(promises)
          .then(() => console.log('All notifications added successfully'))
          .catch(err => console.error('Error adding notifications: ', err));

        const snapshotSettings = await settingsRef
          .where('shopId', '==', shop.id)
          .limit(1)
          .get();

        if (!snapshotSettings.empty) {
          const doc = snapshotSettings.docs[0];
          await settingsRef.doc(doc.id).update(defaultSettings);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }).routes()
);

// Handling all errors
app.on('error', err => {
  console.error(err);
});

export default app;
