/**
 *
 * @param {Object} param0
 * @param {Object} param0.coupon
 * @param {Number} param0.monto
 * @param {String} param0.product_id
 * @param {String} param0.categories_id
 * @param {Boolean} param0.product_offers
 * @param {String} param0.user_id
 * @param {('subscription'|'products')} param0.aplicable
 * @returns
 */
export const CVCouponValidate = ({
  coupon,
  monto,
  product_id,
  categories_id,
  product_offers = false,
  user_id,
  aplicable
}) => {
  let amount = monto;
  let discount =
  coupon.discount_type === 'FIXED'
  ? coupon.discount
  : eval(((10 / 100) * 1).toFixed(2));
  let valid = true;
  if (coupon.discount_type === 'PERCENT') amount = monto - discount;
  if (coupon.discount_type === 'FIXED') amount = monto - discount;
  if (monto < coupon.minimum_amount) {
    valid = false;
  }
  if (coupon.uses >= coupon.maximum_uses) {
    console.log('El cupon ya supero el limite de ussos');
    valid = false;
  }
  if (
    coupon.products_ids.length > 0 &&
    !coupon.products_ids.includes(product_id)
  ) {
    console.log('cupon no valido para este prioducto');
    valid = false;
  }
  if (
    coupon.categories_ids.length > 0 &&
    !coupon.categories_ids.includes(categories_id)
  ) {
    console.log('categoria permitida de producto');
    valid = false;
  }
  if (!coupon.apply_in_offers && product_offers) {
    console.log('No aplicable para productoes en oferta');
    valid = false;
  }
  let useds = (coupon?.users_used || []).find(
    (item) => item.user_id == user_id
  );
  if ((useds?.times || 0) >= coupon.users_uses) {
    console.log('limite de usus superado');
    valid = false;
  }

  if (aplicable == 'subscription' && coupon.aplicable != 'subscription_plans') {
    console.log('solo aplicable a suscripcion');
    valid = false;
  }
  if (
    aplicable == 'products' &&
    !(coupon.aplicable == 'products_all' || coupon.aplicable == 'selected')
  ) {
    console.log('Solo aplicable a producto');
    valid = false;
  }
  return {
    valid,
    amount,
    discount
  };
};
