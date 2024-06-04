import { gql } from 'graphql-request';
import { couponFragment } from './fragments';

const COUPONS = gql`
  ${couponFragment.COUPON_ALL_FIELDS}
  query coupons {
    coupons {
      ...couponAllFields
    }
  }
`;

const COUPON_BY_ID = gql`
  ${couponFragment.COUPON_ALL_FIELDS}
  query couponByID($coupon_id: String!) {
    couponByID(coupon_id: $coupon_id) {
      ...couponAllFields
    }
  }
`;

const COUPONS_BY_NAME = gql`
  ${couponFragment.COUPON_ALL_FIELDS}
  query couponsByName($name: String!) {
    couponsByName(name: $name) {
      ...couponAllFields
    }
  }
`;

const COUPON_TYPES = gql`
  ${couponFragment.COUPON_TYPE_ALL_FIELDS}
  query couponTypes {
    couponTypes {
      ...couponTypeAllFields
    }
  }
`;

const COUPON_TYPE_BY_ID = gql`
  ${couponFragment.COUPON_TYPE_ALL_FIELDS}
  query couponTypeByID($coupon_type_code: String!) {
    couponTypeByID(coupon_type_code: $coupon_type_code) {
      ...couponTypeAllFields
    }
  }
`;

const COUPON_TYPES_BY_NAME = gql`
  ${couponFragment.COUPON_TYPE_ALL_FIELDS}
  query couponTypesByName($name: String!) {
    couponTypesByName(name: $name) {
      ...couponTypeAllFields
    }
  }
`;

export default {
  COUPONS,
  COUPON_BY_ID,
  COUPONS_BY_NAME,
  COUPON_TYPES,
  COUPON_TYPE_BY_ID,
  COUPON_TYPES_BY_NAME
};
