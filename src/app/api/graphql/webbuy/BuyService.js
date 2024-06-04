import AxiosGQL from '../../rest/AxiosGQL';
import { GET_SHIPPING_PRICE } from './types/BuyType';

export const get_shipping_price = async ({
  direction_id,
  product_id,
  product_quantity
}) => {
  const { getShippingPrice } = await AxiosGQL(
    GET_SHIPPING_PRICE({
      direction_id,
      product_id,
      product_quantity
    })
  );
  return getShippingPrice
    ? { ...getShippingPrice, status: true }
    : {
        price: 0.0,
        preparation_time: 0,
        preparation_time_type: '',
        status: false
      };
};
