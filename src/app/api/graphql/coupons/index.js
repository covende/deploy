// Infraestructure
import { InfraGQL } from '@/app/infrastructure';

// Data
import { couponDefs } from './typeDefs';

const api = {
  fetch: async () => {
    const res = await InfraGQL.query(couponDefs.query.COUPONS);
    return res.data.coupons;
  },
  fetchByID: async (variables) => {
    const res = await InfraGQL.query(couponDefs.query.COUPON_BY_ID, variables);
    return res.data.couponByID;
  },
  fetchByName: async (variables) => {
    const res = await InfraGQL.query(
      couponDefs.query.COUPONS_BY_NAME,
      variables
    );
    return res.data.couponsByName;
  },
  fetchTypes: async () => {
    const res = await InfraGQL.query(couponDefs.query.COUPON_TYPES);
    return res.data.couponTypes;
  },
  fetchTypeByID: async (variables) => {
    const res = await InfraGQL.query(
      couponDefs.query.COUPON_TYPE_BY_ID,
      variables
    );
    return res.data.couponTypeByID;
  },
  fetchTypesByName: async (variables) => {
    const res = await InfraGQL.query(
      couponDefs.query.COUPON_TYPES_BY_NAME,
      variables
    );
    return res.data.couponTypesByName;
  },
  addItem: async (variables) => {
    const res = await InfraGQL.mutation(
      couponDefs.mutation.ADD_COUPON,
      variables
    );
    return res.addCoupon;
  },
  editItem: async (variables) => {
    const res = await InfraGQL.mutation(
      couponDefs.mutation.EDIT_COUPON,
      variables
    );
    return res.editCoupon;
  },
  deleteItem: async (variables) => {
    const res = await InfraGQL.mutation(
      couponDefs.mutation.DELETE_COUPON,
      variables
    );
    return res.deleteCoupon;
  },
  addTypeItem: async (variables) => {
    const res = await InfraGQL.mutation(
      couponDefs.mutation.ADD_COUPON_TYPE,
      variables
    );
    return res.addCouponType;
  },
  editTypeItem: async (variables) => {
    const res = await InfraGQL.mutation(
      couponDefs.mutation.EDIT_COUPON_TYPE,
      variables
    );
    return res.editCouponType;
  },
  deleteTypeItem: async (variables) => {
    const res = await InfraGQL.mutation(
      couponDefs.mutation.DELETE_COUPON_TYPE,
      variables
    );
    return res.deleteCouponType;
  }
};

export default api;
