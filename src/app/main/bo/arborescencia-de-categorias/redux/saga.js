import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import '@babel/polyfill'; // Saga requiere de esto

import { categoryService } from '@/app/api/graphql';
import Types from './types';
import Actions from './actions';

// Data

/**
 * Listar
 * @param {*} payload - *
 */
function* fetch() {
  try {
    const response = yield call(categoryService.fetch);
    yield put(Actions.fetchSucceeded(response));
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
    yield put(Actions.fetchFailed(message));
  }
}

/**
 * Agregar
 * @param {*} payload - *
 */
function* addItem({ payload: variables }) {
  try {
    const response = yield call(categoryService.addItem, variables);
    yield put(Actions.addSucceeded(response));
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
    yield put(Actions.addFailed(message));
  }
}

/**
 * Editar
 * @param {*} payload - *
 */
function* editItem({ payload: variables }) {
  try {
    const response = yield call(categoryService.editItem, variables);
    yield put(Actions.editSucceeded(response));
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
    yield put(Actions.editFailed(message));
  }
}

/**
 * Eliminar
 * @param {*} payload - *
 */
function* deleteItem({ payload: variables }) {
  try {
    const response = yield call(categoryService.deleteItem, variables);
    yield put(Actions.deleteSucceeded(response));
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
    yield put(Actions.deleteFailed(message));
  }
}

export function* watchFetch() {
  yield takeEvery(Types.FETCH, fetch);
}

export function* watchAddItem() {
  yield takeEvery(Types.ADD_ITEM, addItem);
}

export function* watchEditItem() {
  yield takeEvery(Types.EDIT_ITEM, editItem);
}

export function* watchDeleteItem() {
  yield takeEvery(Types.DELETE_ITEM, deleteItem);
}

function* categoriesSaga() {
  yield all([
    fork(watchFetch),
    fork(watchAddItem),
    fork(watchEditItem),
    fork(watchDeleteItem)
  ]);
}

export default categoriesSaga;
