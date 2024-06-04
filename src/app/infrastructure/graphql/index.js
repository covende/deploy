// import {FetchGqlClient} from './fetch-gql-client/fetch-gql-client';
import { request } from 'graphql-request';
import { AxiosGqlClient } from './axios-gql-client/axios-gql-client';

const mutationGQL = (mutation, variables) =>
  request(process.env.API_GRAPHQL_URL, mutation, variables);

export const InfraGQL = {
  query: AxiosGqlClient.query,
  //   mutation: AxiosGqlClient.mutation,
  mutation: mutationGQL
};
