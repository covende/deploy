/* Code - OLD

import { Cookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';


const isUserAuthenticated = () => {
  const user = getLoggedInUser();
  if (!user) {
    return false;
  }
  const decoded = jwt_decode(user.token);
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // alert('Su sesión ha caducado. Vuelva a iniciar sesión.');
    return false;
  }
  return true;
};

const getLoggedInUser = () => {
  const cookies = new Cookies();
  const user = cookies.get('covendeCurrentUser');
  return user ? (typeof user === 'object' ? user : JSON.parse(user)) : null;
};

const setSession = (user) => {
  const cookies = new Cookies();
  if (user && user.code === 200) {
    cookies.set('covendeCurrentUser', JSON.stringify(user.data), { path: '/' });
  } else {
    cookies.remove('covendeCurrentUser', { path: '/' });
  }
};

const fetchAuth = (url, body = undefined) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };
  if (body) {
    options.body = body;
  }

  return fetch(`${process.env.API_URL}/${url}`, options)
    .then((response) => {
      if (!response.status === 200) {
        throw response.json();
      }
      return response.json();
    })
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
};

export { isUserAuthenticated, getLoggedInUser, setSession, fetchAuth };
*/

import { Cookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

/***
 * Devuelve el token
 */
const getAuthToken = () => {
  const data = new Cookies().get('covendeCurrentUser');
  if (data) {
    return data.token ? 'Bearer ' + data.token : '';
  }
  return '';
};

/**
 * Comprueba si la usuario está autenticada
 */
const isUserAuthenticated = () => {
  const user = getLoggedInUser();
  if (!user) return false;

  const currentTime = Date.now() / 10000;
  if (user.exp < currentTime) {
    alert('Su sesión ha caducado. Vuelva a iniciar sesión.');
    return false;
  }
  return true;
};

/**
 * Retorna el usuario en sesión
 */
const getLoggedInUser = () => {
  const cookies = new Cookies();
  const data = cookies.get('covendeCurrentUser');
  try {
    const payload = jwt_decode(data.token);

    // console.log('Imprimiendo el payload', payload);
    let user;
    if (payload) {
      user = payload.user;
      user.image = data?.image || '';
      user.first_name = data?.first_name || '';
      user.last_name = data?.last_name || '';
      user.exp = payload.exp;
      user.token = data.token;
    }

    return user || null;
  } catch (error) {
    return null;
  }
};

const setToken = (token) => {
  const cookies = new Cookies();
  const user = cookies.get('covendeCurrentUser');
  try {
    if (user) {
      cookies.set('covendeCurrentUser', JSON.stringify({ ...user, token }), {
        path: '/'
      });
    }
  } catch (error) {
    return null;
  }
};

const updateCookieData = (data) => {
  const cookies = new Cookies();
  const user = cookies.get('covendeCurrentUser');
  try {
    if (user) {
      cookies.set('covendeCurrentUser', JSON.stringify({ ...user, ...data }), {
        path: '/'
      });
    }
  } catch (error) {
    return null;
  }
};

/**
 * Establece la sesión
 * @param {*} user
 */
const setSession = (user) => {
  const cookies = new Cookies();
  try {
    if (user && user.code === 200) {
      cookies.set('covendeCurrentUser', JSON.stringify(user.data), {
        path: '/'
      });
      localStorage.setItem('menus', JSON.stringify(user.sidebars));
    } else {
      cookies.remove('covendeCurrentUser', { path: '/' });
      localStorage.removeItem('mycart');
      localStorage.removeItem('id_car_pay');
      localStorage.removeItem('menus');
    }
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * Fetch data REST
 * @param {*} url
 * @param {*} options
 */
const fetchAuth = (url, body = undefined) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };
  if (body) {
    options.body = body;
  }

  return fetch(`${process.env.API_URL}/${url}`, options)
    .then((response) => {
      if (!response.status === 200) {
        throw response.json();
      }
      return response.json();
    })
    .then((json) => json)
    .catch((error) => {
      throw error;
    });
};

export {
  isUserAuthenticated,
  getLoggedInUser,
  setSession,
  fetchAuth,
  getAuthToken,
  updateCookieData,
  setToken
};
