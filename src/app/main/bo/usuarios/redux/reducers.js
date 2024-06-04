import Types from './types';

import Utils from './utils';

const INIT_STATE = {
  loading: true,
  error: undefined,
  data: undefined,
  selected: false,
  isExist: null
};

const Users = (state = INIT_STATE, action) => {
  switch (action.type) {
    case Types.FETCH_SUCCEEDED:
      return Utils.fetchToUsers(state, action.results);
    case Types.ADD_ITEM_SUCCEEDED:
      return Utils.addItemToUsers(state, action.itemAdded);
    case Types.EDIT_ITEM_SUCCEEDED:
      return Utils.editItemToUsers(state, action.itemEdited);
    // case Types.DELETE_ITEM_SUCCEEDED:
    //   return Utils.deleteItemToUsers(state, action.itemDeleted);
    case Types.FETCH:
      return { ...state, loading: true };
    case Types.ADD_ITEM:
    case Types.EDIT_ITEM:
    case Types.DELETE_ITEM:
      return { ...state, loading: false };
    case Types.FETCH_FAILED:
    case Types.ADD_ITEM_FAILED:
    case Types.EDIT_ITEM_FAILED:
    case Types.DELETE_ITEM_FAILED:
      return { ...state, error: action.message, loading: false };
    default:
      return { ...state };
  }
};

export default Users;
