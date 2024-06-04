import Types from './types';

const fetch = () => ({
  type: Types.FETCH,
  payload: null
});

const fetchSucceeded = (results) => ({
  type: Types.FETCH_SUCCEEDED,
  results
});

const fetchFailed = (error) => ({
  type: Types.FETCH_FAILED,
  message: error
});

const addItem = (data) => ({
  type: Types.ADD_ITEM,
  payload: data
});

const addSucceeded = (item) => ({
  type: Types.ADD_ITEM_SUCCEEDED,
  payload: item
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
  payload: item
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
  payload: item
});

const deleteFailed = (error) => ({
  type: Types.DELETE_ITEM_FAILED,
  message: error
});

export default {
  fetch,
  fetchSucceeded,
  fetchFailed,
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
