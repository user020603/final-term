import {ResourceList, Card} from '@shopify/polaris';
import useFetchApi from '../../hooks/api/useFetchApi.js';
import LoadingCard from '../../components/Notifications/LoadingCard.js';
import NotificationItem from '../../components/Notifications/NotificationItem.js';

function NotificationList() {
  const {
    data: input,
    loading,
    sortValue,
    setSortValue,
    selectedItems,
    setSelectedItems
  } = useFetchApi({url: '/notifications'});

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  if (loading) {
    return <LoadingCard />;
  }

  return (
    <Card padding="0">
      <ResourceList
        resourceName={resourceName}
        items={input}
        renderItem={NotificationItem}
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
}

export default NotificationList;
