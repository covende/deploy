import Types from './types';

// ######################################
// ## Gestión de Banners de categorias ##
// ######################################
const BannersCategory = {
  fetch: (variables) => ({
    type: Types.BANNERS_CATEGORY.FETCH,
    payload: variables
  }),
  fetchSucceeded: (results) => ({
    type: Types.BANNERS_CATEGORY.FETCH_SUCCEEDED,
    results
  }),
  fetchFailed: (error) => ({
    type: Types.BANNERS_CATEGORY.FETCH_FAILED,
    message: error
  }),
  addItem: (data) => ({
    type: Types.BANNERS_CATEGORY.ADD_ITEM,
    payload: data
  }),
  addItemSucceeded: (item) => ({
    type: Types.BANNERS_CATEGORY.ADD_ITEM_SUCCEEDED,
    payload: item
  }),
  addItemFailed: (error) => ({
    type: Types.BANNERS_CATEGORY.ADD_ITEM_FAILED,
    message: error
  }),
  editItem: (data) => ({
    type: Types.BANNERS_CATEGORY.EDIT_ITEM,
    payload: data
  }),
  editItemSucceeded: (item) => ({
    type: Types.BANNERS_CATEGORY.EDIT_ITEM_SUCCEEDED,
    payload: item
  }),
  editItemFailed: (error) => ({
    type: Types.BANNERS_CATEGORY.EDIT_ITEM_FAILED,
    message: error
  }),
  deleteItem: (data) => ({
    type: Types.BANNERS_CATEGORY.DELETE_ITEM,
    payload: data
  }),
  deleteItemSucceeded: (item) => ({
    type: Types.BANNERS_CATEGORY.DELETE_ITEM_SUCCEEDED,
    payload: item
  }),
  deleteItemFailed: (error) => ({
    type: Types.BANNERS_CATEGORY.DELETE_ITEM_FAILED,
    message: error
  })
};
// ############################################
// ## Gestión de Banners de "Crea tu tienda" ##
// ############################################
const BannersCreaTienda = {
  fetch: () => ({
    type: Types.BANNER_CREA_TIENDA.FETCH,
    payload: null
  }),
  fetchSucceeded: (results) => ({
    type: Types.BANNER_CREA_TIENDA.FETCH_SUCCEEDED,
    results
  }),
  fetchFailed: (error) => ({
    type: Types.BANNER_CREA_TIENDA.FETCH_FAILED,
    message: error
  }),
  addItem: (data) => ({
    type: Types.BANNER_CREA_TIENDA.ADD_ITEM,
    payload: data
  }),
  addItemSucceeded: (item) => ({
    type: Types.BANNER_CREA_TIENDA.ADD_ITEM_SUCCEEDED,
    payload: item
  }),
  addItemFailed: (error) => ({
    type: Types.BANNER_CREA_TIENDA.ADD_ITEM_FAILED,
    message: error
  }),
  editItem: (data) => ({
    type: Types.BANNER_CREA_TIENDA.EDIT_ITEM,
    payload: data
  }),
  editItemSucceeded: (item) => ({
    type: Types.BANNER_CREA_TIENDA.EDIT_ITEM_SUCCEEDED,
    payload: item
  }),
  editItemFailed: (error) => ({
    type: Types.BANNER_CREA_TIENDA.EDIT_ITEM_FAILED,
    message: error
  }),
  deleteItem: (data) => ({
    type: Types.BANNER_CREA_TIENDA.DELETE_ITEM,
    payload: data
  }),
  deleteItemSucceeded: (item) => ({
    type: Types.BANNER_CREA_TIENDA.DELETE_ITEM_SUCCEEDED,
    payload: item
  }),
  deleteItemFailed: (error) => ({
    type: Types.BANNER_CREA_TIENDA.DELETE_ITEM_FAILED,
    message: error
  })
};

