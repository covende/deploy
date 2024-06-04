import { gql } from 'graphql-request';
import { wishlistFragment } from './fragments';

const ADD_WISHLIST_ITEM = gql`
  ${wishlistFragment.WISHLIST_ALL_FIELDS}
  mutation addWishInList($user_id: String!, $product_id: String!) {
    addWishInList(user_id: $user_id, product_id: $product_id) {
      ...wishlistAllFields
    }
  }
`;

const DELETE_WISHLIST_ITEM = gql`
  ${wishlistFragment.WISHLIST_ALL_FIELDS}
  mutation deleteWishFromList($user_id: String!, $product_id: String!) {
    deleteWishFromList(user_id: $user_id, product_id: $product_id) {
      ...wishlistAllFields
    }
  }
`;

export default {
  ADD_WISHLIST_ITEM,
  DELETE_WISHLIST_ITEM
};
