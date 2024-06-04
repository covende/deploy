import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import '@babel/polyfill'; // Saga requiere de esto

import Api from '@/app/api/graphql/banners';
import Types from './types';
import Actions from './actions';

// Data

/**
 * Listar BannersCategory
 * @param {*} payload - *
 */
function* fetchBannersCategory({ payload: variables }) {
  try {
    const response =
      variables && variables.category_product_id
        ? yield call(
            Api.BannersCategory.fetchBannerCategoriesByCategoryProductId,
            variables
          )
        : yield call(Api.BannersCategory.fetchBannerCategories);
    yield put(Actions.BannersCategory.fetchSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersCategory.fetchFailed(message));
  }
}

/**
 * Agregar BannersCategoryItem
 * @param {*} payload - *
 */
function* addBannersCategoryItem({ payload: variables }) {
  try {
    const response = yield call(
      Api.BannersCategory.addBannerCategoryItem,
      variables
    );
    yield put(Actions.BannersCategory.addItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersCategory.addItemFailed(message));
  }
}

/**
 * Editar BannersCategoryItem
 * @param {*} payload - *
 */
function* editBannersCategoryItem({ payload: variables }) {
  try {
    const response = yield call(
      Api.BannersCategory.editBannerCategoryItem,
      variables
    );
    yield put(Actions.BannersCategory.editItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersCategory.editItemFailed(message));
  }
}

/**
 * Eliminar BannersCategoryItem
 * @param {*} payload - *
 */
function* deleteBannersCategoryItem({ payload: variables }) {
  try {
    const response = yield call(
      Api.BannersCategory.deleteBannerCategoryItem,
      variables
    );
    yield put(Actions.BannersCategory.deleteItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersCategory.deleteItemFailed(message));
  }
}

/**
 * Listar BannersCreaTienda
 * @param {*} payload - *
 */
function* fetchBannersCreaTienda() {
  try {
    const response = yield call(Api.BannersCreaTienda.fetchBannerCreateStore);
    yield put(Actions.BannersCreaTienda.fetchSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersCreaTienda.fetchFailed(message));
  }
}

/**
 * Agregar BannersCreaTiendaItem
 * @param {*} payload - *
 */
function* addBannersCreaTiendaItem({ payload: variables }) {
  try {
    const response = yield call(
      Api.BannersCreaTienda.addBannerCreateStoreItem,
      variables
    );
    yield put(Actions.BannersCreaTienda.addItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersCreaTienda.addItemFailed(message));
  }
}

/**
 * Editar BannersCreaTiendaItem
 * @param {*} payload - *
 */
function* editBannersCreaTiendaItem({ payload: variables }) {
  try {
    const response = yield call(
      Api.BannersCreaTienda.editBannerCreateStoreItem,
      variables
    );
    yield put(Actions.BannersCreaTienda.editItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersCreaTienda.editItemFailed(message));
  }
}

/**
 * Eliminar BannersCreaTiendaItem
 * @param {*} payload - *
 */
function* deleteBannersCreaTiendaItem({ payload: variables }) {
  try {
    const response = yield call(
      Api.BannersCreaTienda.deleteBannerCreateStoreItem,
      variables
    );
    yield put(Actions.BannersCreaTienda.deleteItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersCreaTienda.deleteItemFailed(message));
  }
}

/**
 * Listar BannersHome
 * @param {*} payload - *
 */
function* fetchBannersHome() {
  try {
    const response = yield call(Api.BannersHome.fetchBannerHome);
    yield put(Actions.BannersHome.fetchSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersHome.fetchFailed(message));
  }
}

/**
 * Agregar BannersHomeItem
 * @param {*} payload - *
 */
function* addBannersHomeItem({ payload: variables }) {
  try {
    const response = yield call(Api.BannersHome.addBannerHomeItem, variables);
    yield put(Actions.BannersHome.addItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersHome.addItemFailed(message));
  }
}

/**
 * Editar BannersHomeItem
 * @param {*} payload - *
 */