// ################################
// ## Gestión de Banners de Home ##
// ################################
const BannersHome = {
  fetch: () => ({
    type: Types.BANNERS_HOME.FETCH,
    payload: null
  }),
  fetchSucceeded: (results) => ({
    type: Types.BANNERS_HOME.FETCH_SUCCEEDED,
    results
  }),
  fetchFailed: (error) => ({
    type: Types.BANNERS_HOME.FETCH_FAILED,
    message: error
  }),
  addItem: (data) => ({
    type: Types.BANNERS_HOME.ADD_ITEM,
    payload: data
  }),
  addItemSucceeded: (item) => ({
    type: Types.BANNERS_HOME.ADD_ITEM_SUCCEEDED,
    payload: item
  }),
  addItemFailed: (error) => ({
    type: Types.BANNERS_HOME.ADD_ITEM_FAILED,
    message: error
  }),
  editItem: (data) => ({
    type: Types.BANNERS_HOME.EDIT_ITEM,
    payload: data
  }),
  editItemSucceeded: (item) => ({
    type: Types.BANNERS_HOME.EDIT_ITEM_SUCCEEDED,
    payload: item
  }),
  editItemFailed: (error) => ({
    type: Types.BANNERS_HOME.EDIT_ITEM_FAILED,
    message: error
  }),
  deleteItem: (data) => ({
    type: Types.BANNERS_HOME.DELETE_ITEM,
    payload: data
  }),
  deleteItemSucceeded: (item) => ({
    type: Types.BANNERS_HOME.DELETE_ITEM_SUCCEEDED,
    payload: item
  }),
  deleteItemFailed: (error) => ({
    type: Types.BANNERS_HOME.DELETE_ITEM_FAILED,
    message: error
  })
};

// #################################
// ## Gestión de Banners de Login ##
// #################################
const BannersLogin = {
  fetch: () => ({
    type: Types.BANNER_LOGIN.FETCH,
    payload: null
  }),
  fetchSucceeded: (results) => ({
    type: Types.BANNER_LOGIN.FETCH_SUCCEEDED,
    results
  }),
  fetchFailed: (error) => ({
    type: Types.BANNER_LOGIN.FETCH_FAILED,
    message: error
  }),
  addItem: (data) => ({
    type: Types.BANNER_LOGIN.ADD_ITEM,
    payload: data
  }),
  addItemSucceeded: (item) => ({
    type: Types.BANNER_LOGIN.ADD_ITEM_SUCCEEDED,
    payload: item
  }),
  addItemFailed: (error) => ({
    type: Types.BANNER_LOGIN.ADD_ITEM_FAILED,
    message: error
  }),
  editItem: (data) => ({
    type: Types.BANNER_LOGIN.EDIT_ITEM,
    payload: data
  }),
  editItemSucceeded: (item) => ({
    type: Types.BANNER_LOGIN.EDIT_ITEM_SUCCEEDED,
    payload: item
  }),
  editItemFailed: (error) => ({
    type: Types.BANNER_LOGIN.EDIT_ITEM_FAILED,
    message: error
  }),
  deleteItem: (data) => ({
    type: Types.BANNER_LOGIN.DELETE_ITEM,
    payload: data
  }),
  deleteItemSucceeded: (item) => ({
    type: Types.BANNER_LOGIN.DELETE_ITEM_SUCCEEDED,
    payload: item
  }),
  deleteItemFailed: (error) => ({
    type: Types.BANNER_LOGIN.DELETE_ITEM_FAILED,
    message: error
  })
};

// ##############################
// ## Gestión de Todas Ofertas ##
// ##############################
const BannersOffers = {
  fetch: (variables) => ({
    type: Types.BANNERS_OFFERS.FETCH,
    payload: variables
  }),
  fetchSucceeded: (results) => ({
    type: Types.BANNERS_OFFERS.FETCH_SUCCEEDED,
    results
  }),
  fetchFailed: (error) => ({
    type: Types.BANNERS_OFFERS.FETCH_FAILED,
    message: error
  }),
  addItem: (data) => ({
    type: Types.BANNERS_OFFERS.ADD_ITEM,
    payload: data
  }),
  addItemSucceeded: (item) => ({
    type: Types.BANNERS_OFFERS.ADD_ITEM_SUCCEEDED,
    payload: item
  }),
  addItemFailed: (error) => ({
    type: Types.BANNERS_OFFERS.ADD_ITEM_FAILED,
    message: error
  }),
  editItem: (data) => ({
    type: Types.BANNERS_OFFERS.EDIT_ITEM,
    payload: data
  }),
  editItemSucceeded: (item) => ({
    type: Types.BANNERS_OFFERS.EDIT_ITEM_SUCCEEDED,
    payload: item
  }),
  editItemFailed: (error) => ({
    type: Types.BANNERS_OFFERS.EDIT_ITEM_FAILED,
    message: error
  }),
  deleteItem: (data) => ({
    type: Types.BANNERS_OFFERS.DELETE_ITEM,
    payload: data
  }),
  deleteItemSucceeded: (item) => ({
    type: Types.BANNERS_OFFERS.DELETE_ITEM_SUCCEEDED,
    payload: item
  }),
  deleteItemFailed: (error) => ({
    type: Types.BANNERS_OFFERS.DELETE_ITEM_FAILED,
    message: error
  })
};

export default {
  BannersCategory,
  BannersCreaTienda,
  BannersHome,
  BannersLogin,
  BannersOffers
};
