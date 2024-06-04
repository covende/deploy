import Types from './types';

const fetch = (variables) => ({
  type: Types.FETCH,
  payload: variables
});

const fetchSucceeded = (results) => ({
  type: Types.FETCH_SUCCEEDED,
  results
});

const fetchFailed = (error) => ({
  type: Types.FETCH_FAILED,
  message: error
});

const fetchByRole = (variables) => ({
  type: Types.FETCH_BY_ROLE,
  payload: variables
});

const fetchByRoleSucceeded = (results) => ({
  type: Types.FETCH_BY_ROLE_SUCCEEDED,
  results
});

const fetchByRoleFailed = (error) => ({
  type: Types.FETCH_BY_ROLE_FAILED,
  message: error
});

const addItem = (data) => ({
  type: Types.ADD_ITEM,
  payload: data
});

const addSucceeded = (item) => ({
  type: Types.ADD_ITEM_SUCCEEDED,
  itemAdded: item
});

const addFailed = (error) => ({
  type: Types.ADD_ITEM_FAILED,
  message: error
});

const editItem = (data) => ({
  type: Types.EDIT_ITEM,
  payload: data
});

const editSucceeded = (item) => ({
  type: Types.EDIT_ITEM_SUCCEEDED,
  itemEdited: item
});

const editFailed = (error) => ({
  type: Types.EDIT_ITEM_FAILED,
  message: error
});

const deleteItem = (data) => ({
  type: Types.DELETE_ITEM,
  payload: data
});

const deleteSucceeded = (item) => ({
  type: Types.DELETE_ITEM_SUCCEEDED,
  itemDeleted: item
});

const deleteFailed = (error) => ({
  type: Types.DELETE_ITEM_FAILED,
  message: error
});

export default {
  fetch,
  fetchSucceeded,
  fetchFailed,
  fetchByRole,
  fetchByRoleSucceeded,
  fetchByRoleFailed,
  addItem,
  addSucceeded,
  addFailed,
  editItem,
  editSucceeded,
  editFailed,
  deleteItem,
  deleteSucceeded,
  deleteFailed
};
