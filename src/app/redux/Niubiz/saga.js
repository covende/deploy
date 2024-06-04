import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';
import '@babel/polyfill'; // Saga requiere de esto

import Api from '@/app/api/rest/niubiz';
import Types from './types';
import actions from './actions';

// Data

/**
 * Paso 1. Crear un token de acceso (Seguridad) | Niubiz
 */
function* getSecurity() {
  try {
    const response = yield call(Api.getSecurity);
    yield put(actions.getSecuritySucceeded(response));
  } catch (error) {
    console.log('getSecurityFailed', error);
    yield put(actions.getSecurityFailed(error));
  }
}

/**
 * Paso 2. Crear un token de sesión | Niubiz
 */
function* postEcommerce({ payload: { accessToken, body } }) {
  try {
    const response = yield call(Api.postEcommerce, accessToken, body);
    yield put(actions.postEcommerceSucceeded(response));
  } catch (error) {
    console.log('postEcommerceFailed', error);
    yield put(actions.postEcommerceFailed(error));
  }
}

/**
 * Paso 4. Solicitar la autorización de la transacción | Niubiz
 */
function* postAutorization({ payload: { accessToken, body } }) {
  try {
    const response = yield call(Api.postAutorization, accessToken, body);
    yield put(actions.postAutorizationSucceeded(response));
  } catch (error) {
    console.log('postAutorizationFailed', error);
    yield put(actions.postAutorizationFailed(error));
  }
}

export function* watchGetSecurity() {
  yield takeLatest(Types.GET_SECURITY_REQUEST, getSecurity);
}

export function* watchPostEcommerce() {
  yield takeLatest(Types.POST_ECOMMERCE_REQUEST, postEcommerce);
}

export function* watchPostAutorization() {
  yield takeLatest(Types.POST_AUTHORIZATION_REQUEST, postAutorization);
}

function* niubizSaga() {
  yield all([
    fork(watchGetSecurity),
    fork(watchPostEcommerce),
    fork(watchPostAutorization)
  ]);
}

export default niubizSaga;
