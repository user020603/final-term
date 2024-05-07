import React, {useEffect} from 'react';
import {Card, Layout, Page, Text} from '@shopify/polaris';
import NotificationList from './listItems.js';

/**
 * @return {JSX.Element}
 */
export default function Notifications() {
  return (
    <Page title="Notifications" subtitle="List of sales notification from Shopify" fullWidth>
      <NotificationList />
    </Page>
  );
}

Notifications.propTypes = {};
