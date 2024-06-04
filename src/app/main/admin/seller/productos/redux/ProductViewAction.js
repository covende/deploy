export const DELETE = 'DELETE';

export const A_PRODUCTVIEW = (data) => ({
  type: 'PRODUCTVIEW',
  data: data
});

export const ON_DELETE = (isDelete) => ({
  type: DELETE,
  data: isDelete
});
