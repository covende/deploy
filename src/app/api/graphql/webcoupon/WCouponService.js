import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { formatpaginate } from '@/common/utils/methods';
import {
  ADD_COUPON,
  CANCEL_COUPON,
  COMPANIES_BY_NAME,
  COUPON_BY_ID,
  COUPON_STATUS_COUNTER,
  DELETE_COUPON,
  EDIT_COUPON,
  GENERATE_COUPON_NAME,
  LIST_COUPONS,
  PRODUCTS_BY_NAME,
  USED_COUPONS,
  VALIDATE_COUPON,
  SHOPING_CARD_COUPON,
  VALIDATE_COUPON_FOR_PLAN
} from './WCoupunTypes';

export const list_coupons = async ({
  page = 1,
  itemsPage = 10,
  status = '',
  search = ''
}) => {
  const { coupons } = await AxiosGQL(
    LIST_COUPONS({ itemsPage, page, status, search })
  );
  return { info: formatpaginate(coupons.info), coupons: coupons.coupons };
};
export const add_coupon = async (coupon) => {
  const { addCoupon } = await AxiosGQL(ADD_COUPON(coupon));
  return addCoupon;
};
export const edit_coupon = async (coupon) => {
  const { editCoupon } = await AxiosGQL(EDIT_COUPON(coupon));
  return editCoupon;
};
export const coupon_by_id = async (coupon_id) => {
  const { couponByID } = await AxiosGQL(COUPON_BY_ID(coupon_id));
  return couponByID;
};
export const delete_coupon = async (coupon_id) => {
  const { deleteCoupon } = await AxiosGQL(DELETE_COUPON(coupon_id));
  return deleteCoupon;
};
export const cancel_coupon = async ({ coupon_id, status }) => {
  const { cancelCoupon } = await AxiosGQL(CANCEL_COUPON({ coupon_id, status }));
  return cancelCoupon;
};
export const coupon_status_counter = async () => {
  const { couponStatusCounter } = await AxiosGQL(COUPON_STATUS_COUNTER());
  return couponStatusCounter;
};

export const used_coupons = async ({ itemsPage, page, name }) => {
  const { usedCoupons } = await AxiosGQL(
    USED_COUPONS({ itemsPage, page, name })
  );
  return {
    info: formatpaginate(usedCoupons.info),
    coupons: usedCoupons.usedCoupons
  };
};

export const validate_coupon = async (name, type) => {
  const validateCoupon = await AxiosGQL(VALIDATE_COUPON(name, type));
  return validateCoupon.validateCoupon;
};

export const validate_coupon_for_plan = async (name, plan, user) => {
  const validateCouponForStorePlan = await AxiosGQL(
    VALIDATE_COUPON_FOR_PLAN(name, plan, user)
  );
  return validateCouponForStorePlan.validateCouponForStorePlan;
};

export const coupon_shopping_cart = async (id, code_cupon) => {
  const shopingcardCoupon = await AxiosGQL(SHOPING_CARD_COUPON(id, code_cupon));
  return shopingcardCoupon.addCouponShoppingCart;
};

export const companies_by_name = async ({
  name = '',
  categories = [],
  limit = 10
}) => {
  const { companiesByName } = await AxiosGQL(
    COMPANIES_BY_NAME({ name, categories, limit })
  );
  return companiesByName || [];
};

export const products_by_name = async ({
  name = '',
  stores = [],
  categories = [],
  limit = 10
}) => {
  const { productsByName } = await AxiosGQL(
    PRODUCTS_BY_NAME({ name, stores, categories, limit })
  );
  return productsByName || [];
};

export const generate_coupon_name = async () => {
  const { generateCouponName } = await AxiosGQL(GENERATE_COUPON_NAME);
  return generateCouponName;
};
