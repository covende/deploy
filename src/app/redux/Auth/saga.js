import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import '@babel/polyfill'; // Saga requiere de esto

import { userService } from '@/app/api/graphql';
import { setSession, fetchAuth, getMenu } from '@/app/helpers/authUtils';
import { getErrorCatch } from '@/app/helpers';
import Types from './types';
import Actions from './actions';

// Helpers

// Backoffice
/**
 * Iniciar sesión del usuario con layout Backoffice
 * @param {*} payload - username and password
 */
function* loginBackoffice({ payload: user }) {
  const body = JSON.stringify(user);
  try {
    const response = yield call(userService.userLogin, body);
    if (response.code === 200) {
      if (response.data.platformID === 'PBO') {
        setSession(response);
        user.setIsLoading(false);
        yield put(Actions.Backoffice.loginSucceeded(response));
      } else {
        user.setIsLoading(false);
        alert('¡El usuario no pertenece a esta plataforma!');
      }
    } else {
      user.setIsLoading(false);
      alert('Ocurrió un problema al conectarse...');
    }
  } catch (error) {
    const message =
      'No se pudo conectar. Por favor, vuelve a intentarlo más tarde.';
    yield put(Actions.Backoffice.loginFailed(message));
    setSession(null);
    user.setIsLoading(false);
  }
}

/**
 * Cerrar la sesión del usuario con layout Backoffice
 * @param {*} param0
 */
function* logoutBackoffice({ payload: history }) {
  try {
    setSession(null);
    yield call(() => {
      history.push({
        pathname: '/bo/iniciar-sesion',
        state: { fromLogout: true }
      });
    });
  } catch (error) {}
}

/**
 * Registrar al usuario con layout Backoffice
 */
function* registerBackoffice({ payload: { newRegister, history } }) {
  const body = JSON.stringify(newRegister);

  try {
    const response = yield call(fetchAuth, 'auth/signup', body);
    history.push({
      pathname: '/bo/iniciar-sesion',
      state: { fromDashboard: true }
    });
    yield put(Actions.Backoffice.registerSucceeded(response));
  } catch (error) {
    const message = getErrorCatch(error);
    alert(message);
    yield put(Actions.Backoffice.registerFailed(message));
  }
}

/**
 * Contraseña olvidada (Recuperar contraseña) con layout Backoffice
 */
function* forgetPasswordBackoffice({ payload: { username } }) {
  const body = JSON.stringify({ username });

  try {
    const response = yield call(fetchAuth, '/users/password-reset', body);
    yield put(Actions.Backoffice.forgetPasswordSucceeded(response.message));
  } catch (error) {
    const message = getErrorCatch(error);
    yield put(Actions.Backoffice.forgetPasswordFailed(message));
  }
}

// Buyer & Seller

/**
 * Iniciar sesión del usuario con layout Buyer & Seller
 * @param {*} payload - username and password
 */
function* loginBuyerSeller({ payload: user }) {
  let paramsAuth;
  try {
    let response;
    console.log('datos de login...');
    if (user.isSocial) {
      paramsAuth = [
        `auth/${user.typeSocial}/?access_token=${user.accessToken}`
      ];
      response = yield call(fetchAuth, ...paramsAuth);
    } else if (user.validateCode) {
      response = user.response;
    } else {
      const body = JSON.stringify(user);
      response = yield call(userService.userLogin, body);
    }

    if (response.code === 200) {
      if (response.data.platformID === 'PBS') {
        user.setIsLoading(false);
        user.callback(true, response.data.role);
        setSession(response);
        yield put(Actions.BuyerSeller.loginSucceeded(response));
      } else {
        user.setIsLoading(false);
        user.callback(false, '¡El usuario no pertenece a esta plataforma!');
        user?.setErrorMessage &&
          user.setErrorMessage('¡El usuario no pertenece a esta plataforma!');
        // else
        //   alert(
        //     response.description ||
        //       '¡El usuario no pertenece a esta plataforma!'
        //   );
      }
    } else {
      user.setIsLoading(false);
      user.callback(
        false,
        response?.description || 'Ocurrió un problema al conectarse...'
      );
      user?.setErrorMessage && user.setErrorMessage(response.description);
      // else
      //   alert(response.description || 'Ocurrió un problema al conectarse...');
    }
  } catch (error) {
    const message =
      'No se pudo conectar. Por favor, vuelve a intentarlo más tarde.';
    yield put(Actions.BuyerSeller.loginFailed(message));
    setSession(null);
    //user.setIsLoading(false);
  }
}

