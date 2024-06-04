import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import '@babel/polyfill'; // Saga requiere de esto

import Api from '@/app/api/graphql/plans';
import { getErrorCatch } from '@/app/helpers';
import Types from './types';
import Actions from './actions';

// Data

// Helpers

/**
 * Listar
 * @param {*} payload - *
 */
function* fetch() {
  try {
    const response = yield call(Api.plans);
    yield put(Actions.fetchSucceeded(response));
  } catch (error) {
    const message = getErrorCatch(error);
    yield put(Actions.fetchFailed(message));
  }
}

/**
 * Listar por role
 * @param {*} payload - *
 */
function* fetchByRole({ payload: variables }) {
  console.log('Api.plansByRole.variables', variables);
  try {
    const response = yield call(Api.plansByRole, variables);
    yield put(Actions.fetchByRoleSucceeded(response));
  } catch (error) {
    const message = getErrorCatch(error);
    yield put(Actions.fetchByRoleFailed(message));
  }
}

/**
 * Agregar
 * @param {*} payload - *
 */
function* addItem({ payload: variables }) {
  try {
    const response = yield call(Api.addPlan, variables);
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
    const response = yield call(Api.editPlan, variables);
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
    const response = yield call(Api.deletePlan, variables);
    yield put(Actions.deleteSucceeded(response));
  } catch (error) {
    const message = getErrorCatch(error);
    yield put(Actions.deleteFailed(message));
  }
}

export function* watchFetch() {
  yield takeEvery(Types.FETCH, fetch);
}

export function* watchFetchByRole() {
  yield takeEvery(Types.FETCH_BY_ROLE, fetchByRole);
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

function* plansSaga() {
  yield all([
    fork(watchFetch),
    fork(watchFetchByRole),
    fork(watchAddItem),
    fork(watchEditItem),
    fork(watchDeleteItem)
  ]);
}

export default plansSaga;
