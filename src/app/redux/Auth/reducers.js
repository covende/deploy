import { getMenu, getLoggedInUser } from '@/app/helpers/authUtils';
import Types from './types';
import Utils from './utils';

const INIT_STATE = {
  Backoffice: {
    // user: loggedInUser?.platformID === 'PBO' ? loggedInUser : null,
    loading: false,
    error: null,
    menu: JSON.parse(localStorage.getItem('menus'))
  },
  BuyerSeller: {
    // user: loggedInUser?.platformID === 'PBS' ? loggedInUser : null,
    loading: false,
    error: null,
    menu: JSON.parse(localStorage.getItem('menus'))
  }
};

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case Types.Backoffice.LOGIN:
    case Types.Backoffice.REGISTER:
    case Types.Backoffice.FORGET_PASSWORD:
      return {
        ...state,
        Backoffice: { ...state.Backoffice, loading: true }
      };
    case Types.BuyerSeller.LOGIN:
    case Types.BuyerSeller.REGISTER:
    case Types.BuyerSeller.FORGET_PASSWORD:
      return {
        ...state,
        BuyerSeller: { ...state.BuyerSeller, loading: true }
      };
    case Types.Backoffice.LOGIN_SUCCEEDED:
      return Utils.Backoffice.succeeded(state, action.payload);
    case Types.Backoffice.REGISTER_SUCCEEDED:
      return Utils.Backoffice.succeeded(state, action.payload);
    case Types.BuyerSeller.LOGIN_SUCCEEDED:
      return Utils.BuyerSeller.succeeded(state, action.payload);
    case Types.BuyerSeller.UPDATE_USER_DATA:
      return Utils.BuyerSeller.updateUser(state, action.payload);
    case Types.BuyerSeller.REGISTER_SUCCEEDED:
      return Utils.BuyerSeller.succeeded(state, action.payload);
    case Types.Backoffice.FORGET_PASSWORD_SUCCEEDED:
      return Utils.Backoffice.forgetPasswordSucceeded(state, action.payload);
    case Types.BuyerSeller.FORGET_PASSWORD_SUCCEEDED:
      return Utils.BuyerSeller.forgetPasswordSucceeded(state, action.payload);
    case Types.Backoffice.REGISTER_FAILED:
    case Types.Backoffice.LOGIN_FAILED:
    case Types.Backoffice.FORGET_PASSWORD_FAILED:
      return {
        ...state,
        Backoffice: {
          ...state.Backoffice,
          error: action.payload,
          loading: false
        }
      };
    case Types.BuyerSeller.REGISTER_FAILED:
    case Types.BuyerSeller.LOGIN_FAILED:
    case Types.BuyerSeller.FORGET_PASSWORD_FAILED:
      return {
        ...state,
        BuyerSeller: {
          ...state.BuyerSeller,
          error: action.payload,
          loading: false
        }
      };
    case Types.Backoffice.LOGOUT:
      return {
        ...state,
        Backoffice: { ...state.Backoffice, user: null }
      };
    case Types.BuyerSeller.LOGOUT:
      return { ...state, BuyerSeller: { ...state.BuyerSeller, user: null } };
    default:
      return { ...state };
  }
};

export default Auth;
