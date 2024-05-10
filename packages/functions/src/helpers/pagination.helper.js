const paginationHelper = (limit, page) => {
  const objectPagination = {
    currentPage: 1,
    limitItems: limit
  };

  if (page) {
    objectPagination.currentPage = parseInt(page);
  }

  if (limit) {
    objectPagination.limitItems = parseInt(limit);
  }

  objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

  return objectPagination;
};

export default paginationHelper;
