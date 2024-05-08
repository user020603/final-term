import {ResourceItem} from '@shopify/polaris';
import NotificationPopup from './item';

function NotificationItem(item) {
  const {id, firstName, city, country, productName, timestamp, productImage, settings} = item;

  return (
    <ResourceItem id={id}>
      <NotificationPopup
        id={id}
        firstName={firstName}
        city={city}
        country={country}
        productName={productName}
        timestamp={timestamp}
        productImage={productImage}
        settings={settings}
      />
    </ResourceItem>
  );
}

export default NotificationItem;
