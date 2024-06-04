import {
  ADD_WISH_IN_LIST,
  DELETE_WISH_FROM_LIST
} from '@/app/api/graphql/webtopbar/WishlistService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import { isExistValue } from '@/app/helpers/utils';
import { CVAlertError, CVAlertSuccess } from '../CVAlert';
import { A_CARD_PRODUCT } from './CVCardProductRedux/Actions';
import { CVMoneyFormat } from '../CVMethods';

/**
 * Agrega product_id a la lista de deseos
 * @param {{lista_deseos:Object,product_id:String}}
 * @returns {Boolean}
 */
export const productFavourite = ({ lista_deseos, product_id }) => {
  return (
    lista_deseos.filter((item) => item.product_id == product_id).length > 0
  );
};

/**
 * Verifica si existe o no un producto en la lista de carrito
 * @param {{lista_deseos:Object,product_id:String}}
 * @returns {Boolean}
 */
export const productincart = ({ lista_carrito, product_id }) => {
  return (
    lista_carrito.filter((item) => item.product_id == product_id).length > 0
  );
};

/**
 * Agraga y/o quita product_id de la lista de deseos 
 * @param {{
    inwish:Boolean,
    dispatch: any,
    lista_deseos: Array,
    product_id: String,
    addToast: Function
    store_id: String
  }}
 */
export const favorito = async ({
  inwish,
  dispatch,
  lista_deseos,
  product_id,
  addToast,
  store_id,
  whislist_added
}) => {
  let ls = [...lista_deseos];
  let us = getLoggedInUser();
  if (inwish) {
    ls = ls.filter((item) => item.product_id != product_id);
    if (us != null) {
      await AxiosGQL(
        DELETE_WISH_FROM_LIST({ product_id, user_id: us.user_id })
      );
    }
    CVAlertError({
      addToast,
      message: 'Producto Retirado',
      title: 'Lista de Deseos'
    });
  } else {
    ls = [...ls, { product_id }];
    if (us != null) {
      await AxiosGQL(
        ADD_WISH_IN_LIST({ product_id, user_id: us.user_id, store_id })
      );
    }
    CVAlertSuccess({
      addToast,
      message: 'Producto Agregado',
      title: 'Lista de Deseos'
    });
  }

  dispatch(
    A_CARD_PRODUCT({
      lista_deseos: ls,
      whislist_added: !whislist_added
    })
  );
};

/**
 * Agraga y/o quita product_id de la lista de carrito 
 * @param {{
    inwish:Boolean,
    dispatch: any,
    lista_deseos: Array,
    product_id: String,
    addToast: Function
  }}
 */
export const carrito = ({
  incart,
  dispatch,
  lista_carrito,
  product_id,
  price,
  addToast,
  quantity = 1,
  details = {},
  store_id,
  seemodal = true,
  product_photo,
  product_name,
  remove = true
}) => {
  let ls = [...lista_carrito];
  if (incart && remove) {
    ls = ls.filter((item) => item.product_id != product_id);
    CVAlertError({
      addToast,
      message: 'Producto Retirado',
      title: 'Carrito de Compra'
    });
  } else {
    let store = store_id || localStorage.getItem('store');
    ls = [...ls, { product_id, quantity, price, store_id: store, details }];
    localStorage.setItem(
      'added',
      JSON.stringify({
        product_photo,
        product_name,
        price
      })
    );
    CVAlertSuccess({
      addToast,
      message: 'Producto Agregado',
      title: 'Carrito de Compra'
    });
  }
  window.localStorage.setItem('mycart', toBase64(JSON.stringify(ls)));
  dispatch(
    A_CARD_PRODUCT({
      lista_carrito: ls,
      ...(seemodal ? { carrito_added: !incart } : {})
    })
  );
};

/**
 * Actualiza Carrito de Compra
 * @param {Array} ls
 */
export const carritoup = (ls = []) => {
  window.localStorage.setItem('mycart', toBase64(JSON.stringify(ls)));
};

/**
 * Verifica si se pude vender apor menor
 * @param {String} type_of_sale
 * @returns Boolean
 */
export const retail = (type_of_sale) =>
  ['RETAIL', 'BOTH'].includes(type_of_sale);

/**
 * Verifica si se pude vender apor menor
 * @param {String} type_of_sale
 * @returns Boolean
 */
export const whosale = (type_of_sale) =>
  ['WHOLESALE', 'BOTH'].includes(type_of_sale);

