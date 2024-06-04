import Types from './types';

const fetch = () => ({
  type: Types.FETCH,
  payload: null
});

const fetchSucceeded = (results) => ({
  type: Types.FETCH_SUCCEEDED,
  results
});

const fetchFailed = (error) => ({
  type: Types.FETCH_FAILED,
  message: error
});

export default {
  fetch,
  fetchSucceeded,
  fetchFailed
};
