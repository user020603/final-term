import {LegacyCard, Page, Layout, SkeletonBodyText, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import useFetchApi from '../../hooks/api/useFetchApi.js';
import useEditApi from '../../hooks/api/useEditApi.js';
import NotificationPopup from '../../components/Notifications/item.js';
import defaultSetting from "../../helpers/defaultSetting"
import DisplayTab from '../../components/Settings/DisplayTab.js';
import TriggerTab from '../../components/Settings/TriggerTab.js';

function TabSettings() {
  const [selectedTab, setSelectedTab] = useState(0);

  const {data: input, handleChangeInput, loading} = useFetchApi({
    url: '/setting',
    defaultData: defaultSetting
  });

  const {editing, handleEdit: handleSaveSetting} = useEditApi({
    url: '/setting'
  });

  const handleTabChange = useCallback(selectedTabIndex => setSelectedTab(selectedTabIndex), []);

  const items = {
    firstName: 'Nole',
    city: 'CA',
    country: 'United States',
    productName: 'Iphone 15 Pro Max',
    productImage:
      'https://product.hstatic.net/200000409445/product/xanh_d19c3d1580d34a45a0dfca7ad7499de7_master.jpg'
  };

  const tabs = [
    {
      id: 'display-1',
      content: 'Display',
      accessibilityLabel: 'Display',
      panelID: 'display-setting-1',
      component: <DisplayTab input={input} handleChangeInput={handleChangeInput} />
    },
    {
      id: 'trigger-1',
      content: 'Triggers',
      accessibilityLabel: 'Trigger',
      panelID: 'trigger-setting-1',
      component: <TriggerTab input={input} handleChangeInput={handleChangeInput} />
    }
  ];

  if (loading)
    return (
      <Page title="Settings" fullWidth subtitle="Decide how your notifications will display">
        <Layout>
          <Layout.Section variant="oneThird">
            <LegacyCard sectioned>
              <SkeletonBodyText lines={5} />
            </LegacyCard>
          </Layout.Section>
          <Layout.Section>
            <LegacyCard sectioned>
              <SkeletonBodyText lines={10} />
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Page>
    );

  console.log(input);

  return (
    <Page
      title="Settings"
      fullWidth
      subtitle="Decide how your notifications will display"
      primaryAction={{
        content: 'Save',
        onAction: () => {
          handleSaveSetting(input);
        },
        loading: editing
      }}
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <NotificationPopup
            city={items.city}
            country={items.country}
            firstName={items.firstName}
            productImage={items.productImage}
            productName={items.productName}
            settings={input}
          ></NotificationPopup>
        </Layout.Section>
        <Layout.Section variant="twoThirds">
          <LegacyCard>
            <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
              <LegacyCard.Section title={tabs[selectedTab].content}>
                {tabs[selectedTab].component}
              </LegacyCard.Section>
            </Tabs>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default TabSettings;
