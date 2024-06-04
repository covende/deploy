import WMCoupon from '../webmodel/WMCoupon';
import WMInfo from '../webmodel/WMInfo';

export const LIST_COUPONS = ({
  page = 1,
  itemsPage = 10,
  status = '',
  search = ''
}) => `{
	coupons(page:${page}, itemsPage:${itemsPage}, status:"${status}", search:"${search}"){
    ${WMInfo}
    coupons${WMCoupon}
  }
}`;

export const ADD_COUPON = (coupon) => `mutation {
    addCoupon(
      name: "${coupon.name}"
      discount_type: "${coupon.discount_type}"
      discount: ${coupon.discount}
      start_date: "${coupon.start_date}"
      expiration_date: "${coupon.expiration_date}"
      maximum_uses: ${coupon.maximum_uses}
      users_uses: ${coupon.users_uses}
      aplicable: "${coupon.aplicable}"
      ${
        coupon.categories_ids.length > 0
          ? `categories_ids: ${JSON.stringify(coupon.categories_ids)}`
          : ``
      }
      ${
        coupon.stores_ids.length > 0
          ? `stores_ids: ${JSON.stringify(coupon.stores_ids)}`
          : ``
      }
      ${
        coupon.products_ids.length > 0
          ? `products_ids: ${JSON.stringify(coupon.products_ids)}`
          : ``
      }
      apply_in_offers: ${coupon.apply_in_offers}
      minimum_amount: ${coupon.minimum_amount}
    ) {
      status
      message
      coupon ${WMCoupon}
    }
  }
  `;

export const EDIT_COUPON = (coupon) => `mutation{
    editCoupon(
        coupon_id:"${coupon.coupon_id}"
        name: "${coupon.name}"
        discount_type: "${coupon.discount_type}"
        discount: ${coupon.discount}
        start_date: "${coupon.start_date}"
        expiration_date: "${coupon.expiration_date}"
        maximum_uses: ${coupon.maximum_uses}
        users_uses: ${coupon.users_uses}
        aplicable: "${coupon.aplicable}"
        ${
          coupon.categories_ids.length > 0
            ? `categories_ids: ${JSON.stringify(coupon.categories_ids)}`
            : ``
        }
        ${
          coupon.stores_ids.length > 0
            ? `stores_ids: ${JSON.stringify(coupon.stores_ids)}`
            : ``
        }
        ${
          coupon.products_ids.length > 0
            ? `products_ids: ${JSON.stringify(coupon.products_ids)}`
            : ``
        }
        apply_in_offers: ${coupon.apply_in_offers}
        minimum_amount: ${coupon.minimum_amount}
    ){
      status
      message
      coupon${WMCoupon}
    }
  }`;

export const COUPON_BY_ID = (coupon_id) => `{
    couponByID(coupon_id:"${coupon_id}")${WMCoupon}
  }`;

export const DELETE_COUPON = (coupon_id) => `mutation{
    deleteCoupon(coupon_id:"${coupon_id}")${WMCoupon}
  }`;

export const CANCEL_COUPON = ({ coupon_id, status }) => `mutation{
    cancelCoupon(coupon_id:"${coupon_id}",status:${status})${WMCoupon}
  }`;

export const COUPON_STATUS_COUNTER = () => `{
	couponStatusCounter{
    name
    background_color
    total
  }
}`;

export const USED_COUPONS = ({ page = 1, itemsPage = 10, name = '' }) => `{
  usedCoupons(page:${page}, itemsPage:${itemsPage}, name:"${name}"){
    ${WMInfo}
    usedCoupons{
      comprador
      vendedor_id
      pedido_id
      cupon_name
      cupon_valor
      cupon_tipo
      monto
      fecha
    }
  }
}`;

export const VALIDATE_COUPON = ({ name, type }) => `{
  validateCoupon(name: "${name}", type: "${type}"){
    status
    message
    coupon${WMCoupon}
  }
}`;

export const VALIDATE_COUPON_FOR_PLAN = ({ name, plan, user }) => `{
  validateCouponForStorePlan(name: "${name}", plan: "${plan}", user: "${user}"){
    status
    message
    coupon${WMCoupon}
  }
}`;

export const SHOPING_CARD_COUPON = ({ id, code_cupon }) => `mutation{
  addCouponShoppingCart(_id: "${id}", code_coupon: "${code_cupon}"){
    status
    message
    shoppingCart {
      id
      user_id
      cart_type
      coupon_id
      coupon_code
      status
      coupon_total
      delivery_address {
        _id
        direccion
      }
      subtotal
      delivery_total
      saving_total
      discount_total
      total
      products {
        _id
        product_id
        variation_id
        type
        quantity
        price
        discount
        offer_percentage
        stock
        subtotal
        delivery_price
        saving
        total
        delivery_time
        attributes
        deliveries {
          price
          delivery_time
          courier
          delivery_type
        }
        delivery_code
        product {
          product_name
          stars
          store_id
          main_photograph
          sku
          slug
          enable
          offer_percentage
          product_condition
          product_detail {
            featured_description
          }
          offer
          product_name
          stock
          offer_type
          offer_value
          thumbnail
          product_attributes {
            name
            id_attribute
          }
          main_photograph
        }
        store {
          comercial_name
        }
      }
    }
  }  
}`;

export const COMPANIES_BY_NAME = ({
  name = '',
  categories = [],
  limit = 10
}) => `{
	companiesByName(name:"${name}",categories:${JSON.stringify(
  categories
)}, limit:${limit}){
    _id
    comercial_name
    social_razon
  }  
}`;

export const PRODUCTS_BY_NAME = ({
  name = '',
  stores = [],
  categories = [],
  limit = 10
}) => `{
  productsByName(name:"${name}", stores:${JSON.stringify(
  stores
)}, categories:${JSON.stringify(categories)}, limit:${limit}){
    product_id
    product_name
  }
}`;

export const GENERATE_COUPON_NAME = `{
  generateCouponName
}`;
