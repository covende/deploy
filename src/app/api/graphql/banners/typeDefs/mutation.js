import { gql } from 'graphql-request';
import { bannerFragment } from './fragments';

const ADD_BANNER_CATEGORY = gql`
  ${bannerFragment.BANNER_CATEGORY_ALL_FIELDS}
  mutation addBannerCategoryproduct(
    $category_product_id: String
    $order: Int
    $description: String
    $image: String
    $flag_active: Boolean
  ) {
    addBannerCategoryproduct(
      category_product_id: $category_product_id
      order: $order
      description: $description
      image: $image
      flag_active: $flag_active
    ) {
      ...bannerCategoryAllFields
    }
  }
`;

const EDIT_BANNER_CATEGORY = gql`
  ${bannerFragment.BANNER_CATEGORY_ALL_FIELDS}
  mutation editBannerCategoryproduct(
    $banner_categoryproduct_id: String!
    $category_product_id: String
    $order: Int
    $description: String
    $image: String
    $flag_active: Boolean
  ) {
    editBannerCategoryproduct(
      banner_categoryproduct_id: $banner_categoryproduct_id
      category_product_id: $category_product_id
      order: $order
      description: $description
      image: $image
      flag_active: $flag_active
    ) {
      ...bannerCategoryAllFields
    }
  }
`;

const DELETE_BANNER_CATEGORY = gql`
  mutation deleteBannerCategoryproduct($banner_categoryproduct_id: String!) {
    deleteBannerCategoryproduct(
      banner_categoryproduct_id: $banner_categoryproduct_id
    ) {
      banner_categoryproduct_id
    }
  }
`;

const ADD_BANNER_CREATE_STORE = gql`
  ${bannerFragment.BANNER_CREATE_STORE_ALL_FIELDS}
  mutation addBannerCreatestore(
    $title: String
    $description: String
    $order: Int
    $image: String
    $flag_active: Boolean
  ) {
    addBannerCreatestore(
      title: $title
      description: $description
      order: $order
      image: $image
      flag_active: $flag_active
    ) {
      ...bannerCreateStoreAllFields
    }
  }
`;

const EDIT_BANNER_CREATE_STORE = gql`
  ${bannerFragment.BANNER_CREATE_STORE_ALL_FIELDS}
  mutation editBannerCreatestore(
    $banner_createstore_id: String!
    $title: String
    $description: String
    $order: Int
    $image: String
    $flag_active: Boolean
  ) {
    editBannerCreatestore(
      banner_createstore_id: $banner_createstore_id
      title: $title
      description: $description
      order: $order
      image: $image
      flag_active: $flag_active
    ) {
      ...bannerCreateStoreAllFields
    }
  }
`;

const DELETE_BANNER_CREATE_STORE = gql`
  mutation deleteBannerCreatestore($banner_createstore_id: String!) {
    deleteBannerCreatestore(banner_createstore_id: $banner_createstore_id) {
      banner_createstore_id
    }
  }
`;

const ADD_BANNER_HOME = gql`
  ${bannerFragment.BANNER_HOME_ALL_FIELDS}
  mutation addBannerHome(
    $title: String
    $description: String
    $link: String
    $image: String
    $flag_active: Boolean
  ) {
    addBannerHome(
      title: $title
      description: $description
      link: $link
      image: $image
      flag_active: $flag_active
    ) {
      ...bannerHomeAllFields
    }
  }
`;

const EDIT_BANNER_HOME = gql`
  ${bannerFragment.BANNER_HOME_ALL_FIELDS}
  mutation editBannerHome(
    $banner_home_id: String!
    $title: String
    $link: String
    $description: String
    $image: String
    $flag_active: Boolean
  ) {
    editBannerHome(
      banner_home_id: $banner_home_id
      title: $title
      link: $link
      description: $description
      image: $image
      flag_active: $flag_active
    ) {
      ...bannerHomeAllFields
    }
  }
`;

const DELETE_BANNER_HOME = gql`
  mutation deleteBannerHome($banner_home_id: String!) {
    deleteBannerHome(banner_home_id: $banner_home_id) {
      banner_home_id
    }
  }
`;

const ADD_BANNER_LOGIN = gql`
  ${bannerFragment.BANNER_LOGIN_ALL_FIELDS}
  mutation addBannerLogin(
    $title: String
    $description: String
    $order: Int
    $image: String
    $flag_active: Boolean
  ) {
    addBannerLogin(
      title: $title
      description: $description
      order: $order
      image: $image
      flag_active: $flag_active
    ) {
      ...bannerLoginAllFields
    }
  }
`;

const EDIT_BANNER_LOGIN = gql`
  ${bannerFragment.BANNER_LOGIN_ALL_FIELDS}
  mutation editBannerLogin(
    $banner_login_id: String!
    $title: String
    $description: String
    $order: Int
    $image: String
    $flag_active: Boolean
  ) {
    editBannerLogin(
      banner_login_id: $banner_login_id
      title: $title
      description: $description
      order: $order
      image: $image
      flag_active: $flag_active
    ) {
      ...bannerLoginAllFields
    }
  }
`;

const DELETE_BANNER_LOGIN = gql`
  mutation deleteBannerLogin($banner_login_id: String!) {
    deleteBannerLogin(banner_login_id: $banner_login_id) {
      ...bannerLoginAllFields
    }
  }
`;

const ADD_BANNER_OFFER = gql`
  ${bannerFragment.BANNER_OFFER_ALL_FIELDS}
  mutation addBannerOffer(
    $category_product_id: String
    $title: String
    $description: String
    $order: Int
    $image: String
    $flag_active: Boolean
  ) {
    addBannerOffer(
      category_product_id: $category_product_id
      title: $title
      description: $description
      order: $order
      image: $image
      flag_active: $flag_active
    ) {
      ...bannerOfferAllFields
    }
  }
`;

const EDIT_BANNER_OFFER = gql`
  ${bannerFragment.BANNER_OFFER_ALL_FIELDS}
  mutation editBannerOffer(
    $banner_offer_id: String!
    $category_product_id: String
    $title: String
    $description: String
    $order: Int
    $image: String
    $flag_active: Boolean
  ) {
    editBannerOffer(
      banner_offer_id: $banner_offer_id
      category_product_id: $category_product_id
      title: $title
      description: $description
      order: $order
      image: $image
      flag_active: $flag_active
    ) {
      ...bannerOfferAllFields
    }
  }
`;

const DELETE_BANNER_OFFER = gql`
  mutation deleteBannerOffer($banner_offer_id: String!) {
    deleteBannerOffer(banner_offer_id: $banner_offer_id) {
      ...bannerOfferAllFields
    }
  }
`;

export default {
  ADD_BANNER_CATEGORY,
  EDIT_BANNER_CATEGORY,
  DELETE_BANNER_CATEGORY,
  ADD_BANNER_CREATE_STORE,
  EDIT_BANNER_CREATE_STORE,
  DELETE_BANNER_CREATE_STORE,
  ADD_BANNER_HOME,
  EDIT_BANNER_HOME,
  DELETE_BANNER_HOME,
  ADD_BANNER_LOGIN,
  EDIT_BANNER_LOGIN,
  DELETE_BANNER_LOGIN,
  ADD_BANNER_OFFER,
  EDIT_BANNER_OFFER,
  DELETE_BANNER_OFFER
};
