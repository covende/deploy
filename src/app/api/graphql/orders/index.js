// Infraestructure
import { InfraGQL } from '@/app/infrastructure';

// Data
import { orderDefs } from './typeDefs';

const api = {
  fetchOrders: async () => {
    const res = await InfraGQL.query(orderDefs.query.ORDERS);
    return res.data.orders;
  },
  fetchOrderByID: async () => {
    const res = await InfraGQL.query(orderDefs.query.ORDER_BY_ID);
    return res.data.orderByID;
  },
  fetchOrderByBuyerID: async () => {
    const res = await InfraGQL.query(orderDefs.query.ORDER_BY_BUYER_ID);
    return res.data.ordersByBuyerId;
  },
  fetchOrderBySellerID: async () => {
    const res = await InfraGQL.query(orderDefs.query.ORDER_BY_SELLER_ID);
    return res.data.ordersBySellerId;
  },
  fetchOrderStates: async () => {
    const res = await InfraGQL.query(orderDefs.query.ORDER_STATES);
    return res.data.orderStates;
  },
  fetchOrderStateByCode: async () => {
    const res = await InfraGQL.query(orderDefs.query.ORDER_STATE_BY_CODE);
    return res.data.orderStateByID;
  },
  fetchOrderStatesByName: async () => {
    const res = await InfraGQL.query(orderDefs.query.ORDER_STATES_BY_NAME);
    return res.data.orderStatesByName;
  },
  fetchTypes: async () => {
    const res = await InfraGQL.query(orderDefs.query.ORDER_TYPES);
    return res.data.orderTypes;
  },
  fetchTypeByID: async () => {
    const res = await InfraGQL.query(orderDefs.query.ORDER_TYPE_BY_ID);
    return res.data.orderTypeByID;
  },
  fetchTypesByName: async () => {
    const res = await InfraGQL.query(orderDefs.query.ORDER_TYPES_BY_NAME);
    return res.data.orderTypesByName;
  },
  addOrder: async (variables) => {
    const res = await InfraGQL.mutation(
      orderDefs.mutation.ADD_ORDER,
      variables
    );
    return res.addOrder;
  },
  editOrder: async (variables) => {
    const res = await InfraGQL.mutation(
      orderDefs.mutation.EDIT_ORDER,
      variables
    );
    return res.editOrder;
  },
  deleteOrder: async (variables) => {
    const res = await InfraGQL.mutation(
      orderDefs.mutation.DELETE_ORDER,
      variables
    );
    return res.deleteOrder;
  },
  addOrderState: async (variables) => {
    const res = await InfraGQL.mutation(
      orderDefs.mutation.ADD_ORDER_STATE,
      variables
    );
    return res.addOrderState;
  },
  editOrderState: async (variables) => {
    const res = await InfraGQL.mutation(
      orderDefs.mutation.EDIT_ORDER_STATE,
      variables
    );
    return res.editOrderState;
  },
  deleteOrderState: async (variables) => {
    const res = await InfraGQL.mutation(
      orderDefs.mutation.DELETE_ORDER_STATE,
      variables
    );
    return res.deleteOrderState;
  },
  addOrderType: async (variables) => {
    const res = await InfraGQL.mutation(
      orderDefs.mutation.ADD_ORDER_TYPE,
      variables
    );
    return res.addOrderType;
  },
  editOrderType: async (variables) => {
    const res = await InfraGQL.mutation(
      orderDefs.mutation.EDIT_ORDER_TYPE,
      variables
    );
    return res.editOrderType;
  },
  deleteOrderType: async (variables) => {
    const res = await InfraGQL.mutation(
      orderDefs.mutation.EDIT_ORDER_TYPE,
      variables
    );
    return res.deleteOrderType;
  }
};

export default api;
