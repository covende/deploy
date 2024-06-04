import { gql } from 'graphql-request';
import { orderFragment } from './fragments';

const ADD_ORDER = gql`
  ${orderFragment.ORDER_ALL_FIELDS}
  mutation addOrder(
    $seller_id: String
    $buyer_id: String
    $order_type_id: String
    $coin_type_code: String
    $voucher_type_id: String
    $voucher_id: String
    $payment_method_id: String
    $coupon_id: String
    $delivery_price: String
    $shipping_type_id: String
    $tracking_id: String
    $tax: InputOrderTax
    $order_status: [InputOrderStatus]
    $products: [InputOrderProducts]
    $address: [InputOrderAddress]
    $refund: InputOrderRefund
    $order_cancel: InputOrderCancel
    $traking: [InputOrderTraking]
    $date_pickup: Date
    $date_delivery: Date
    $date_confirmation: Date
  ) {
    addOrder(
      seller_id: $seller_id
      buyer_id: $buyer_id
      order_type_id: $order_type_id
      coin_type_code: $coin_type_code
      voucher_type_id: $voucher_type_id
      voucher_id: $voucher_id
      payment_method_id: $payment_method_id
      coupon_id: $coupon_id
      delivery_price: $delivery_price
      shipping_type_id: $shipping_type_id
      tracking_id: $tracking_id
      tax: $tax
      order_status: $order_status
      products: $products
      address: $address
      refund: $refund
      order_cancel: $order_cancel
      traking: $traking
      date_pickup: $date_pickup
      date_delivery: $date_delivery
      date_confirmation: $date_confirmation
    ) {
      ...orderAllFields
    }
  }
`;
const EDIT_ORDER = gql`
  ${orderFragment.ORDER_ALL_FIELDS}
  mutation editOrder(
    $order_id: String!
    $seller_id: String
    $buyer_id: String
    $order_type_id: String
    $coin_type_code: String
    $voucher_type_id: String
    $voucher_id: String
    $payment_method_id: String
    $coupon_id: String
    $delivery_price: String
    $shipping_type_id: String
    $tracking_id: String
    $tax: InputOrderTax
    $order_status: [InputOrderStatus]
    $products: [InputOrderProducts]
    $address: [InputOrderAddress]
    $refund: InputOrderRefund
    $order_cancel: InputOrderCancel
    $traking: [InputOrderTraking]
    $date_pickup: Date
    $date_delivery: Date
    $date_confirmation: Date
  ) {
    editOrder(
      order_id: $order_id
      seller_id: $seller_id
      buyer_id: $buyer_id
      order_type_id: $order_type_id
      coin_type_code: $coin_type_code
      voucher_type_id: $voucher_type_id
      voucher_id: $voucher_id
      payment_method_id: $payment_method_id
      coupon_id: $coupon_id
      delivery_price: $delivery_price
      shipping_type_id: $shipping_type_id
      tracking_id: $tracking_id
      tax: $tax
      order_status: $order_status
      products: $products
      address: $address
      refund: $refund
      order_cancel: $order_cancel
      traking: $traking
      date_pickup: $date_pickup
      date_delivery: $date_delivery
      date_confirmation: $date_confirmation
    ) {
      ...orderAllFields
    }
  }
`;
const DELETE_ORDER = gql`
  mutation deleteOrder($order_id: String!) {
    deleteOrder(order_id: $order_id) {
      order_id
    }
  }
`;

const ADD_ORDER_STATE = gql`
  ${orderFragment.ORDER_STATE_ALL_FIELDS}
  mutation addOrderState($name: String!, $image: String, $description: String) {
    addOrderState(name: $name, image: $image, description: $description) {
      ...orderStateAllFields
    }
  }
`;
const EDIT_ORDER_STATE = gql`
  ${orderFragment.ORDER_STATE_ALL_FIELDS}
  mutation editOrderState(
    $order_state_code: String!
    $name: String
    $image: String
    $description: String
  ) {
    editOrderState(
      order_state_code: $order_state_code
      name: $name
      image: $image
      description: $description
    ) {
      ...orderStateAllFields
    }
  }
`;
const DELETE_ORDER_STATE = gql`
  ${orderFragment.ORDER_STATE_ALL_FIELDS}
  mutation deleteOrderState($order_state_code: String!) {
    deleteOrderState(order_state_code: $order_state_code) {
      ...orderStateAllFields
    }
  }
`;

const ADD_ORDER_TYPE = gql`
  ${orderFragment.ORDER_TYPE_ALL_FIELDS}
  mutation addOrderType($name: String!, $description: String) {
    addOrderType(name: $name, description: $description) {
      ...orderTypeAllFields
    }
  }
`;
const EDIT_ORDER_TYPE = gql`
  ${orderFragment.ORDER_TYPE_ALL_FIELDS}
  mutation editOrderType(
    $order_type_id: String!
    $name: String
    $description: String
  ) {
    editOrderType(
      order_type_id: $order_type_id
      name: $name
      description: $description
    ) {
      ...orderTypeAllFields
    }
  }
`;
const DELETE_ORDER_TYPE = gql`
  mutation deleteOrderType($order_type_id: String!) {
    deleteOrderType(order_type_id: $order_type_id) {
      order_type_id
    }
  }
`;

export default {
  ADD_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
  ADD_ORDER_STATE,
  EDIT_ORDER_STATE,
  DELETE_ORDER_STATE,
  ADD_ORDER_TYPE,
  EDIT_ORDER_TYPE,
  DELETE_ORDER_TYPE
};
