import {ResourceItem} from '@shopify/polaris';
import NotificationPopup from './item';

function NotificationItem(item) {
  const {id, firstName, city, country, productName, createdAt, productImage, settings} = item;

  return (
    <ResourceItem id={id}>
      <NotificationPopup
        id={id}
        firstName={firstName}
        city={city}
        country={country}
        productName={productName}
        timestamp={createdAt}
        productImage={productImage}
        settings={settings}
      />
    </ResourceItem>
  );
}

export default NotificationItem;