function* editBannersHomeItem({ payload: variables }) {
  try {
    const response = yield call(Api.BannersHome.editBannerHomeItem, variables);
    yield put(Actions.BannersHome.editItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersHome.editItemFailed(message));
  }
}

/**
 * Eliminar BannersHomeItem
 * @param {*} payload - *
 */
function* deleteBannersHomeItem({ payload: variables }) {
  try {
    const response = yield call(
      Api.BannersHome.deleteBannerHomeItem,
      variables
    );
    yield put(Actions.BannersHome.deleteItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersHome.deleteItemFailed(message));
  }
}

/**
 * Listar BannersLogin
 * @param {*} payload - *
 */
function* fetchBannersLogin() {
  try {
    const response = yield call(Api.BannersLogin.fetchBannerLogin);
    yield put(Actions.BannersLogin.fetchSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersLogin.fetchFailed(message));
  }
}

/**
 * Agregar BannersLoginItem
 * @param {*} payload - *
 */
function* addBannersLoginItem({ payload: variables }) {
  try {
    const response = yield call(Api.BannersLogin.addBannerLoginItem, variables);
    yield put(Actions.BannersLogin.addItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersLogin.addItemFailed(message));
  }
}

/**
 * Editar BannersLoginItem
 * @param {*} payload - *
 */
function* editBannersLoginItem({ payload: variables }) {
  try {
    const response = yield call(
      Api.BannersLogin.editBannerLoginItem,
      variables
    );
    yield put(Actions.BannersLogin.editItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersLogin.editItemFailed(message));
  }
}

/**
 * Eliminar BannersLoginItem
 * @param {*} payload - *
 */
function* deleteBannersLoginItem({ payload: variables }) {
  try {
    const response = yield call(
      Api.BannersLogin.deleteBannerLoginItem,
      variables
    );
    yield put(Actions.BannersLogin.deleteItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersLogin.deleteItemFailed(message));
  }
}

/**
 * Listar BannersOffers
 * @param {*} payload - *
 */
function* fetchBannersOffers({ payload: variables }) {
  try {
    const response =
      variables && variables.category_product_id
        ? yield call(
            Api.BannersOffers.fetchBannersOffersByCategoryProductId,
            variables
          )
        : yield call(Api.BannersOffers.fetchBannersOffers);
    yield put(Actions.BannersOffers.fetchSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersOffers.fetchFailed(message));
  }
}

/**
 * Agregar BannersOffersItem
 * @param {*} payload - *
 */
function* addBannersOffersItem({ payload: variables }) {
  try {
    const response = yield call(
      Api.BannersOffers.addBannerOfferItem,
      variables
    );
    yield put(Actions.BannersOffers.addItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersOffers.addItemFailed(message));
  }
}

/**
 * Editar BannersOffersItem
 * @param {*} payload - *
 */
function* editBannersOffersItem({ payload: variables }) {
  try {
    const response = yield call(
      Api.BannersOffers.editBannerOfferItem,
      variables
    );
    yield put(Actions.BannersOffers.editItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersOffers.editItemFailed(message));
  }
}

/**
 * Eliminar BannersOffersItem
 * @param {*} payload - *
 */
function* deleteBannersOffersItem({ payload: variables }) {
  try {
    const response = yield call(
      Api.BannersOffers.deleteBannerOfferItem,
      variables
    );
    yield put(Actions.BannersOffers.deleteItemSucceeded(response));
  } catch (error) {
    let message;
    switch (error.status) {
      case 500:
        message = 'Internal Server Error';
        break;
      case 401:
        message = 'Credenciales inválidas';
        break;
      default:
        message = error;
    }
    yield put(Actions.BannersOffers.deleteItemFailed(message));
  }
}

export function* watchFetchBannersCategory() {
  yield takeEvery(Types.BANNERS_CATEGORY.FETCH, fetchBannersCategory);
}

export function* watchAddBannersCategoryItem() {
  yield takeEvery(Types.BANNERS_CATEGORY.ADD_ITEM, addBannersCategoryItem);
}

