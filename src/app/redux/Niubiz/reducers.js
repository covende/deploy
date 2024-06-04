import Types from './types';

const INIT_STATE = {
  loading: true
};

const NiubizStore = (state = INIT_STATE, action) => {
  switch (action.type) {
    case Types.GET_SECURITY_REQUEST:
    case Types.POST_ECOMMERCE_REQUEST:
    case Types.POST_AUTHORIZATION_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SECURITY_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: undefined,
        accessToken: action.results.data
      };
    case Types.POST_ECOMMERCE_SUCCEEDED:
      console.log('POST_ECOMMERCE_SUCCEEDED', action.results.status);
      if (action.results.status === 200) {
        return {
          ...state,
          loading: false,
          error: undefined,
          session: {
            key: action.results.data.sessionKey,
            expiration: action.results.data.expirationTime
          }
        };
      }
      if (action.results.status === 400) {
        return {
          ...state,
          loading: false,
          error: {
            code: action.results.data.errorCode,
            message: action.results.data.errorMessage,
            data: action.results.data.data
          }
        };
      }
      if (action.results.status === 406) {
        return {
          ...state,
          loading: false,
          error: {
            code: action.results.data.errorCode,
            message: action.results.data.errorMessage,
            data: action.results.data.data
          }
        };
      }
    case Types.GET_SECURITY_FAILED:
      console.log('GET_SECURITY_FAILED', action);
      return {
        ...state,
        loading: false,
        accessToken: undefined,
        session: undefined,
        error: {
          code: action.message.response.status,
          data: action.message.response.data
        }
      };
    case Types.POST_ECOMMERCE_FAILED:
      return {
        ...state,
        loading: false,
        accessToken: undefined,
        session: undefined,
        error: {
          code: action.message.response.data.errorCode,
          message: action.message.response.data.errorMessage,
          data: action.message.response.data.data
        }
      };
    case Types.POST_AUTHORIZATION_FAILED:
      return { ...state, error: action.message, loading: false };
    default:
      return { ...state };
  }
};

export default NiubizStore;
