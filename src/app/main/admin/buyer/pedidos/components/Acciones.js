import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { rolemenu } from '@/app/helpers';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { ADD_PEDIDO_CHAT } from '@/app/api/graphql/webtopbar/MessageManager';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { CVSelectButton } from '@/common/CovendeTemplate';
import useGetPermisions from '@/common/hooks/useGetPermisions';

export const sendtomessage = async ({ owner, id, producto_name, history }) => {
  const us = getLoggedInUser();
  const { addPedidoChat } = await AxiosGQL(ADD_PEDIDO_CHAT(id));
  if (addPedidoChat.status) {
    history.push((rolemenu() || '/buyer') + '/mensajes/' + addPedidoChat.sala);
  }
};

export default function Acciones({
  id,
  setIdpedido,
  cancelapedido,
  onOpen,
  pedido,
  setpedido
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { ver, crear } = useGetPermisions('Comprar', 'Pedidos');

  const todetails = () => {
    history.push('/buyer/pedidos/detalle/' + id);
  };
  const tobackbuy = (product) => {
    product.product.slug &&
      window.open(`/producto/${product.product.slug}`, '_black');
  };
  const toscorebuy = () => {
    todetails();
  };
  const todevoledbuy = () => {
    setpedido(pedido);
    setIdpedido(id);
    onOpen();
  };
  const tocancelbuy = () => {
    setpedido(pedido);
    setIdpedido(id);
    cancelapedido();
  };

  return (
    <CVSelectButton
      actions={[
        { action: () => todetails(), label: 'Ver detalles', disabled: !ver },
        {
          action: () => tobackbuy(pedido),
          label: 'Volver a comprar'
        },
        {
          action: () => toscorebuy(),
          label: 'Calificar pedido',
          disabled: !crear
        },
        {
          action: () => todevoledbuy(),
          label: 'Devolver Pedido',
          disabled: !(pedido?.permit_devolution || false)
          // disabled: CVEPDisableDevolucionBuyer(
          //   pedido.status || '',
          //   pedido.delivery_time || new Date(),
          //   pedido.payment_status || ''
          // )
        },
        {
          action: () => tocancelbuy(),
          label: 'Cancelar Pedido',
          disabled: !(pedido?.permit_cancelled || false)
          // disabled: CVEPDisableCancelBuyer(
          //   pedido.status || '',
          //   pedido.fecha_compra || new Date(),
          //   pedido.payment_status || ''
          // )
        },
        {
          action: () =>
            sendtomessage({
              id,
              owner: pedido?.company?.owner,
              producto_name: pedido.producto,
              history
            }),
          label: 'Enviar Mensaje'
        }
      ]}
    />
  );
}
