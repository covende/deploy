import WMPedido from '../../webmodel/WMPedido';
import WMInfo from '../../webmodel/WMInfo';
import { gql } from 'graphql-request';
import { InfraGQL } from '@/app/infrastructure';

export const PEDIDOS_PAGINATION = ({
  page = 1,
  itemsPage = 10,
  pedido_status = 'ALL',
  product_name = '',
  start_date,
  end_date,
  buy_type = ''
}) => `{
	pedidosPagination(
    page:${page}
    itemsPage:${itemsPage}
    filtro:{
      ${pedido_status != 'ALL' ? `pedido_status:"${pedido_status}"` : ``}
      ${product_name != '' ? `search:"${product_name}"` : ``}
      ${buy_type != '' ? `buy_type:"${buy_type}"` : ``}
      ${
        end_date == start_date
          ? ``
          : `date_range: {
        hasta: "${end_date}"
        desde: "${start_date}"
      }`
      }
    }
    relations:{
      cip: false
      coupon: false
      statuses: false
      store: true
      seller: true
      buyer: true
      product: false
      receiver_department: false
      receiver_province: false
      receiver_district: false
      courier: false
      method_payment: true
      coin: false
      permit_devolution: false
      permit_cancelled: true
    }
  ){
    ${WMInfo}
    pedidos${WMPedido({
      method_payment: true,
      store: true,
      buyer: true,
      seller: true,
      permit_cancelled: true
    })}
  }
}`;

const DELETE_PEDIDOS_SELLER = gql`
  fragment respSimple on RespSimple {
    status
    message
  }
  mutation deletePedidosBySeller(
    $company_id: String!
    $order_ids: [String!]
    $no_orders: [String!]
    $pedido_status: String
    $search: String
    $date_range: IDateRange
  ) {
    deletePedidosBySeller(
      company_id: $company_id
      order_ids: $order_ids
      no_orders: $no_orders
      pedido_status: $pedido_status
      search: $search
      date_range: $date_range
    ) {
      ...respSimple
    }
  }
`;

export const deletePedidosSeller = async (variables) => {
  const data = await InfraGQL.mutation(DELETE_PEDIDOS_SELLER, variables);
  return data;
};

export const PROCESS_PEDIDOS = ({
  company_id,
  start_date,
  end_date,
  order_ids = [],
  no_orders = [],
  search = ''
}) => `
  mutation {
    processPedidos(
      company_id: "${company_id}"
      order_ids: ${JSON.stringify(order_ids)}
      no_orders: ${JSON.stringify(no_orders)}
      search: "${search}"
      ${
        end_date == start_date
          ? ``
          : `date_range: {
        hasta: "${end_date}"
        desde: "${start_date}"
      }`
      }
    ){
     status
     message
    }
  }
`;

export const SEND_PEDIDOS = ({
  company_id,
  start_date,
  end_date,
  order_ids = [],
  no_orders = [],
  search = ''
}) => `
  mutation {
    sendPedidos(
      company_id: "${company_id}"
      order_ids: ${JSON.stringify(order_ids)}
      no_orders: ${JSON.stringify(no_orders)}
      search: "${search}"
      ${
        end_date == start_date
          ? ``
          : `date_range: {
        hasta: "${end_date}"
        desde: "${start_date}"
      }`
      }
    ){
     status
     message
    }
  }
`;

export const UPDATE_STATUS_PEDIDOS_BY_FILE = ({ company_id, file = '' }) => `
  mutation {
    updateStatusPedidosByFile(
      company_id: "${company_id}"
      file: "${file}"
    ){
     status
     message
    }
  }
`;

export const COMPLETE_PEDIDOS = ({
  company_id,
  start_date,
  end_date,
  order_ids = [],
  no_orders = [],
  search = ''
}) => `
  mutation {
    completePedidos(
      company_id: "${company_id}"
      order_ids: ${JSON.stringify(order_ids)}
      no_orders: ${JSON.stringify(no_orders)}
      search: "${search}"
      ${
        end_date == start_date
          ? ``
          : `date_range: {
        hasta: "${end_date}"
        desde: "${start_date}"
      }`
      }
    ){
     status
     message
    }
  }
`;

