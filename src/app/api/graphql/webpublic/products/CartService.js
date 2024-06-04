import WMProduct from '../../webmodel/WMProduct';
import WMProductItemPublic from '../../webmodel/WMProductItemPublic';
import { gql } from 'graphql-request';
import { InfraGQL } from '@/app/infrastructure';
import WMShoppingCart from '@CVApi/core/webmodel/WMShoppingCart';

export const PUBLIC_PRODUCT_BY_ID = ({ store_id, product_id }) => `{
	productById(product_id:"${product_id}", store_id:"${store_id}"){
    status
    message
    product${WMProduct}
  }
}`;

export const PRODUCT_PUBLIC_BY_ID = (product_id) => `{
	productPublicById(id:"${product_id}")${WMProductItemPublic}
}`;

export const PRODUCTS_WISH_LIST_BY_USER = ({
  page = 1,
  user_id,
  itemsPage = 4,
  search = ''
}) => `{
  productsWishListByUser(
    page: ${page}
    itemsPage: ${itemsPage}
    user_id: "${user_id}"
    search: "${search}"
  ) {
    status
    info {
      page
      total
      itemsPage
      pages
    }
    productsItemPublic {
      product_id
      product_slug
      product_photo
      product_name
      main_category
      precio
      offer
      delivery_free
      offer_type
      offer_value
      percentage_oferta
      sale_type
      store_id
      wholesale {
        price
				maximum_order
        minimum_order
      }
      variations {
        item_id
        stock
        price
        ref_attr
        attributes {
          name
          hexa
          id
          value
          value_id
        }
      }
      precio_minimo
      precio_maximo
      pedido_minimo
      product_attributes {
        name
        id_attribute
        attribute_details {
          product_attribute_detail_id
          creator_id
          __typename
          name
          description
          type_attribute
          color
          product_attribute_id
        }
      }
      company {
        comercial_name
        social_razon
        stars
        _id
      }
      stars
      stock
      views
      comments
    }
  }
}`;

export const GET_SHOPING_CART_BY_ID = (user_id) => `{
  getShoppingCartByID(_id: "${user_id}") {
    status
    message
    shoppingCart ${WMShoppingCart}
  }
}`;

export const SHIPPING_CHANGE_COURIER = (
  cart_id,
  item_id,
  courier,
  delivery_type
) => `
mutation {
  shippingChangeCourier(
    _id: "${cart_id}"
    item_id: "${item_id}"
    courier: "${courier}"
    delivery_type: "${delivery_type}"
  ) {
    status
    message
    status
    delivery_price
    delivery_time
    delivery_total
    shoppingCart_total
  }
}
`;

export const GET_SHIPPING_PRICE_CART = (id, direction_id) => `
mutation {
  setShippingPriceCart(
    _id: "${id}"
    direction_id: "${direction_id}"
  ) {
    status
    message
    shoppingCart ${WMShoppingCart}
  }
}
`;

export const DELETE_COUPON_SHOPPING_CART = (id) => `
mutation {
  deleteCouponShoppingCart(
    _id: "${id}"
  ) {
    status
    message
    shoppingCart ${WMShoppingCart}
  }
}

`;

export const QUANTITY_PRODUCTS_SHOPPING_CART = (id = '') => `{
  quantityProductsShoppingCart(_id: "${id}")
}`;

const DELETE_SHOPPING_CART_ALL_FIELDS = gql`
  fragment respShoppingCart on RespShoppingCart {
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
      delivery_error
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
        product {
          product_name
          stars
          store_id
          main_photograph
          sku
          slug
          enable
          offer
          offer_type
          offer_value
          thumbnail
          offer_percentage
          product_condition
          delivery_free
          product_detail {
            featured_description
          }
          product_name
          stock
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
`;

const DELETE_SHOPPING_CART_PRODUCTSS = gql`
  ${DELETE_SHOPPING_CART_ALL_FIELDS}
  mutation deleteShoppingCartProducts($_id: String, $products_ids: [String]) {
    deleteShoppingCartProducts(_id: $_id, products_ids: $products_ids) {
      ...respShoppingCart
    }
  }
`;

export const deleteShoppingCartProducts = async (variables) => {
  const res = await InfraGQL.mutation(
    DELETE_SHOPPING_CART_PRODUCTSS,
    variables
  );
  return res;
};

export const CLEAR_SHOPPING_CART = (cart_id) => `mutation {
  clearShoppingCart(_id: "${cart_id}"){
    status
    message
    shoppingCart ${WMShoppingCart}
  }
}`;

export const DELETE_SHOPPING_CART_PRODUCTS = (_id, productId, products_ids) => `
mutation {
  deleteShoppingCartProducts(
    _id: "${_id}"
    products_ids: [${productId ? productId : [...products_ids]}]
  ) {
    status
    message
    shoppingCart ${WMShoppingCart}
  }
}
`;

export const UPDATE_STOCK_SHOPPING_CART = (
  id,
  product_id,
  quantity = 0
) => `mutation{
  updateStockShoppingCart(
    _id: "${id}"
    product_id: "${product_id}"
    quantity: ${quantity}
  ) {
    status
    message
    shoppingCart ${WMShoppingCart}
  }
}`;
