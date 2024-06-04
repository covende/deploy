export const BASIC_TYPES = {
  FETCH: 'FETCH',
  FETCH_SUCCEEDED: 'FETCH_SUCCEEDED',
  FETCH_FAILED: 'FETCH_FAILED',
  ADD_ITEM: 'ADD_ITEM',
  ADD_ITEM_SUCCEEDED: 'ADD_ITEM_SUCCEEDED',
  ADD_ITEM_FAILED: 'ADD_ITEM_FAILED',
  EDIT_ITEM: 'EDIT_ITEM',
  EDIT_ITEM_SUCCEEDED: 'EDIT_ITEM_SUCCEEDED',
  EDIT_ITEM_FAILED: 'EDIT_ITEM_FAILED',
  DELETE_ITEM: 'DELETE',
  DELETE_ITEM_SUCCEEDED: 'DELETE_SUCCEEDED',
  DELETE_ITEM_FAILED: 'DELETE_FAILED'
};

export const basicTypes = (nameModule) => {
  const keys = Object.keys(BASIC_TYPES);
  const newTypeModule = {};
  let parts;
  let joinParts;
  keys.map((basic_type) => {
    parts = basic_type.split('_');
    parts.splice(1, 0, nameModule);
    joinParts = parts.join('_');
    newTypeModule[basic_type] = joinParts;
  });

  return newTypeModule;
};
