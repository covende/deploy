import { gql } from 'graphql-request';

const WISHLIST_ALL_FIELDS = gql`
  fragment wishlistAllFields on WishList {
    id
    products {
      product_id
    }
    user_id
  }
`;

export const wishlistFragment = {
  WISHLIST_ALL_FIELDS
};
