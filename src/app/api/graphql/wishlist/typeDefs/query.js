import { gql } from 'graphql-request';
import { wishlistFragment } from './fragments';

const WISHLISTS = gql`
  ${wishlistFragment.WISHLIST_ALL_FIELDS}
  query wishLists {
    wishLists {
      ...wishlistAllFields
    }
  }
`;

const WISHLIST_BY_USER_ID = gql`
  ${wishlistFragment.WISHLIST_ALL_FIELDS}
  query wishListByUserID($user_id: String!) {
    wishListByUserID(user_id: $user_id) {
      ...wishlistAllFields
    }
  }
`;

export default {
  WISHLISTS,
  WISHLIST_BY_USER_ID
};
