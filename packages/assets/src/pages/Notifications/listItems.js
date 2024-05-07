import {ResourceList, ResourceItem, Card} from '@shopify/polaris';
import {useState, useEffect} from 'react';

import useFetchApi from '../../hooks/api/useFetchApi.js';
import {api} from '../../helpers';

import NotificationPopup from './item';

function NotificationList() {
  async function callApi() {
    const data = await api('/notifications');
    setInput(data);
  }

  useEffect(() => {
    callApi();
  }, []);

  const {loading, data: input, setData: setInput, setLoading} = useFetchApi('/notifications');

  // console.log(input);

  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [selectedItems, setSelectedItems] = useState();

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  return (
    <Card padding="0">
      <ResourceList
        resourceName={resourceName}
        items={input}
        renderItem={renderItem}
        sortValue={sortValue}
        sortOptions={[
          {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
          {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
        ]}
        onSortChange={selected => {
          setSortValue(selected);
          console.log(`Sort option changed to ${selected}.`);
        }}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        pagination={{
          hasNext: true,
          onNext: () => {}
        }}
      />
    </Card>
  );

  function renderItem(item) {
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
}

export default NotificationList;
