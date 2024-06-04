import { TIPODATE } from '@/common/CovendeTemplate/CVThemes';
import { formatFecha } from '@/common/utils/methods';
import AxiosGQL from '../../rest/AxiosGQL';
import {
  COMPLETE_PEDIDOS,
  GET_TRACKING_BY_PEDIDO,
  PEDIDOS_BY_PROCESS,
  PEDIDOS_PAGINATION,
  PEDIDOS_PAGINATION_BUYER,
  PEDIDOS_PAGINATION_BUYER_INITIAL,
  PEDIDOS_PAGINATION_SELLER,
  PEDIDO_DETAILS,
  PEDIDO_DETAILS_BY_ID,
  PEDIDO_STATUS_COUNTER,
  PROCESS_PEDIDOS,
  SEND_PEDIDOS,
  TOTAL_PEDIDOS_BY_STATUS,
  UPDATE_STATUS_PEDIDOS_BY_FILE
} from './types/PedidoType';

export const pedidos_pagination = async ({
  page = 1,
  itemsPage = 10,
  pedido_status = '',
  product_name = '',
  start_date,
  end_date,
  buy_type = 'compra',
  buyer_id = '',
  company_id = ''
}) => {
  const { pedidosPagination } = await AxiosGQL(
    PEDIDOS_PAGINATION({
      page,
      itemsPage,
      pedido_status,
      product_name,
      start_date: formatFecha(start_date),
      end_date: formatFecha(end_date),
      buy_type,
      buyer_id,
      company_id
    })
  );
  return {
    info: pedidosPagination.info || {},
    pedidos: pedidosPagination?.pedidos || []
  };
};

export const pedidos_by_process = async ({
  company_id,
  start_date,
  end_date,
  order_ids = [],
  no_orders = [],
  search = ''
}) => {
  const { ordersByProcess } = await AxiosGQL(
    PEDIDOS_BY_PROCESS({
      company_id,
      start_date,
      end_date,
      order_ids,
      no_orders,
      search,
      start_date: formatFecha(start_date),
      end_date: formatFecha(end_date)
    })
  );
  return {
    status: ordersByProcess?.status,
    message: ordersByProcess?.message,
    info: ordersByProcess.info || {},
    pedidos: ordersByProcess?.pedidos || []
  };
};

export const total_pedidos_by_status = async ({
  company_id,
  start_date,
  end_date,
  order_ids = [],
  no_orders = [],
  search = '',
  status = ''
}) => {
  const { totalOrdersByStatus } = await AxiosGQL(
    TOTAL_PEDIDOS_BY_STATUS({
      company_id,
      start_date,
      end_date,
      order_ids,
      no_orders,
      search,
      status,
      start_date: formatFecha(start_date),
      end_date: formatFecha(end_date)
    })
  );
  return {
    status: totalOrdersByStatus?.status,
    message: totalOrdersByStatus?.message,
    data: totalOrdersByStatus?.data
  };
};

export const process_pedidos = async ({
  company_id,
  start_date,
  end_date,
  order_ids = [],
  no_orders = [],
  search = ''
}) => {
  const { processPedidos } = await AxiosGQL(
    PROCESS_PEDIDOS({
      company_id,
      start_date,
      end_date,
      order_ids,
      no_orders,
      search,
      start_date: formatFecha(start_date),
      end_date: formatFecha(end_date)
    })
  );
  return {
    status: processPedidos?.status,
    message: processPedidos?.message
  };
};

export const send_pedidos = async ({
  company_id,
  start_date,
  end_date,
  order_ids = [],
  no_orders = [],
  search = ''
}) => {
  const { sendPedidos } = await AxiosGQL(
    SEND_PEDIDOS({
      company_id,
      start_date,
      end_date,
      order_ids,
      no_orders,
      search,
      start_date: formatFecha(start_date),
      end_date: formatFecha(end_date)
    })
  );
  return {
    status: sendPedidos?.status,
    message: sendPedidos?.message
  };
};

export const complete_pedidos = async ({
  company_id,
  start_date,
  end_date,
  order_ids = [],
  no_orders = [],
  search = ''
}) => {
  const { completePedidos } = await AxiosGQL(
    COMPLETE_PEDIDOS({
      company_id,
      start_date,
      end_date,
      order_ids,
      no_orders,
      search,
      start_date: formatFecha(start_date),
      end_date: formatFecha(end_date)
    })
  );
  return {
    status: completePedidos?.status,
    message: completePedidos?.message
  };
};

export const update_status_pedidos_by_file = async ({
  company_id,
  file = ''
}) => {
  const { updateStatusPedidosByFile } = await AxiosGQL(
    UPDATE_STATUS_PEDIDOS_BY_FILE({
      company_id,
      file
    })
  );
  return {
    status: updateStatusPedidosByFile?.status,
    message: updateStatusPedidosByFile?.message
  };
};

export const pedidos_paginacion_seller = async ({
  company_id,
  page,
  itemsPage,
  product_name,
  pedido_status,
  start_date,
  end_date
}) => {
  const { pedidosPagination } = await AxiosGQL(
    PEDIDOS_PAGINATION_SELLER({
      company_id,
      page,
      itemsPage,
      product_name,
      pedido_status,
      start_date: start_date ? formatFecha(start_date) : '',
      end_date: end_date ? formatFecha(end_date) : ''
    })
  );
  return {
    info: pedidosPagination.info || {},
    pedidos: pedidosPagination?.pedidos || []
  };
};

export const pedidos_paginacion_buyer = async ({
  buyer_id,
  page,
  itemsPage,
  product_name,
  pedido_status,
  tiempo
}) => {
  const dates = TIPODATE.find((it) => it.value == tiempo);
  const start_date = dates?.time()?.start_date || new Date();
  const end_date = dates?.time()?.end_date || new Date();

  const { pedidosPagination } = await AxiosGQL(
    PEDIDOS_PAGINATION_BUYER({
      buyer_id,
      page,
      itemsPage,
      product_name,
      pedido_status,
      start_date: formatFecha(start_date),
      end_date: formatFecha(end_date)
    })
  );
  return {
    info: pedidosPagination.info || {},
    pedidos: pedidosPagination?.pedidos || []
  };
};

export const pedidos_paginacion_buyer_intial = async ({
  buyer_id,
  itemsPage
}) => {
  const { pedidosPagination } = await AxiosGQL(
    PEDIDOS_PAGINATION_BUYER_INITIAL({
      buyer_id,
      itemsPage
    })
  );
  return {
    pedidos: pedidosPagination?.pedidos || []
  };
};

export const pedido_details = async (pedido_id) => {
  const { pedidoById } = await AxiosGQL(PEDIDO_DETAILS(pedido_id));
  return pedidoById || null;
};

export const pedido_details_by_id = async (pedido_id) => {
  const { pedidoById } = await AxiosGQL(PEDIDO_DETAILS_BY_ID(pedido_id));
  return pedidoById || null;
};

export const pedido_status_counter = async ({
  store_id = '',
  buyer_id = ''
}) => {
  const { pedidoStatusCounter } = await AxiosGQL(
    PEDIDO_STATUS_COUNTER({
      store_id,
      buyer_id
    })
  );
  return pedidoStatusCounter;
};

export const get_tracking_by_pedido = async (pedido_id) => {
  const { getTrackingByPedido } = await AxiosGQL(
    GET_TRACKING_BY_PEDIDO(pedido_id)
  );
  return getTrackingByPedido;
};
