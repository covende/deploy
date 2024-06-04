import { gql } from 'graphql-request';

const BANNER_CATEGORY_ALL_FIELDS = gql`
  fragment bannerCategoryAllFields on BannerCategoryproduct {
    id
    banner_categoryproduct_id
    category_product_id
    order
    description
    image
    flag_active
    createdAt
    updatedAt
  }
`;

const BANNER_CREATE_STORE_ALL_FIELDS = gql`
  fragment bannerCreateStoreAllFields on BannerCreatestore {
    id
    banner_createstore_id
    title
    description
    order
    image
    flag_active
    createdAt
    updatedAt
  }
`;

const BANNER_HOME_ALL_FIELDS = gql`
  fragment bannerHomeAllFields on BannerHome {
    id
    banner_home_id
    title
    link
    description
    image
    flag_active
    createdAt
    updatedAt
  }
`;

const BANNER_LOGIN_ALL_FIELDS = gql`
  fragment bannerLoginAllFields on BannerLogin {
    id
    banner_login_id
    title
    description
    order
    image
    flag_active
    createdAt
    updatedAt
  }
`;

const BANNER_OFFER_ALL_FIELDS = gql`
  fragment bannerOfferAllFields on BannerOffer {
    id
    banner_offer_id
    category_product_id
    title
    description
    order
    image
    flag_active
    createdAt
    updatedAt
  }
`;

export const bannerFragment = {
  BANNER_CATEGORY_ALL_FIELDS,
  BANNER_CREATE_STORE_ALL_FIELDS,
  BANNER_HOME_ALL_FIELDS,
  BANNER_LOGIN_ALL_FIELDS,
  BANNER_OFFER_ALL_FIELDS
};
