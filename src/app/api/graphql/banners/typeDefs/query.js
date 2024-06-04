import { gql } from 'graphql-request';
import { bannerFragment } from './fragments';

const BANNER_CATEGORIES = gql`
  ${bannerFragment.BANNER_CATEGORY_ALL_FIELDS}
  query bannerCategoryproducts {
    bannerCategoryproducts {
      ...bannerCategoryAllFields
    }
  }
`;

const BANNER_CATEGORIES_BY_LIMIT = gql`
  ${bannerFragment.BANNER_CATEGORY_ALL_FIELDS}
  query bannerCategoryproductsByLimit($limit: Int) {
    bannerCategoryproducts(limit: $limit) {
      ...bannerCategoryAllFields
    }
  }
`;

const BANNER_CATEGORY_BY_ID = gql`
  ${bannerFragment.BANNER_CATEGORY_ALL_FIELDS}
  query bannerCategoryproductByID($banner_categoryproduct_id: String!) {
    bannerCategoryproductByID(
      banner_categoryproduct_id: $banner_categoryproduct_id
    ) {
      ...bannerCategoryAllFields
    }
  }
`;

const BANNER_CATEGORIES_BY_CATEGORY_ID = gql`
  ${bannerFragment.BANNER_CATEGORY_ALL_FIELDS}
  query bannerCategoryproductsByCategoryProductId(
    $category_product_id: String!
  ) {
    bannerCategoryproductsByCategoryProductId(
      category_product_id: $category_product_id
    ) {
      ...bannerCategoryAllFields
    }
  }
`;

const BANNER_CREATE_STORES = gql`
  ${bannerFragment.BANNER_CREATE_STORE_ALL_FIELDS}
  query bannerCreateStore {
    bannerCreatestores {
      ...bannerCreateStoreAllFields
    }
  }
`;

const BANNER_CREATE_STORES_BY_LIMIT = gql`
  ${bannerFragment.BANNER_CREATE_STORE_ALL_FIELDS}
  query bannerCreateStoreByLimit($limit: Int) {
    bannerCreatestores(limit: $limit) {
      ...bannerCreateStoreAllFields
    }
  }
`;

const BANNER_CREATE_STORE_BY_ID = gql`
  ${bannerFragment.BANNER_CREATE_STORE_ALL_FIELDS}
  query bannerCreateStoreByID($banner_createstore_id: String!) {
    bannerCreatestoreByID(banner_createstore_id: $banner_createstore_id) {
      ...bannerCreateStoreAllFields
    }
  }
`;

const BANNER_CREATE_STORES_BY_TITLE = gql`
  ${bannerFragment.BANNER_CREATE_STORE_ALL_FIELDS}
  query bannerCreateStoreByTitle($title: String!) {
    bannerCreatestoresByTitle(title: $title) {
      ...bannerCreateStoreAllFields
    }
  }
`;

const BANNER_HOMES = gql`
  ${bannerFragment.BANNER_HOME_ALL_FIELDS}
  query bannerHome {
    bannerHomes {
      ...bannerHomeAllFields
    }
  }
`;

const BANNER_HOMES_BY_LIMIT = gql`
  ${bannerFragment.BANNER_HOME_ALL_FIELDS}
  query bannerHomesByLimit($limit: Int) {
    bannerHomes(limit: $limit) {
      ...bannerHomeAllFields
    }
  }
`;

const BANNER_HOME_BY_ID = gql`
  ${bannerFragment.BANNER_HOME_ALL_FIELDS}
  query bannerHomeByID($banner_home_id: String!) {
    bannerHomeByID(banner_home_id: $banner_home_id) {
      ...bannerHomeAllFields
    }
  }
`;

const BANNER_HOMES_BY_TITLE = gql`
  ${bannerFragment.BANNER_HOME_ALL_FIELDS}
  query bannerHomeByTitle($title: String!) {
    bannerHomesByTitle(title: $title) {
      ...bannerHomeAllFields
    }
  }
`;

const BANNER_LOGINS = gql`
  ${bannerFragment.BANNER_LOGIN_ALL_FIELDS}
  query bannerLogin {
    bannerLogins {
      ...bannerLoginAllFields
    }
  }
`;

const BANNER_LOGINS_BY_LIMIT = gql`
  ${bannerFragment.BANNER_LOGIN_ALL_FIELDS}
  query bannerLoginByLimit($limit: Int) {
    bannerLogins(limit: $limit) {
      ...bannerLoginAllFields
    }
  }
`;

const BANNER_LOGIN_BY_ID = gql`
  ${bannerFragment.BANNER_LOGIN_ALL_FIELDS}
  query bannerLoginByID($banner_login_id: String!) {
    bannerLoginByID(banner_login_id: $banner_login_id) {
      ...bannerLoginAllFields
    }
  }
`;

const BANNER_LOGINS_BY_TITLE = gql`
  ${bannerFragment.BANNER_LOGIN_ALL_FIELDS}
  query bannerLoginByTitle($title: String!) {
    bannerLoginsByTitle(title: $title) {
      ...bannerLoginAllFields
    }
  }
`;

const BANNER_OFFERS = gql`
  ${bannerFragment.BANNER_OFFER_ALL_FIELDS}
  query bannerOffers {
    bannerOffers {
      ...bannerOfferAllFields
    }
  }
`;

const BANNER_OFFERS_BY_LIMIT = gql`
  ${bannerFragment.BANNER_OFFER_ALL_FIELDS}
  query bannerOffersByLimit($limit: Int) {
    bannerOffers(limit: $limit) {
      ...bannerOfferAllFields
    }
  }
`;

const BANNER_OFFER_BY_ID = gql`
  ${bannerFragment.BANNER_OFFER_ALL_FIELDS}
  query bannerOfferByID($banner_offer_id: String!) {
    bannerOfferByID(banner_offer_id: $banner_offer_id) {
      ...bannerOfferAllFields
    }
  }
`;

const BANNER_OFFERS_BY_CATEGORY_ID = gql`
  ${bannerFragment.BANNER_OFFER_ALL_FIELDS}
  query bannerOffersByCategoryProductId($category_product_id: String!) {
    bannerOffersByCategoryProductId(category_product_id: $category_product_id) {
      ...bannerOfferAllFields
    }
  }
`;

export default {
  BANNER_CATEGORIES,
  BANNER_CATEGORIES_BY_LIMIT,
  BANNER_CATEGORY_BY_ID,
  BANNER_CATEGORIES_BY_CATEGORY_ID,
  BANNER_CREATE_STORES,
  BANNER_CREATE_STORES_BY_LIMIT,
  BANNER_CREATE_STORE_BY_ID,
  BANNER_CREATE_STORES_BY_TITLE,
  BANNER_HOMES,
  BANNER_HOMES_BY_LIMIT,
  BANNER_HOME_BY_ID,
  BANNER_HOMES_BY_TITLE,
  BANNER_LOGINS,
  BANNER_LOGINS_BY_LIMIT,
  BANNER_LOGIN_BY_ID,
  BANNER_LOGINS_BY_TITLE,
  BANNER_OFFERS,
  BANNER_OFFERS_BY_LIMIT,
  BANNER_OFFER_BY_ID,
  BANNER_OFFERS_BY_CATEGORY_ID
};
