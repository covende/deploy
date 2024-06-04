import React from 'react';
import { CVSelectButton } from '@/common/CovendeTemplate';
import { useDispatch } from 'react-redux';
import { A_PRODUCTVIEW } from '../redux/ProductViewAction';
import { useHistory, useLocation } from 'react-router-dom';
import useGetPermisions from '@/common/hooks/useGetPermisions';

export default function Acciones({
  id,
  step,
  store_id,
  slug,
  removeproducts,
  duplicateProduct,
  status,
  isAdmin
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { crear, editar, eliminar, ver } = useGetPermisions(
    'Vender',
    'Productos'
  );

  const editarP = () => {
    dispatch(
      A_PRODUCTVIEW({
        tabIndex: step,
        product: {
          product_id: id,
          store_id: store_id
        }
      })
    );

    if (isAdmin) {
      let position = location.pathname.indexOf('productos');
      history.push(
        location.pathname.substring(0, position) +
          'productos/' +
          '?action=update&id=' +
          id +
          '&step=' +
          step
      );
    } else {
      history.push('/seller/productos/update/' + id + '/step/' + step);
    }
  };

  const offerP = () => {
    dispatch(
      A_PRODUCTVIEW({
        tabIndex: 1,
        product: {
          product_id: id,
          store_id: store_id
        }
      })
    );
    if (isAdmin) {
      let position = location.pathname.indexOf('productos');
      history.push(
        location.pathname.substring(0, position) +
          'productos/' +
          '?action=update&id=' +
          id +
          '&step=1'
      );
    } else {
      history.push('/seller/productos/update/' + id + '/step/' + 1);
    }
  };
  return (
    <CVSelectButton
      actions={[
        editar && {
          label: 'Editar producto',
          action: () => editarP()
        },
        ver && {
          label: 'Ver producto',
          disabled: status === 'IN_DRAFT',
          action: () => {
            window.open(process.env.APP_URL + '/producto/' + slug, '_blank');
          }
        },
        editar && { label: 'Duplicar', action: () => duplicateProduct(id) },
        eliminar && { label: 'Eliminar', action: () => removeproducts([id]) },
        crear && { label: 'Crear oferta', action: () => offerP() }
      ]}
    />
  );
}
