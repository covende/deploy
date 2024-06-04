import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import { gql } from 'graphql-request';

const modelo = `id
                data1
                data2
                data3
                data4
                status`;

export const testRolfs = async () => {
  const query = gql`{
        testRolfs{
            ${modelo}
        }
    }`;
  const res = await AxiosGqlClient.query(query);
  return res.data.testRolfs;
};

export const deleteTestRolf = async (_id) => {
  const mutation = `mutation  deleteTestRolf($id: String!){
        deleteCreditCard(_id: $id){
            _id
        }
    }`;
  const res = await AxiosGqlClient.mutation(mutation, { id: _id });
  return res.data.testRolfs;
};
