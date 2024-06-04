import { useState, useEffect, useCallback } from 'react';
import { GraphQLClient, request } from 'graphql-request';

/**
 * Request data GraphQL with 'graphql-request'
 * @param {*} query
 * @param {*} variables
 */
function useQueryGQL(query, variables = {}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined);

  const requestGraphQl = useCallback((cancel) => {
    const client = new GraphQLClient(process.env.API_GRAPHQL_URL, {
      headers: { Authorization: 'Basic ' + process.env.BASIC_AUTH }
    });
    client
      .request(query, variables)
      .then(
        (res) => {
          if (cancel) return;
          setData(res);
          setLoading(false);
        },
        (error) => {
          if (cancel) return;
          setError(error);
          setLoading(false);
        }
      )
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    let cancel = false;
    requestGraphQl(cancel);
    return () => {
      cancel = true;
    };
  }, []);

  return { loading, error, data };
}

export default useQueryGQL;
