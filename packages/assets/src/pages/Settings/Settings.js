import React, {useEffect, useState} from 'react';
import {Layout, Page, LegacyCard, Button} from '@shopify/polaris';
import NotificationPopup from '../Notifications/item.js';
import TabsInsideOfACardExample from './Tab.js';

import {api} from '../../helpers.js';

/**
 * @return {JSX.Element}
 */

export default function Settings() {
  const {input, component: TabsComponent} = TabsInsideOfACardExample();

  const handleSave = async () => {
    await api('/settings', {
      method: 'PUT',
      body: input,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  };

  return (
    <div>
      <Page
        title="Settings"
        subtitle="Decide how your notifications will display"
        primaryAction={
          <Button variant="primary" size="large" tone="success" submit onClick={handleSave}>
            Save
          </Button>
        }
        fullWidth
      >
        <Layout>
          <Layout.Section variant="oneThird">
            <LegacyCard sectioned>
              <NotificationPopup />
            </LegacyCard>
          </Layout.Section>

          <Layout.Section variant="twoThirds">
            {/* <LegacyCard sectioned> */}
            {TabsComponent}
            {/* </LegacyCard> */}
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
}
Settings.propTypes = {};
