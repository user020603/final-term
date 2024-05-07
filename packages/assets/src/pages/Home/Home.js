import React, {useEffect, useState} from 'react';
import {Layout, Page, SettingToggle, Text} from '@shopify/polaris';
/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Page title="Home">
      <Layout>
        <Layout.Section>
          <SettingToggle
            action={{
              content: enabled ? 'Disable' : 'Enable',
              onAction() {
                setEnabled(prev => !prev);
              }
            }}
            enabled={enabled}
          >
            <Text variant="bodyMd" as="span">
              App status is {enabled ? <strong>enabled</strong> : <strong>disabled</strong>}
            </Text>
          </SettingToggle>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
