import { gql } from 'graphql-request';

const ORDER_ALL_FIELDS = gql`
  fragment orderAllFields on Order {
    id
    order_id
    seller_id
    buyer_id
    order_type_id
    coin_type_code
    voucher_type_id
    voucher_id
    payment_method_id
    coupon_id
    delivery_price
    shipping_type_id
    tracking_id
    date_pickup
    date_delivery
    date_confirmation
    tax {
      tax_id
      name
      abrev
      amount
    }
    order_status {
      user_id
      order_state_code
    }
    products {
      product_id
      quantity
      price_unit
    }
    address {
      priority
      street
      city
      district
      region
      zipcode
    }
    refund {
      flag_active
      amount
      order_cancel
    }
    order_cancel {
      flag_active
      eraser
      description
      date
    }
    traking {
      name
      description
      date
    }
  }
`;

const ORDER_STATE_ALL_FIELDS = gql`
  fragment orderStateAllFields on OrderState {
    id
    order_state_code
    name
    image
    description
  }
`;

const ORDER_TYPE_ALL_FIELDS = gql`
  fragment orderTypeAllFields on OrderType {
    id
    order_type_id
    name
    description
  }
`;

export const orderFragment = {
  ORDER_ALL_FIELDS,
  ORDER_STATE_ALL_FIELDS,
  ORDER_TYPE_ALL_FIELDS
};
