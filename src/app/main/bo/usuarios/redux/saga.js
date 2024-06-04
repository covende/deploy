import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import '@babel/polyfill'; // Saga requiere de esto

import Api from '@/app/api/graphql/users';
import { getErrorCatch } from '@/app/helpers';
import Types from './types';
import Actions from './actions';

/**
 * Listar
 * @param {*} payload - *
 */
function* fetch({ payload: variables }) {
  try {
    const response = yield call(Api.fetch, variables);
    yield put(Actions.fetchSucceeded(response));
  } catch (error) {
    const message = getErrorCatch(error);
    yield put(Actions.fetchFailed(message));
  }
}

/**
 * Agregar
 * @param {*} payload - *
 */
function* addItem({ payload: variables }) {
  try {
    const response = yield call(Api.addItem, variables);
    if (response.code === 200) {
      yield put(Actions.addSucceeded(response.data));
    }
  } catch (error) {
    const message = getErrorCatch(error);
    yield put(Actions.addFailed(message));
  }
}

/**
 * Editar
 * @param {*} payload - *
 */
function* editItem({ payload: variables }) {
  try {
    const response = yield call(Api.editItem, variables);
    yield put(Actions.editSucceeded(response));
  } catch (error) {
    const message = getErrorCatch(error);
    yield put(Actions.editFailed(message));
  }
}

/**
 * Eliminar
 * @param {*} payload - *
 */
function* deleteItem({ payload: variables }) {
  try {
    const response = yield call(Api.deleteItem, variables);
    yield put(Actions.deleteSucceeded(response));
  } catch (error) {
    const message = getErrorCatch(error);
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

function* usersSaga() {
  yield all([
    fork(watchFetch),
    fork(watchAddItem),
    fork(watchEditItem),
    fork(watchDeleteItem)
  ]);
}

export default usersSaga;
