import Types from './types';

const fetch = (variables) => ({
  type: Types.FETCH,
  payload: variables
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