export const TOTAL_PEDIDOS_BY_STATUS = ({
  company_id,
  start_date,
  end_date,
  order_ids = [],
  no_orders = [],
  search = '',
  status = ''
}) => `{
  totalOrdersByStatus(
      company_id: "${company_id}"
      order_ids: ${JSON.stringify(order_ids)}
      no_orders: ${JSON.stringify(no_orders)}
      search: "${search}"
      pedido_status: "${status}"
      ${
        end_date == start_date
          ? ``
          : `date_range: {
        hasta: "${end_date}"
        desde: "${start_date}"
      }`
      }
    ){
     status
     message
     data
    }
  }`;

export const PEDIDOS_BY_PROCESS = ({
  company_id,
  start_date,
  end_date,
  order_ids = [],
  no_orders = [],
  search = ''
}) => `{
    ordersByProcess(
      company_id: "${company_id}"
      order_ids: ${JSON.stringify(order_ids)}
      no_orders: ${JSON.stringify(no_orders)}
      search: "${search}"
      ${
        end_date == start_date
          ? ``
          : `date_range: {
        hasta: "${end_date}"
        desde: "${start_date}"
      }`
      }
    ){
      ${WMInfo}
      pedidos${WMPedido({})}
    }
  }`;

export const PEDIDOS_PAGINATION_SELLER = ({
  company_id,
  page = 1,
  itemsPage = 10,
  product_name = '',
  pedido_status = 'ALL',
  start_date = '',
  end_date = ''
}) => `{
  pedidosPagination(
    page:${page}
    itemsPage:${itemsPage}
    filtro:{
      company_id:"${company_id}"
      ${pedido_status != 'ALL' ? `pedido_status:"${pedido_status}"` : ``}
      ${product_name != '' ? `search:"${product_name}"` : ``}
      ${
        end_date == start_date
          ? ``
          : `date_range: {
            hasta: "${end_date}"
            desde: "${start_date}"
      }`
      }
    }
    relations:{
      cip: false
      coupon: false
      statuses: false
      store: false
      seller: false
      buyer: false
      product: false
      receiver_department: false
      receiver_province: false
      receiver_district: false
      courier: false
      method_payment: true
      coin: false
      permit_devolution: false
      permit_cancelled: true
    }
  ){
    ${WMInfo}
    pedidos${WMPedido({
      method_payment: true,
      permit_cancelled: true
    })}
  }
}`;

export const ADD_ORDER_EXCESS_SHIPPING = (pedido_id) => `
mutation {
  addOrderExcessShipping(pedido_id: "${pedido_id || ''}") {
    status
    message
  }
}
`;

export const ADD_PEDIDOS_CANCELED_SELLER = (orderCancel) => `mutation {
  addPedidoCanceledSeller(
    company_id: "${orderCancel.company_id}"
    pedido_id: "${orderCancel.idpedido}"
    reason_id: "${orderCancel.reasonId}"
  ) {
    status
    message
    pedidoCanceled {
      _id
      custom_id
      pedido_id
      reason_id
      request_date
      reason {
        _id
      }
    }
  }
}
  `;

export const REJECT_CONFIRMATION_SALE_CUT = (
  companySaleCutID,
  message
) => `mutation {
  rejectConfirmationSaleCut(companySaleCutID: "${companySaleCutID}", message: "${message}") {
    status
    message
  }
}
`;

