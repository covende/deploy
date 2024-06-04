import { gql } from 'graphql-request';
import { couponFragment } from './fragments';

const ADD_COUPON = gql`
  ${couponFragment.COUPON_ALL_FIELDS}
  mutation addCoupon(
    $name: String!
    $amount: String
    $coupon_type_code: String
    $valid: Boolean
    $expire: Date
  ) {
    addCoupon(
      name: $name
      amount: $amount
      coupon_type_code: $coupon_type_code
      valid: $valid
      expire: $expire
    ) {
      ...couponAllFields
    }
  }
`;

const EDIT_COUPON = gql`
  ${couponFragment.COUPON_ALL_FIELDS}
  mutation editCoupon(
    $coupon_id: String!
    $name: String
    $amount: String
    $coupon_type_code: String
    $valid: Boolean
    $expire: Date
  ) {
    editCoupon(
      coupon_id: $coupon_id
      name: $name
      amount: $amount
      coupon_type_code: $coupon_type_code
      valid: $valid
      expire: $expire
    ) {
      ...couponAllFields
    }
  }
`;

const DELETE_COUPON = gql`
  ${couponFragment.COUPON_ALL_FIELDS}
  mutation deleteCoupon($coupon_id: String!) {
    deleteCoupon(coupon_id: $coupon_id) {
      ...couponAllFields
    }
  }
`;

const ADD_COUPON_TYPE = gql`
  ${couponFragment.COUPON_TYPE_ALL_FIELDS}
  mutation addCouponType($name: String!) {
    addCouponType(name: $name) {
      ...couponTypeAllFields
    }
  }
`;

const EDIT_COUPON_TYPE = gql`
  ${couponFragment.COUPON_TYPE_ALL_FIELDS}
  mutation editCouponType($coupon_type_code: String!, $name: String) {
    editCouponType(coupon_type_code: $coupon_type_code, name: $name) {
      ...couponTypeAllFields
    }
  }
`;

const DELETE_COUPON_TYPE = gql`
  ${couponFragment.COUPON_TYPE_ALL_FIELDS}
  mutation deleteCouponType($coupon_type_code: String!) {
    deleteCouponType(coupon_type_code: $coupon_type_code) {
      ...couponTypeAllFields
    }
  }
`;

export default {
  ADD_COUPON,
  EDIT_COUPON,
  DELETE_COUPON,
  ADD_COUPON_TYPE,
  EDIT_COUPON_TYPE,
  DELETE_COUPON_TYPE
};
