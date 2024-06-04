import { getAuthToken } from '@/app/helpers/authUtils';
import axios from 'axios';
import { print } from 'graphql';

export const AxiosGqlClient = {
  query: async (query, variables = {}, cancelToken) => {
    const cancelTokenSource = axios.CancelToken.source();

    try {
      const queryResult = await axios
        .post(
          process.env.API_GRAPHQL_URL,
          {
            query,
            variables
          },
          {
            cancelToken: cancelToken || cancelTokenSource.token,
            headers: {
              Authorization: getAuthToken()
              // Authorization: localStorage.getItem('reset')
              //   ? localStorage.getItem('reset')
              //   : 'Basic ' + process.env.BASIC_AUTH
            }
          }
        )
        .catch((error) => {
          !cancelToken && cancelTokenSource.cancel();
          if (axios.isCancel(error)) {
            console.log('post Request canceled');
          }
        });

      return queryResult?.data;
    } catch (error) {
      !cancelToken && cancelTokenSource.cancel();
      if (axios.isCancel(error)) {
        console.log('post Request canceled');
        // console.log(error);
      }
      return null;
    }
  },
  mutation: async (mutation, variables, cancelToken) => {
    const cancelTokenSource = axios.CancelToken.source();

    try {
      const mutationResult = await axios
        .post(
          process.env.API_GRAPHQL_URL,
          {
            query: mutation,
            variables
          },
          {
            cancelToken: cancelToken || cancelTokenSource.token,
            headers: {
              Authorization: getAuthToken()
              // Authorization: localStorage.getItem('reset')
              //   ? localStorage.getItem('reset')
              //   : 'Basic ' + process.env.BASIC_AUTH
            }
          }
        )
        .catch((error) => {
          !cancelToken && cancelTokenSource.cancel();
          if (axios.isCancel(error)) {
            console.log('post Request canceled');
          }
        });
      return mutationResult?.data;
    } catch (error) {
      !cancelToken && cancelTokenSource.cancel();
      if (axios.isCancel(error)) {
        console.log('post Request canceled');
      }
      return null;
    }
  }
};