export const PEDIDOS_PAGINATION_BUYER = ({
  buyer_id,
  page = 1,
  itemsPage = 10,
  product_name = '',
  pedido_status = 'ALL',
  start_date = '',
  end_date = ''
}) => `{
  pedidosPagination(
    page:${page}
    itemsPage:${itemsPage}
    filtro:{
      buyer_id:"${buyer_id}"
      ${pedido_status != 'ALL' ? `pedido_status:"${pedido_status}"` : ``}
      ${product_name != '' ? `search:"${product_name}"` : ``}
      ${
        end_date == start_date
          ? ``
          : `date_range: {
        hasta: "${end_date}"
        desde: "${start_date}"
      }`
      }
    }
    relations:{
      cip: false
      coupon: false
      statuses: false
      store: true
      seller: false
      buyer: false
      product: true
      receiver_department: false
      receiver_province: false
      receiver_district: false
      courier: false
      method_payment: true
      coin: false
      permit_devolution: true
      permit_cancelled: true
    }
  ){
    ${WMInfo}
    pedidos${WMPedido({
      method_payment: true,
      store: true,
      permit_devolution: true,
      permit_cancelled: true,
      product: true
    })}
  }
}`;

export const PEDIDOS_PAGINATION_BUYER_INITIAL = ({
  buyer_id,
  itemsPage = 3
}) => `{
    pedidosPagination(
    itemsPage: ${itemsPage}
    filtro:{ buyer_id: "${buyer_id}"}
    relations: {
      store: true
      seller: true
      product: true
      receiver_district: true
    }
  ) {
    info {
      page
      total
      itemsPage
      pages
    }
    status
    message
    pedidos {
      pedido_id
      custom_id
      store {
        comercial_name
        social_razon
        stars
      }
      receiver_district {
        name
      }
      seller {
        first_name
        last_name
      }
      product {
        photo
        name
        product_origin
        product_condition
        featured_description
      }
    }
  }
}`;

export const PEDIDO_DETAILS = (pedido_id) => `{
	pedidoById(
    id:"${pedido_id}"
    relations:{
      cip: false
      coupon: false
      statuses: false
      store: true
      seller: false
      buyer: true
      product: true
      receiver_department: true
      receiver_province: true
      receiver_district: true
      courier: true
      method_payment: true
      coin: false
      permit_devolution: false
      permit_cancelled: true
    }
  )
    ${WMPedido({
      store: true,
      buyer: true,
      product: true,
      receiver_department: true,
      receiver_province: true,
      receiver_district: true,
      courier: true,
      permit_cancelled: true,
      method_payment: true
    })}
}`;

export const PEDIDO_DETAILS_BY_ID = (pedido_id) => `{
	pedidoById(
    id:"${pedido_id}"
    relations:{
      cip: false
      coupon: false
      statuses: false
      store: true
      seller: false
      buyer: false
      product: true
      receiver_department: false
      receiver_province: false
      receiver_district: false
      courier: false
      coin: false
      permit_devolution: false
      permit_cancelled: false
      method_payment: true
    }
  )
    ${WMPedido({
      store: true,
      method_payment: true
    })}
}`;

export const PEDIDO_STATUS_COUNTER = ({ store_id = '', buyer_id = '' }) => `{
  pedidoStatusCounter${store_id != '' || buyer_id != '' ? `(` : ``}
    ${store_id != '' ? `store_id: "${store_id}"` : ``}
    ${buyer_id != '' ? `buyer_id: "${buyer_id}"` : ``}
  ${store_id != '' || buyer_id != '' ? `)` : ``} {
    original_name
    name
    background_color
    total
  }
}
`;

export const GET_TRACKING_BY_PEDIDO = (pedido_id) => `{
  getTrackingByPedido(pedido_id:"${pedido_id}",relations:{
    cip: false
    coupon: false
    statuses: true
    store: false
    seller: false
    buyer: false
    product: false
    receiver_department: false
    receiver_province: false
    receiver_district: false
    courier: false
    method_payment: false
    coin: false
    permit_devolution: false
    permit_cancelled: false
  })
    ${WMPedido({
      statuses: true
    })}
  
}`;