/**
 * Formato de Precios, si es rango o único
 * @param {{precio_minimo: Number|null, precio_maximo:Number|null,precio:Number }}
 * @returns {String}
 */
export const precios = ({
  precio_minimo = null,
  precio_maximo = null,
  precio = 0,
  offer_type,
  offer_value
}) => {
  let texto = '';

  if (precio_minimo && precio_maximo) {
    precio_minimo = CVMoneyFormat({
      amount: offerPrice({
        offer_type,
        offer_value,
        price: eval(precio_minimo)
      })
    });
    precio_maximo = CVMoneyFormat({
      amount: offerPrice({
        offer_type,
        offer_value,
        price: eval(precio_maximo + '')
      })
    });

    texto = `${precio_minimo} - ${precio_maximo}`;
  } else {
    texto = CVMoneyFormat({
      amount: offerPrice({
        offer_type,
        offer_value,
        price: eval(precio + '')
      })
    });
  }
  return texto;
};

/**
 * Formato de Precios, si es rango o único
 * @param {{precio_minimo: Number|null, precio_maximo:Number|null,precio:Number }}
 * @returns {String}
 */
export const isPrice = ({
  precio_minimo = null,
  precio_maximo = null,
  precio = 0
}) => {
  if (precio_minimo && precio_maximo) {
    return 'WHOLESALE';
  }
  return 'RETAIL';
};

/**
 * Calcula el precio inical del producto junto con la oferta
 * @param {{percentage_oferta:number, precio:number, fixed:Number}}
 * @returns {Number}
 */
export const offerprice = ({ percentage_oferta, precio, fixed = 2 }) => {
  if (percentage_oferta) {
    let total =
      eval(precio || 0) -
      (eval(precio || 0) * eval(percentage_oferta || 0)) / 100;
    return eval(total || 0).toFixed(fixed);
  }
  return precio;
};

/**
 *
 * @param {Object} param0
 * @param {string} param0.offer_type
 * @param {number} param0.offer_value
 * @param {number} param0.price
 * @returns
 */
export const offerPercentage = ({ offer_type, offer_value = 0, price = 0 }) => {
  try {
    let percentage = offer_value || 0;
    if (offer_type == 'FIXED') percentage = eval((100 * offer_value) / price);

    return Math.round(percentage);
  } catch (error) {
    return value || 0;
  }
};

/**
 *
 * @param {Object} param0
 * @param {String} param0.offer_type
 * @param {number} param0.offer_value
 * @param {number} param0.price
 * @param {number} param0.quantity
 * @returns
 */
export const offerPrice = ({
  offer_type,
  offer_value,
  price = 0,
  quantity = 1
}) => {
  try {
    let decimal = 2;
    let total = price * quantity;

    if (offer_type == 'FIXED') {
      offer_value *= quantity;
      if (total > offer_value) total = total - offer_value;
    } else if (offer_type == 'PERCENT') {
      if (offer_value < 100) total = eval(total * ((100 - offer_value) / 100));
    }

    return +total.toFixed(decimal);
  } catch (error) {
    return price || 0;
  }
};

/**
 * Calcula el precio inical del producto junto con la oferta
 * @param {{percentage_oferta:number, precio:number, fixed:Number}}
 * @returns {Number}
 */
export const oferPricePublic = ({
  offer_type,
  offer_value,
  percentage_oferta,
  precio,
  fixed = 2
}) => {
  try {
    let value = precio || 0;
    if (percentage_oferta && precio) {
      value = eval(precio * ((100 - percentage_oferta) / 100));
    }

    return +value.toFixed(fixed);

    // return eval(
    //   precio * (+percentage_oferta > 100 ? 1 : (100 - percentage_oferta) / 100)
    // ).toFixed(fixed);
  } catch (error) {
    return precio || 0;
  }
};

/**
 * Convierte texto en Base64
 * @param {String} data
 * @returns {String}
 */
export const toBase64 = (data = '') =>
  isExistValue(data)
    ? window.btoa(window.unescape(window.encodeURIComponent(data)))
    : '';
/**
 * Conviert Base64 a texto
 * @param {String} data
 * @returns {String}
 */
export const fromBase64 = (data = '') =>
  data != '' ? window.decodeURIComponent(window.escape(window.atob(data))) : '';

/**
 *
 * @param {event} event
 * @param {Boolean} status
 */
export const hoverevent = (event, status) => {
  event.current.style.display = status ? 'flex' : 'none';
};
