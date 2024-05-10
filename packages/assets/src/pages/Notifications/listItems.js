import {ResourceList, Card} from '@shopify/polaris';
import useFetchApi from '../../hooks/api/useFetchApi.js';
import LoadingCard from '../../components/Notifications/LoadingCard.js';
import NotificationItem from '../../components/Notifications/NotificationItem.js';
import usePaginate from '../../hooks/api/usePaginate.js';

function NotificationList() {
  // const {
  //   data: input,
  //   loading,
  //   sortValue,
  //   setSortValue,
  //   selectedItems,
  //   setSelectedItems
  // } = useFetchApi({url: '/notifications'});

  const {
    prevPage,
    nextPage,
    data: input,
    loading,
    sortValue,
    setSortValue,
    selectedItems,
    setSelectedItems
  } = usePaginate({
    url: '/notifications',
    defaultData: [],
    initLoad: true,
    keepPreviousData: false,
    presentData: null,
    defaultLimit: 2,
    defaultSort: 'createdAt:asc',
    searchKey: 'searchKey',
    initQueries: {}
  });

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
          hasPrevious: true,
          onNext: nextPage,
          onPrevious: prevPage
        }}
      />
    </Card>
  );
}

export default NotificationList;
