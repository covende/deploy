import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import { gql } from 'graphql-request';
import WMCompany from '../webmodel/WMCompany';

export const companyByUser = async (user) => {
  var query = gql`
    query ($user: String!) {
      companyByUser(user: $user) ${WMCompany}
    }
  `;
  const res = await AxiosGqlClient.query(query, { user: user });
  return res.companyByUser;
};
