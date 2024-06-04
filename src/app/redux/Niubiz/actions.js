import Types from './types';

const getSecurity = () => ({
  type: Types.GET_SECURITY_REQUEST,
  payload: null
});

const getSecuritySucceeded = (results) => ({
  type: Types.GET_SECURITY_SUCCEEDED,
  results
});

const getSecurityFailed = (error) => ({
  type: Types.GET_SECURITY_FAILED,
  message: error
});

const postEcommerce = (accessToken, body) => ({
  type: Types.POST_ECOMMERCE_REQUEST,
  payload: { accessToken, body }
});

const postEcommerceSucceeded = (results) => ({
  type: Types.POST_ECOMMERCE_SUCCEEDED,
  results
});

const postEcommerceFailed = (error) => ({
  type: Types.POST_ECOMMERCE_FAILED,
  message: error
});

const postAutorization = (accessToken, body) => ({
  type: Types.POST_AUTHORIZATION_REQUEST,
  payload: { accessToken, body }
});

const postAutorizationSucceeded = (results) => ({
  type: Types.POST_AUTHORIZATION_SUCCEEDED,
  results
});

const postAutorizationFailed = (error) => ({
  type: Types.POST_AUTHORIZATION_FAILED,
  message: error
});

export default {
  getSecurity,
  getSecuritySucceeded,
  getSecurityFailed,
  postEcommerce,
  postEcommerceSucceeded,
  postEcommerceFailed,
  postAutorization,
  postAutorizationSucceeded,
  postAutorizationFailed
};
