import { delete_products } from '@/app/api/graphql/webbo/BProductoMethods';
import { APRROVE_PRODUCT } from '@/app/api/graphql/webbo/BProductoService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  CVAlertConfirm,
  CVAlertError,
  CVAlertSuccess
} from '@/common/CovendeTemplate/CVAlert';

export const udpatestatus = async ({
  product_id,
  user_id,
  links = [],
  enable
}) => {
  const { approveProduct } = await AxiosGQL(
    APRROVE_PRODUCT({
      _id: product_id,
      user_id,
      links,
      enable
    })
  );
  return approveProduct;
};

const okAction = async ({ product_ids, initdata, addToast, store_id }) => {
  let company_id = store_id;
  const deleted = await delete_products({
    store_id: company_id,
    product_ids
  });
  if (deleted) {
    initdata();
    CVAlertSuccess({ addToast, message: 'Eliminado Correctamente' });
  } else {
    CVAlertError({ addToast, message: 'Ocurrieron Problemas' });
  }
};

export const removeproducts = async ({
  product_ids,
  initdata,
  addToast,
  store_id
}) => {
  CVAlertConfirm({
    message:
      product_ids.length > 1
        ? `"Eliminar estos ${product_ids.length} Producto seleccionados"`
        : 'Eliminar este Producto',
    title: 'Eliminar Productos',
    okAction: () => okAction({ product_ids, initdata, addToast, store_id })
  });
};
