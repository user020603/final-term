import {ResourceList, Card} from '@shopify/polaris';
import LoadingCard from '../../components/Notifications/LoadingCard.js';
import NotificationItem from '../../components/Notifications/NotificationItem.js';
import usePaginate from '../../hooks/api/usePaginate.js';

function NotificationList() {
  const {
    prevPage,
    nextPage,
    onSort,
    data: input,
    loading,
    sortValue,
    setSortValue,
    selectedItems,
    setSelectedItems,
    pageInfo
  } = usePaginate({
    url: '/notifications',
    defaultData: [],
    initLoad: true,
    keepPreviousData: false,
    presentData: null,
    defaultLimit: 4,
    defaultSort: 'createdAt:desc',
    searchKey: 'searchKey',
    initQueries: {}
  });
  console.log(pageInfo.hasPre, pageInfo.hasNext);
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
          {label: 'Newest update', value: 'createdAt:desc'},
          {label: 'Oldest update', value: 'createdAt:asc'}
        ]}
        onSortChange={selected => {
          setSortValue(selected);
          onSort(selected);
          console.log(`Sort option changed to ${selected}.`);
        }}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        pagination={{
          hasNext: pageInfo.hasNext,
          hasPrevious: pageInfo.hasPre,
          onNext: nextPage,
          onPrevious: prevPage
        }}
      />
    </Card>
  );
}

export default NotificationList;