/**
 * Cerrar la sesión del usuario con layout Buyer & Seller
 * @param {*} param0
 */
function* logoutBuyerSeller({ payload: { history } }) {
  try {
    console.log('Eliminando logout');
    setSession(null);

    if (history) {
      yield call(() => {
        history.push({
          pathname: '/iniciar-sesion',
          state: { fromLogout: true }
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Registrar al usuario con layout Buyer & Seller
 */
function* registerBuyerSeller({ payload: { newRegister, history } }) {
  const body = JSON.stringify(newRegister);
  try {
    const response = yield call(fetchAuth, 'auth/signup', body);
    history.push({
      pathname: '/iniciar-sesion',
      state: { fromRegisterBS: true }
    });
    yield put(Actions.BuyerSeller.registerSucceeded(response));
  } catch (error) {
    const message = getErrorCatch(error);
    alert(message);
    yield put(Actions.BuyerSeller.registerFailed(message));
  }
}

/**
 * Contraseña olvidada (Recuperar contraseña) con layout Buyer & Seller
 */
function* forgetPasswordBuyerSeller({ payload: { username } }) {
  const body = JSON.stringify({ username });

  try {
    const response = yield call(fetchAuth, '/users/password-reset', body);
    yield put(Actions.BuyerSeller.forgetPasswordSucceeded(response.message));
  } catch (error) {
    const message = getErrorCatch(error);
    yield put(Actions.BuyerSeller.forgetPasswordFailed(message));
  }
}

function* SetUserlogin(user, response) {
  if (response.code === 200) {
    if (response.data.platformID === 'PBS') {
      user.setIsLoading(false);
      user.callback(true, response.data.role);
      setSession(response);
      yield put(Actions.BuyerSeller.loginSucceeded(response));
    } else {
      user.callback(false);
      user.setIsLoading(false);
      alert(
        response.description || '¡El usuario no pertenece a esta plataforma!'
      );
    }
  } else {
    user.setIsLoading(false);
    user.callback(false);
    alert(response.description || 'Ocurrió un problema al conectarse...');
  }
}

export function* watchLoginUserBackoffice() {
  yield takeEvery(Types.Backoffice.LOGIN, loginBackoffice);
  // alert('ingreso al tqkeEvery');
}

export function* watchLogoutUserBackoffice() {
  yield takeEvery(Types.Backoffice.LOGOUT, logoutBackoffice);
}

export function* watchRegisterUserBackoffice() {
  yield takeEvery(Types.Backoffice.REGISTER, registerBackoffice);
}

export function* watchForgetPasswordBackoffice() {
  yield takeEvery(Types.Backoffice.FORGET_PASSWORD, forgetPasswordBackoffice);
}

export function* watchLoginUserBuyerSeller() {
  yield takeEvery(Types.BuyerSeller.LOGIN, loginBuyerSeller);
}

export function* watchLogoutUserBuyerSeller() {
  yield takeEvery(Types.BuyerSeller.LOGOUT, logoutBuyerSeller);
}

export function* watchRegisterUserBuyerSeller() {
  yield takeEvery(Types.BuyerSeller.REGISTER, registerBuyerSeller);
}

export function* watchForgetPasswordBuyerSeller() {
  yield takeEvery(Types.BuyerSeller.FORGET_PASSWORD, forgetPasswordBuyerSeller);
}

function* authSaga() {
  yield all([
    fork(watchLoginUserBackoffice),
    fork(watchLogoutUserBackoffice),
    fork(watchRegisterUserBackoffice),
    fork(watchForgetPasswordBackoffice),
    fork(watchLoginUserBuyerSeller),
    fork(watchLogoutUserBuyerSeller),
    fork(watchRegisterUserBuyerSeller),
    fork(watchForgetPasswordBuyerSeller)
  ]);
}

export default authSaga;
