import WMInfo from '../webmodel/WMInfo';
import WMRefund from '../webmodel/WMRefund';
import WMTable from '../webmodel/WMTable';

export const GET_PEDIDO_REFUND_BY_PEDIDO = (pedido_id) => `{
    getPedidoRefundByPedido(pedido_id: "${pedido_id}") ${WMRefund}
 }
 `;

export const GET_PEDIDO_CANCELED_BY_PEDIDO = (pedido_id) => `{
    getPedidoCanceledByPedido(pedido_id: "${pedido_id}"){
      _id
      custom_id
      pedido_id
      reason_id
      request_date
      reason ${WMTable}
    }
  }
  `;

export const ADD_PEDIDO_REFUND = ({
  pedido_id,
  provenance_type,
  provenance_custom_id
}) => `
  mutation {
    addPedidoRefund(
      pedido_id: "${pedido_id}"
      provenance_type: "${provenance_type}"
      provenance_custom_id: "${provenance_custom_id}"
    ) {
      status
      message
      refund ${WMRefund}
    }
  }
  `;

export const ADD_REFUND_COUPON = (_id) => `mutation{
    addRefundCoupon(_id:"${_id}")${WMRefund}
  }`;

export const ADD_PEDIDO_CANCELED = ({ pedido_id, reason_id }) => `mutation{
  addPedidoCanceled(
    pedido_id:"${pedido_id}",
    reason_id:"${reason_id}"
  ){
    status
    message
    pedidoCanceled{
      _id
      custom_id
      pedido_id
      reason_id
       request_date
      reason${WMTable}
    }
  }
}`;

export const REQUEST_ACCOUNT_DEPOSIT = (refund_id) => `mutation{
  requestAccountDeposit(refund_id:"${refund_id}")${WMRefund}
}`;

export const ACCOUNT_REFUNDS = ({
  page,
  itemsPage,
  search,
  coupon_refund,
  provenance,
  desde,
  hasta,
  deposited
}) => `{
  accountRefunds(
    page:${page},
    itemsPage:${itemsPage},
    filtro:{
      ${search != '' ? `search:"${search}"` : ``},
      ${
        typeof coupon_refund == 'boolean'
          ? `coupon_refund:${coupon_refund},`
          : ``
      }
      ${provenance != 'ambos' ? `provenance:"${provenance}",` : ``}
      ${
        desde != hasta
          ? `date_range: { desde: "${desde}", hasta: "${hasta}" },`
          : ``
      }
      ${typeof deposited == 'boolean' ? `deposited:${deposited}` : ``}
    }
  ){
    ${WMInfo}
    accountsRefund{
      _id
      custom_id
      buyer
      provenance
      provenance_id
      request_date
      transaction_date
      single_order
      coupon
      transaction_id
      amount
      deposited
      deposit_date
      agent_covende
      type
    }
  }
    accountRefundsCSV
}`;

export const ADD_ACOUNT_DEPOSIT = (ids, user_id) => `
mutation {
  addAccountsDeposit(_ids: "${ids}", user_id: "${user_id}")
}
`;
