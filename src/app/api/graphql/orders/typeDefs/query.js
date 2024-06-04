import { gql } from 'graphql-request';
import { orderFragment } from './fragments';

const ORDERS = gql`
  ${orderFragment.ORDER_ALL_FIELDS}
  query orders {
    orders {
      ...orderAllFields
    }
  }
`;

const ORDER_BY_ID = gql`
  ${orderFragment.ORDER_ALL_FIELDS}
  query orderByID($order_id: String!) {
    orderByID(order_id: $order_id) {
      ...orderAllFields
    }
  }
`;

const ORDER_BY_SELLER_ID = gql`
  ${orderFragment.ORDER_ALL_FIELDS}
  query ordersBySellerId($seller_id: String!) {
    ordersBySellerId(seller_id: $seller_id) {
      ...orderAllFields
    }
  }
`;

const ORDER_BY_BUYER_ID = gql`
  ${orderFragment.ORDER_ALL_FIELDS}
  query ordersByBuyerId($buyer_id: String!) {
    ordersByBuyerId(buyer_id: $buyer_id) {
      ...orderAllFields
    }
  }
`;

const ORDER_STATES = gql`
  ${orderFragment.ORDER_TYPE_ALL_FIELDS}
  query orderStates {
    orderStates {
      ...orderStateAllFields
    }
  }
`;

const ORDER_STATE_BY_CODE = gql`
  ${orderFragment.ORDER_TYPE_ALL_FIELDS}
  query orderStateByCode($order_state_code: String!) {
    orderStateByID(order_state_code: $order_state_code) {
      ...orderStateAllFields
    }
  }
`;

const ORDER_STATES_BY_NAME = gql`
  ${orderFragment.ORDER_TYPE_ALL_FIELDS}
  query orderStatesByName($name: String!) {
    orderStatesByName(name: $name) {
      ...orderStateAllFields
    }
  }
`;

const ORDER_TYPES = gql`
  ${orderFragment.ORDER_TYPE_ALL_FIELDS}
  query orderTypes {
    orderTypes {
      ...orderTypeAllFields
    }
  }
`;

const ORDER_TYPE_BY_ID = gql`
  ${orderFragment.ORDER_TYPE_ALL_FIELDS}
  query orderTypeByID($order_type_id: String!) {
    orderTypeByID(order_type_id: $order_id) {
      ...orderTypeAllFields
    }
  }
`;

const ORDER_TYPES_BY_NAME = gql`
  ${orderFragment.ORDER_TYPE_ALL_FIELDS}
  query orderTypesByName($name: String!) {
    orderTypesByName(name: $name) {
      ...orderTypeAllFields
    }
  }
`;

export default {
  ORDERS,
  ORDER_BY_ID,
  ORDER_BY_SELLER_ID,
  ORDER_BY_BUYER_ID,
  ORDER_STATES,
  ORDER_STATE_BY_CODE,
  ORDER_STATES_BY_NAME,
  ORDER_TYPES,
  ORDER_TYPE_BY_ID,
  ORDER_TYPES_BY_NAME
};
