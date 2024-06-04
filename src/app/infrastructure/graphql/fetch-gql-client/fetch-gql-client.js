import { print } from 'graphql';
/**
 * Fetch data GraphQL
 * @param {*} body
 * @param {*} url
 */
export const FetchGqlClient = {
  query: async (query, variables = {}) => {
    var controller = new AbortController();
    var signal = controller.signal;
    query = print(query);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      signal,
      body: JSON.stringify({
        query,
        variables
      })
    };
    return await fetch(process.env.API_GRAPHQL_URL, options)
      .then((response) =>
        response
          .json()
          .then((json) => (response.ok ? json : Promise.reject(json)))
      )
      .then((data) => data)
      .catch((error) => {
        console.error(error);
        controller.abort();
      });
  }
};
