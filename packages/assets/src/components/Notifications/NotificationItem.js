import {ResourceItem, LegacyStack, BlockStack, Text, LegacyCard} from '@shopify/polaris';
import NotificationPopup from './item';
import moment from 'moment';

function NotificationItem(item) {
  const {id, firstName, city, country, productName, createdAt, productImage, settings} = item;

  return (
    <ResourceItem id={id}>
      <LegacyStack>
        <LegacyStack.Item fill>
          <NotificationPopup
            id={id}
            firstName={firstName}
            city={city}
            country={country}
            productName={productName}
            timestamp={new Date(createdAt._seconds * 1000)}
            productImage={productImage}
            settings={settings}
          />
        </LegacyStack.Item>
        <BlockStack inlineAlign="end">
          <Text>From {moment(new Date(createdAt._seconds * 1000)).format('MMM DD')},</Text>
          <Text>{moment(new Date(createdAt._seconds * 1000)).format('YYYY')}</Text>
        </BlockStack>
      </LegacyStack>
    </ResourceItem>
  );
}

export default NotificationItem;
