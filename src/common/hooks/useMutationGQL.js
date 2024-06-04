import { GraphQLClient } from 'graphql-request';

/**
 * Request data GraphQL with 'graphql-request'
 * @param {*} mutation
 * @param {*} variables
 */

function useMutationGQL(mutation, variables) {
  const state = {
    loading: true,
    error: undefined,
    data: undefined
  };

  async function main() {
    const client = new GraphQLClient(process.env.API_GRAPHQL_URL, {
      headers: { Authorization: 'Basic ' + process.env.BASIC_AUTH }
    });
    await client
      .request(mutation, variables)
      .then(
        (res) => {
          state.data = res;
          state.loading = false;
          console.log('response', res);
        },
        (error) => {
          state.error = error;
          state.loading = false;
        }
      )
      .catch((error) => {
        state.error = error;
        state.loading = false;
      });
  }

  main();

  return state;
}

export default useMutationGQL;
