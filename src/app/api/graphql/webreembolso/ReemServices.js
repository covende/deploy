import { formatFecha } from '@/common/utils/methods';
import AxiosGQL from '../../rest/AxiosGQL';
import {
  ACCOUNT_REFUNDS,
  ADD_PEDIDO_CANCELED,
  ADD_PEDIDO_REFUND,
  ADD_REFUND_COUPON,
  GET_PEDIDO_CANCELED_BY_PEDIDO,
  GET_PEDIDO_REFUND_BY_PEDIDO,
  REQUEST_ACCOUNT_DEPOSIT
} from './ReemTypes';

export const get_pedido_refund_by_pedido = async (pedido_id) => {
  const { getPedidoRefundByPedido } = await AxiosGQL(
    GET_PEDIDO_REFUND_BY_PEDIDO(pedido_id)
  );
  return getPedidoRefundByPedido || null;
};
export const get_pedido_canceled_by_pedido = async (pedido_id) => {
  const { getPedidoCanceledByPedido } = await AxiosGQL(
    GET_PEDIDO_CANCELED_BY_PEDIDO(pedido_id)
  );
  return getPedidoCanceledByPedido || null;
};

export const add_pedido_refund = async ({
  pedido_id,
  provenance_type,
  provenance_custom_id
}) => {
  const { addPedidoRefund } = await AxiosGQL(
    ADD_PEDIDO_REFUND({
      pedido_id,
      provenance_type,
      provenance_custom_id
    })
  );
  return addPedidoRefund?.status ? addPedidoRefund?.refund : null;
};
export const add_refund_coupon = async (_id) => {
  const { addRefundCoupon } = await AxiosGQL(ADD_REFUND_COUPON(_id));
  return addRefundCoupon;
};

export const add_pedido_canceled = async ({ pedido_id, reason_id }) => {
  const { addPedidoCanceled } = await AxiosGQL(
    ADD_PEDIDO_CANCELED({ pedido_id, reason_id })
  );
  return addPedidoCanceled?.status ? addPedidoCanceled.pedidoCanceled : null;
};

export const request_account_deposit = async (_id) => {
  const { requestAccountDeposit } = await AxiosGQL(
    REQUEST_ACCOUNT_DEPOSIT(_id)
  );
  return requestAccountDeposit || null;
};

export const account_refunds = async ({
  page,
  itemsPage,
  search,
  coupon_refund,
  provenance,
  desde,
  hasta,
  deposited
}) => {
  const { accountRefunds, accountRefundsCSV } = await AxiosGQL(
    ACCOUNT_REFUNDS({
      page,
      itemsPage,
      search,
      coupon_refund,
      provenance,
      desde: formatFecha(desde),
      hasta: formatFecha(hasta),
      deposited
    })
  );
  return {
    info: accountRefunds?.info || {},
    datos: accountRefunds?.accountsRefund,
    accountRefundsCSV
  };
};
