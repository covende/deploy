export const GET_SHIPPING_PRICE = ({
  direction_id,
  product_id,
  product_quantity
}) => `{
    getShippingPrice(direction_id: "${direction_id}", product_id: "${product_id}", product_quantity: ${product_quantity}) {
      price
      preparation_time
      preparation_time_type
    }
  }`;