export function* watchEditBannersCategoryItem() {
  yield takeEvery(Types.BANNERS_CATEGORY.EDIT_ITEM, editBannersCategoryItem);
}

export function* watchDeleteBannersCategoryItem() {
  yield takeEvery(
    Types.BANNERS_CATEGORY.DELETE_ITEM,
    deleteBannersCategoryItem
  );
}

export function* watchFetchBannersCreaTienda() {
  yield takeEvery(Types.BANNER_CREA_TIENDA.FETCH, fetchBannersCreaTienda);
}

export function* watchAddBannersCreaTiendaItem() {
  yield takeEvery(Types.BANNER_CREA_TIENDA.ADD_ITEM, addBannersCreaTiendaItem);
}

export function* watchEditBannersCreaTiendaItem() {
  yield takeEvery(
    Types.BANNER_CREA_TIENDA.EDIT_ITEM,
    editBannersCreaTiendaItem
  );
}

export function* watchDeleteBannersCreaTiendaItem() {
  yield takeEvery(
    Types.BANNER_CREA_TIENDA.DELETE_ITEM,
    deleteBannersCreaTiendaItem
  );
}

export function* watchFetchBannersHome() {
  yield takeEvery(Types.BANNERS_HOME.FETCH, fetchBannersHome);
}

export function* watchAddBannersHomeItem() {
  yield takeEvery(Types.BANNERS_HOME.ADD_ITEM, addBannersHomeItem);
}

export function* watchEditBannersHomeItem() {
  yield takeEvery(Types.BANNERS_HOME.EDIT_ITEM, editBannersHomeItem);
}

export function* watchDeleteBannersHomeItem() {
  yield takeEvery(Types.BANNERS_HOME.DELETE_ITEM, deleteBannersHomeItem);
}

export function* watchFetchBannersLogin() {
  yield takeEvery(Types.BANNER_LOGIN.FETCH, fetchBannersLogin);
}

export function* watchAddBannersLoginItem() {
  yield takeEvery(Types.BANNER_LOGIN.ADD_ITEM, addBannersLoginItem);
}

export function* watchEditBannersLoginItem() {
  yield takeEvery(Types.BANNER_LOGIN.EDIT_ITEM, editBannersLoginItem);
}

export function* watchDeleteBannersLoginItem() {
  yield takeEvery(Types.BANNER_LOGIN.DELETE_ITEM, deleteBannersLoginItem);
}

export function* watchFetchBannersOffers() {
  yield takeEvery(Types.BANNERS_OFFERS.FETCH, fetchBannersOffers);
}

export function* watchAddBannersOffersItem() {
  yield takeEvery(Types.BANNERS_OFFERS.ADD_ITEM, addBannersOffersItem);
}

export function* watchEditBannersOffersItem() {
  yield takeEvery(Types.BANNERS_OFFERS.EDIT_ITEM, editBannersOffersItem);
}

export function* watchDeleteBannersOffersItem() {
  yield takeEvery(Types.BANNERS_OFFERS.DELETE_ITEM, deleteBannersOffersItem);
}

function* webpubliceditionSaga() {
  yield all([
    fork(watchFetchBannersCategory),
    fork(watchAddBannersCategoryItem),
    fork(watchEditBannersCategoryItem),
    fork(watchDeleteBannersCategoryItem),
    fork(watchFetchBannersCreaTienda),
    fork(watchAddBannersCreaTiendaItem),
    fork(watchEditBannersCreaTiendaItem),
    fork(watchDeleteBannersCreaTiendaItem),
    fork(watchFetchBannersHome),
    fork(watchAddBannersHomeItem),
    fork(watchEditBannersHomeItem),
    fork(watchDeleteBannersHomeItem),
    fork(watchFetchBannersLogin),
    fork(watchAddBannersLoginItem),
    fork(watchEditBannersLoginItem),
    fork(watchDeleteBannersLoginItem),
    fork(watchFetchBannersOffers),
    fork(watchAddBannersOffersItem),
    fork(watchEditBannersOffersItem),
    fork(watchDeleteBannersOffersItem)
  ]);
}

export default webpubliceditionSaga;
