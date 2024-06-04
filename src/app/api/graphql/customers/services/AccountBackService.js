import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import { gql } from 'graphql-request';

const modelo = `_id
            company
            owner
            titular
            numeroCCI
            numeroCC
            tipocuenta
            bank{
            name
            bank_id
            }`;

export const listAccountBank = async () => {
  const query = gql`{
        listAccountBank{
            ${modelo}
        }
    }`;
  const res = await AxiosGqlClient.query(query);
  return res.data.listAccountBank;
};

export const deleteAccountBank = async (_id) => {
  const mutation = `mutation deleteAccountBank($id: String!){
        deleteAccountBank(_id: $id){
            _id
        }
    }`;
  const res = await AxiosGqlClient.mutation(mutation, { id: _id });
  return res.data.listAccountBank;
};
