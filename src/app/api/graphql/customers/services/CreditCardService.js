import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import { gql } from 'graphql-request';

const modelo = `_id
            owner
            company
            titular
            bank{
            name
            }
            numero
            numeroLast
            ccv
            date
            tipotargeta`;

export const listCreditCard = async () => {
  const query = gql`{
        listCreditCard{
            ${modelo}
        }
    }`;
  const res = await AxiosGqlClient.query(query);
  return res.data.listCreditCard;
};

export const deleteCreditCard = async (_id) => {
  const mutation = `mutation deleteCreditCard($id: String!){
        deleteCreditCard(_id: $id){
            _id
        }
    }`;
  const res = await AxiosGqlClient.mutation(mutation, { id: _id });
  return res.data.listCreditCard;
};
