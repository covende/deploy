import Types from './types';

import Utils from './utils';

const INIT_STATE = {
  BannersOffer: {
    loading: true,
    error: undefined,
    data: undefined,
    selected: false
  },
  BannersCategory: {
    loading: true,
    error: undefined,
    data: undefined,
    selected: false
  },
  BannersHome: {
    loading: true,
    error: undefined,
    data: undefined,
    selected: false
  },
  BannersLogin: {
    loading: true,
    error: undefined,
    data: undefined,
    selected: false
  },
  BannersCreateStore: {
    loading: true,
    error: undefined,
    data: undefined,
    selected: false
  }
};

const Backoffice_WebPublicEdition = (state = INIT_STATE, action) => {
  switch (action.type) {
    // #############
    // ## Comunes ##
    // #############
    case Types.BANNERS_OFFERS.FETCH:
      return {
        ...state,
        BannersOffer: { ...state.BannersOffer, loading: true }
      };
    case Types.BANNERS_CATEGORY.FETCH:
      return {
        ...state,
        BannersCategory: { ...state.BannersCategory, loading: true }
      };
    case Types.BANNERS_HOME.FETCH:
      return { ...state, BannersHome: { ...state.BannersHome, loading: true } };
    case Types.BANNER_LOGIN.FETCH:
      return {
        ...state,
        BannersLogin: { ...state.BannersLogin, loading: true }
      };
    case Types.BANNER_CREA_TIENDA.FETCH:
      return {
        ...state,
        BannersCreateStore: { ...state.BannersCreateStore, loading: true }
      };
    case Types.BANNERS_OFFERS.FETCH_SUCCEEDED:
      return Utils.BannersOffer.fetchSucceeded(state, action.results);
    case Types.BANNERS_CATEGORY.FETCH_SUCCEEDED:
      return Utils.BannersCategory.fetchSucceeded(state, action.results);
    case Types.BANNERS_HOME.FETCH_SUCCEEDED:
      return Utils.BannersHome.fetchSucceeded(state, action.results);
    case Types.BANNER_LOGIN.FETCH_SUCCEEDED:
      return Utils.BannersLogin.fetchSucceeded(state, action.results);
    case Types.BANNER_CREA_TIENDA.FETCH_SUCCEEDED:
      return Utils.BannersCreateStore.fetchSucceeded(state, action.results);
    case Types.BANNERS_OFFERS.ADD_ITEM:
    case Types.BANNERS_OFFERS.EDIT_ITEM:
    case Types.BANNERS_OFFERS.DELETE_ITEM:
      return {
        ...state,
        BannersOffer: { ...state.BannersOffer, loading: false }
      };
    case Types.BANNERS_CATEGORY.ADD_ITEM:
    case Types.BANNERS_CATEGORY.EDIT_ITEM:
    case Types.BANNERS_CATEGORY.DELETE_ITEM:
      return {
        ...state,
        BannersCategory: { ...state.BannersCategory, loading: false }
      };
    case Types.BANNERS_HOME.ADD_ITEM:
    case Types.BANNERS_HOME.EDIT_ITEM:
    case Types.BANNERS_HOME.DELETE_ITEM:
      return {
        ...state,
        BannersHome: { ...state.BannersHome, loading: false }
      };
    case Types.BANNER_LOGIN.ADD_ITEM:
    case Types.BANNER_LOGIN.EDIT_ITEM:
    case Types.BANNER_LOGIN.DELETE_ITEM:
      return {
        ...state,
        BannersLogin: { ...state.BannersLogin, loading: false }
      };
    case Types.BANNER_CREA_TIENDA.ADD_ITEM:
    case Types.BANNER_CREA_TIENDA.EDIT_ITEM:
    case Types.BANNER_CREA_TIENDA.DELETE_ITEM:
      return {
        ...state,
        BannersCreateStore: { ...state.BannersCreateStore, loading: false }
      };
    case Types.BANNERS_OFFERS.FETCH_FAILED:
    case Types.BANNERS_OFFERS.ADD_ITEM_FAILED:
    case Types.BANNERS_OFFERS.EDIT_ITEM_FAILED:
    case Types.BANNERS_OFFERS.DELETE_ITEM_FAILED:
      return {
        ...state,
        BannersOffer: {
          ...state.BannersOffer,
          error: action.message,
          loading: false
        }
      };
    case Types.BANNERS_CATEGORY.FETCH_FAILED:
    case Types.BANNERS_CATEGORY.ADD_ITEM_FAILED:
    case Types.BANNERS_CATEGORY.EDIT_ITEM_FAILED:
    case Types.BANNERS_CATEGORY.DELETE_ITEM_FAILED:
      return {
        ...state,
        BannersCategory: {
          ...state.BannersCategory,
          error: action.message,
          loading: false
        }
      };
    case Types.BANNERS_HOME.FETCH_FAILED:
    case Types.BANNERS_HOME.ADD_ITEM_FAILED:
    case Types.BANNERS_HOME.EDIT_ITEM_FAILED:
    case Types.BANNERS_HOME.DELETE_ITEM_FAILED:
      return {
        ...state,
        BannersHome: {
          ...state.BannersHome,
          error: action.message,
          loading: false
        }
      };
    case Types.BANNER_LOGIN.FETCH_FAILED:
    case Types.BANNER_LOGIN.ADD_ITEM_FAILED:
    case Types.BANNER_LOGIN.EDIT_ITEM_FAILED:
    case Types.BANNER_LOGIN.DELETE_ITEM_FAILED:
      return {
        ...state,
        BannersLogin: {
          ...state.BannersLogin,
          error: action.message,
          loading: false
        }
      };
    case Types.BANNER_CREA_TIENDA.FETCH_FAILED:
    case Types.BANNER_CREA_TIENDA.ADD_ITEM_FAILED:
    case Types.BANNER_CREA_TIENDA.EDIT_ITEM_FAILED:
    case Types.BANNER_CREA_TIENDA.DELETE_ITEM_FAILED:
      return {
        ...state,
        BannersCreateStore: {
          ...state.BannersCreateStore,
          error: action.message,
          loading: false
        }
      };
    // ##################################
    // ## Gestión de Todas las ofertas ##
    // ##################################
    case Types.BANNERS_OFFERS.ADD_ITEM_SUCCEEDED:
      return Utils.BannersOffer.addItemSucceeded(state, action.payload);
    case Types.BANNERS_OFFERS.EDIT_ITEM_SUCCEEDED:
      return Utils.BannersOffer.editItemSucceeded(state, action.payload);
    case Types.BANNERS_OFFERS.DELETE_ITEM_SUCCEEDED:
      return Utils.BannersOffer.deleteItemSucceeded(state, action.payload);
    // ######################################
    // ## Gestión de Banners de categorias ##
    // ######################################
    case Types.BANNERS_CATEGORY.ADD_ITEM_SUCCEEDED:
      return Utils.BannersCategory.addItemSucceeded(state, action.payload);
    case Types.BANNERS_CATEGORY.EDIT_ITEM_SUCCEEDED:
      return Utils.BannersCategory.editItemSucceeded(state, action.payload);
    case Types.BANNERS_CATEGORY.DELETE_ITEM_SUCCEEDED:
      return Utils.BannersCategory.deleteItemSucceeded(state, action.payload);
    // ################################
    // ## Gestión de Banners de Home ##
    // ################################
    case Types.BANNERS_HOME.ADD_ITEM_SUCCEEDED:
      return Utils.BannersHome.addItemSucceeded(state, action.payload);
    case Types.BANNERS_HOME.EDIT_ITEM_SUCCEEDED:
      return Utils.BannersHome.editItemSucceeded(state, action.payload);
    case Types.BANNERS_HOME.DELETE_ITEM_SUCCEEDED:
      return Utils.BannersHome.deleteItemSucceeded(state, action.payload);
    // #################################
    // ## Gestión de Banners de Login ##
    // #################################
    case Types.BANNER_LOGIN.ADD_ITEM_SUCCEEDED:
      return Utils.BannersLogin.addItemSucceeded(state, action.payload);
    case Types.BANNER_LOGIN.EDIT_ITEM_SUCCEEDED:
      return Utils.BannersLogin.editItemSucceeded(state, action.payload);
    case Types.BANNER_LOGIN.DELETE_ITEM_SUCCEEDED:
      return Utils.BannersLogin.deleteItemSucceeded(state, action.payload);
    // ############################################
    // ## Gestión de Banners de "Crea tu tienda" ##
    // ############################################
    case Types.BANNER_CREA_TIENDA.ADD_ITEM_SUCCEEDED:
      return Utils.BannersCreateStore.addItemSucceeded(state, action.payload);
    case Types.BANNER_CREA_TIENDA.EDIT_ITEM_SUCCEEDED:
      return Utils.BannersCreateStore.editItemSucceeded(state, action.payload);
    case Types.BANNER_CREA_TIENDA.DELETE_ITEM_SUCCEEDED:
      return Utils.BannersCreateStore.deleteItemSucceeded(
        state,
        action.payload
      );
    default:
      return { ...state };
  }
};

export default Backoffice_WebPublicEdition;
