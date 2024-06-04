import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import '@babel/polyfill'; // Saga requiere de esto

import { roleService } from '@/app/api/graphql';
import { getErrorCatch } from '@/app/helpers';
import Types from './types';
import Actions from './actions';

// Service

// Helpers

/**
 * Listar
 * @param {*} payload - *
 */
function* fetch({ payload: variables }) {
  try {
    const response = yield call(roleService.fetch, variables);
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
    const response = yield call(roleService.addItem, variables);
    yield put(Actions.addSucceeded(response));
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
    const response = yield call(roleService.editItem, variables);
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
    const response = yield call(roleService.deleteItem, variables);
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

function* rolesSaga() {
  yield all([
    fork(watchFetch),
    fork(watchAddItem),
    fork(watchEditItem),
    fork(watchDeleteItem)
  ]);
}

export default rolesSaga;
