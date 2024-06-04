import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import '@babel/polyfill'; // Saga requiere de esto

import { platformService } from '@/app/api/graphql';
import Types from './types';
import Actions from './actions';
import { safe } from '../common/sagas';

// Data
/**
 * Listar
 * @param {*} payload - *
 */
function* fetch() {
  const { response, error } = yield safe(call(platformService.platforms));
  if (response) {
    if (response.code >= 200 && response.code < 300) {
      yield put(Actions.fetchSucceeded(response.data));
    }
  } else yield put(Actions.fetchFailed(error));
}

export function* watchFetch() {
  yield takeLatest(Types.FETCH, fetch);
}

function* platformsSaga() {
  yield all([fork(watchFetch)]);
}

export default platformsSaga;
