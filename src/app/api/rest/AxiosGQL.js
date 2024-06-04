import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';

/**
 *
 * @param {import('graphql-ws').GraphQLExecutionContextValue} query
 * @returns
 */
async function AxiosGQL(query, args = { variables: {}, cancelToken: null }) {
  // console.log({ variables: args.variables, cancelToken: args.cancelToken });
  document.body.style.cursor = 'wait';
  let result = await AxiosGqlClient.query(
    query,
    args.variables || {},
    args.cancelToken
  );
  document.body.style.cursor = 'default';
  return result?.data || {};
}

export default AxiosGQL;
