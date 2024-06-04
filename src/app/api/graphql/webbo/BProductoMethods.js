import AxiosGQL from '../../rest/AxiosGQL';
import { DELETE_PRODUCTS } from './BProductoService';

export const delete_products = async ({ store_id, product_ids }) => {
  const { deleteProducts } = await AxiosGQL(
    DELETE_PRODUCTS({ product_ids, store_id })
  );
  return deleteProducts.status || false;
};
