import { gql } from 'graphql-request';

const COUPON_ALL_FIELDS = gql`
  fragment couponAllFields on Coupon {
    id
    coupon_id
    name
    code
    amount
    coupon_type_code
    valid
    expire
  }
`;

const COUPON_TYPE_ALL_FIELDS = gql`
  fragment couponTypeAllFields on CouponType {
    id
    coupon_type_code
    name
  }
`;

export const couponFragment = {
  COUPON_ALL_FIELDS,
  COUPON_TYPE_ALL_FIELDS
};
