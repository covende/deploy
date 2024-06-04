import { AxiosGqlClient } from '@/app/infrastructure/graphql/axios-gql-client/axios-gql-client';
import { gql } from 'graphql-request';

export const ADD_WISH_IN_LIST = ({
  user_id,
  product_id,
  store_id
}) => `mutation{
    addWishInList(
      user_id:"${user_id}"
      product_id:"${product_id}"
      store_id:"${store_id}"
    ){
      id
    }
  }`;

export const DELETE_WISH_FROM_LIST = ({ user_id, product_id }) => `mutation{
    deleteWishFromList(
      user_id:"${user_id}"
      products:"${product_id}"
    ){
      id
    }
  }`;

export const DELETE_WISH_FROM_LIST_F = async (variables) => {
  const mutation = gql`
    mutation deleteWishFromList($user_id: String!, $products: [String!]) {
      deleteWishFromList(user_id: $user_id, products: $products) {
        id
      }
    }
  `;
  const res = await AxiosGqlClient.mutation(mutation, variables);
  return res.data.deleteWishFromList;
};

export const WISH_LIST_BY_USER_ID = (user_id) => `{
  wishListByUserID(
    user_id:"${user_id}"
  ){
    id
    user_id
    products{
      product_id
      store_id
      add_date
    }
  }
}`;
