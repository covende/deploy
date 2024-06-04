import AxiosGQL from '../../rest/AxiosGQL';
import {
  ADD_ORDER_RECEIPT,
  CONFIRM_RECEIPT_PEDIDO,
  GENERATE_SHIPPING_GUIDE_PEDIDOS,
  GET_SHIPPING_GUIDE_PDF,
  PROCESS_PEDIDO,
  SEND_PEDIDO
} from './PedidoType';

export const send_pedido = async ({
  courier_id,
  pedido_id,
  companyDirection_id
}) => {
  const { sendPedido } = await AxiosGQL(
    SEND_PEDIDO({
      courier_id,
      pedido_id,
      companyDirection_id
    })
  );
  return sendPedido?.id_tracking;
};

export const generate_guide = async ({
  pedidos_custom_ids = [],
  defaultDirection_id = '',
  courier_id = ''
}) => {
  const { generateShippingGuidePedidos } = await AxiosGQL(
    GENERATE_SHIPPING_GUIDE_PEDIDOS({
      pedidos_custom_ids,
      defaultDirection_id,
      courier_id
    })
  );
  return generateShippingGuidePedidos;
};

export const process_pedido = async (pedido_id) => {
  const { processPedido } = await AxiosGQL(PROCESS_PEDIDO(pedido_id));
  return processPedido;
};

export const add_order_receipt = async (order_id, receipt) => {
  const { addOrderReceipt } = await AxiosGQL(
    ADD_ORDER_RECEIPT(order_id, receipt)
  );
  return addOrderReceipt;
};

export const get_shipping = async (guide_number) => {
  const { getShippingGuidePDF } = await AxiosGQL(
    GET_SHIPPING_GUIDE_PDF(guide_number)
  );
  return getShippingGuidePDF;
};

export const confirm_receipt_pedido = async ({ pedido_id, user_id }) => {
  const { confirmReceiptPedido } = await AxiosGQL(
    CONFIRM_RECEIPT_PEDIDO({
      pedido_id,
      user_id
    })
  );
  return confirmReceiptPedido || false;
};
