import Types from './types';

import Utils from './utils';

const INIT_STATE = {
  loading: true,
  error: undefined,
  data: undefined,
  selected: false,
  isExist: null
};

const Plans = (state = INIT_STATE, action) => {
  switch (action.type) {
    case Types.FETCH_SUCCEEDED:
      return Utils.fetchToPlans(state, action.results);
    case Types.FETCH_BY_ROLE_SUCCEEDED:
      return Utils.fetchByRolesToPlans(state, action.results);
    case Types.ADD_ITEM_SUCCEEDED:
      return Utils.addItemToPlans(state, action.itemAdded);
    case Types.EDIT_ITEM_SUCCEEDED:
      return Utils.editItemToPlans(state, action.itemEdited);
    case Types.DELETE_ITEM_SUCCEEDED:
      return Utils.deleteItemToPlans(state, action.itemDeleted);
    case Types.FETCH:
      return { ...state, loading: true };
    case Types.ADD_ITEM:
    case Types.EDIT_ITEM:
    case Types.DELETE_ITEM:
      return { ...state, loading: false };
    case Types.FETCH_FAILED:
    case Types.FETCH_BY_ROLE_FAILED:
    case Types.ADD_ITEM_FAILED:
    case Types.EDIT_ITEM_FAILED:
    case Types.DELETE_ITEM_FAILED:
      return { ...state, error: action.message, loading: false };
    default:
      return { ...state };
  }
};

export default Plans;
