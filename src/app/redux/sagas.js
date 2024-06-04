import { all } from 'redux-saga/effects';
// Sagas
import authSaga from './Auth/saga';
import niubizSaga from './Niubiz/saga';
import planSagas from './Plans/sagas';
import platformSagas from './Platform/sagas';
import { boSagas } from './Backoffice/sagas';
// import WPSagas from './WebPublic/WPSagas';

export default function* rootSaga() {
  yield all([
    authSaga(),
    niubizSaga(),
    planSagas(),
    platformSagas(),
    ...boSagas,
    // WPSagas()
  ]);
}
