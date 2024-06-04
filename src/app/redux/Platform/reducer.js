import Types from './types';

const INIT_STATE = {
  loading: true,
  error: undefined,
  data: undefined,
  selected: false
};

const Platforms = (state = INIT_STATE, action) => {
  switch (action.type) {
    case Types.FETCH:
      return { ...state, loading: true };
    case Types.FETCH_SUCCEEDED:
      return {
        ...state,
        loading: false,
        data: action.results,
        error: undefined
      };
    case Types.FETCH_FAILED:
      return { ...state, error: action.message, loading: false };
    default:
      return { ...state };
  }
};

export default Platforms;
