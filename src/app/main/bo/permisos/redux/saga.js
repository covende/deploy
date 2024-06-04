import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import '@babel/polyfill'; // Saga requiere de esto

import { permissionService } from '@/app/api/graphql';
import Types from './types';
import Actions from './actions';

// Data

/**
 * Listar
 * @param {*} payload - *
 */
function* fetch({ payload: variables }) {
  try {
    const response = yield call(permissionService.fetch, variables);
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

export function* watchFetch() {
  yield takeEvery(Types.FETCH, fetch);
}

function* permissionsSaga() {
  yield all([fork(watchFetch)]);
}

export default permissionsSaga;
