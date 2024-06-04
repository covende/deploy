import { shortcutfindbyuri } from '@/app/api/graphql/shortcut/ShortCutService';
import { method_payments } from '@/app/api/graphql/webbuy/TableAPIService';
import {
  deleteShoppingCartProducts,
  PRODUCT_PUBLIC_BY_ID,
  UPDATE_STOCK_SHOPPING_CART
} from '@/app/api/graphql/webpublic/products/CartService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import {
  A_CARD_PRODUCT,
  less_item,
  set_number
} from '@/common/CovendeTemplate/CVCardProduct/CVCardProductRedux/Actions';
import {
  carritoup,
  fromBase64
} from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { get_shipping_price } from '@/app/api/graphql/webbuy/BuyService';
import { CVErrorTags } from '@/common/CovendeTemplate/CVValidation';
import { useSelector } from 'react-redux';

export const removeproduct = ({
  basket,
  lista_carrito,
  dispatch,
  setbasket,
  product_id
}) => {
  let cart = [...basket];
  cart = cart.map((item) => {
    if (product_id == item.product_id) {
      item = {
        ...item,
        quantity: Number(item.quantity) - 1 > 0 ? Number(item.quantity) - 1 : 1
      };
    }
    return item;
  });

  // let lsc = [...lista_carrito];
  // lsc = lsc.map((item) => {
  //   if (product_id == item.product_id) {
  //     item = {
  //       ...item,
  //       quantity: Number(item.quantity) - 1 > 0 ? Number(item.quantity) - 1 : 1
  //     };
  //   }
  //   return item;
  // });

  // dispatch(A_CARD_PRODUCT({ lista_carrito: lsc }));

  setbasket(cart);
  // carritoup(lsc);
};

export const setQuantity = ({
  basket,
  lista_carrito,
  dispatch,
  setbasket,
  product_id,
  quantity
}) => {
  let cart = [...basket];
  cart = cart.map((item) => {
    if (product_id == item.product_id) {
      item = { ...item, quantity };
    }
    return item;
  });

  // let lsc = [...lista_carrito];
  // lsc = lsc.map((item) => {
  //   if (product_id == item.product_id) {
  //     item = { ...item, quantity: quantity };
  //   }
  //   return item;
  // });

  // dispatch(A_CARD_PRODUCT({ lista_carrito: lsc }));
  setbasket(cart);
  // carritoup(lsc);
};
export const addproduct = ({
  basket,
  lista_carrito,
  dispatch,
  setbasket,
  product_id,
  setShoppingCartData,
  quantity
}) => {
  const { id_car_pay } = useSelector((state) => state.CardProduct);

  console.log('incrementando');
  console.log(quantity);
  // AxiosGQL(UPDATE_STOCK_SHOPPING_CART(id_car_pay, product_id, quantity))
  //   .then(({ updateStockShoppingCart }) => {
  //     console.log(updateStockShoppingCart);
  //     // if (updateStockShoppingCart.status) {
  //     //   clearTimeout(timer);
  //     //   if (value != '' && Number(value) != 0) {
  //     //     document.addEventListener('keyup', () =>
  //     //       handlerKeyup(value, id, updateStockShoppingCart?.shoppingCart)
  //     //     );
  //     //     document.addEventListener('keydown', function () {
  //     //       clearTimeout(timer);
  //     //     });
  //     //   }
  //     // } else {
  //     //   const message = updateStockShoppingCart.message;
  //     //   CVAlertError({
  //     //     addToast,
  //     //     message: message + ', Por favor disminuya la cantidad.'
  //     //   });
  //     // }
  //   })
  //   .catch(console.log);

  // let cart = [...basket];
  // cart = cart.map((item) => {
  //   if (product_id == item.product_id) {
  //     item = { ...item, quantity: Number(item.quantity) + 1 };
  //   }
  //   return item;
  // });

  // let lsc = [...lista_carrito];
  // lsc = lsc.map((item) => {
  //   if (product_id == item.product_id) {
  //     item = { ...item, quantity: Number(item.quantity) + 1 };
  //   }
  //   return item;
  // });

  // dispatch(A_CARD_PRODUCT({ lista_carrito: lsc }));

  // setbasket(cart);
  // carritoup(lsc);
};

export const deleteitem = async ({
  dispatch,
  setShoppingCartData,
  setItemsDiscount,
  product_id = '',
  id_car_pay = '',
  elementsDelete = [],
  addToast
}) => {
  try {
    const {
      deleteShoppingCartProducts: { shoppingCart, status }
    } = await deleteShoppingCartProducts({
      _id: id_car_pay,
      products_ids: product_id ? product_id : elementsDelete
    });

    if (status) {
      setShoppingCartData(shoppingCart);
      setItemsDiscount(shoppingCart.products.filter((p) => p.discount));
      dispatch(set_number(shoppingCart.products.length));

      if (addToast)
        CVAlertSuccess({
          addToast,
          message: 'Producto eliminado correctamente.'
        });
    }
  } catch (error) {
    console.log({ error });
  }
};

export const initdatos = async ({ dispatch, setbasket, setpaymethods }) => {
  let data = fromBase64(window.localStorage.getItem('mycart') || '');
  let listac = data != '' ? JSON.parse(data) : [];

  let nbasket = listac.map(async (item) => {
    const { productPublicById } = await AxiosGQL(
      PRODUCT_PUBLIC_BY_ID(item.product_id)
    );
    if (productPublicById != null) {
      return {
        producto: { ...item, ...productPublicById },
        id: item.product_id,
        images: productPublicById?.product_photo || '',
        name: productPublicById.product_name || '',
        description: '',
        condicion: productPublicById?.product_condition || '',
        precio: eval(item.price || 0),
        cantidad: eval(Number(item.quantity) || 0),
        category_id: productPublicById?.categories || '',
        store_id: item.store_id,
        sku: productPublicById?.sku || '',
        envio: 0,
        descuento: 0,
        delivery_time: 0,
        disponible: true,
        preparation_time_type: 'dias'
      };
    }
  });
  Promise.all(nbasket).then((results) => {
    results = results.filter((element) => element !== undefined);
    dispatch(A_CARD_PRODUCT({ lista_carrito: listac }));
    setbasket(results);
  });
  let methods = await method_payments();
  setpaymethods(methods);
};

export const initenvios = async ({
  dispatch,
  setbasket,
  basket,
  infoenvio
}) => {
  let nbasket = basket.map(async (item) => {
    const { price, preparation_time, preparation_time_type, status } =
      await get_shipping_price({
        direction_id: infoenvio._id,
        product_id: item.id,
        product_quantity: item.cantidad
      });
    return {
      ...item,
      envio: price,
      delivery_time: preparation_time,
      disponible: status,
      preparation_time_type
    };
  });
  Promise.all(nbasket).then((results) => {
    setbasket(results);
  });
};

export const buy_validate = ({
  addToast,
  infoenvio,
  tipodoc,
  factura,
  itemsPrice,
  information,
  setopenTooltip,
  openTooltip,
  errorDelivery
}) => {
  if (CVErrorTags()) {
    if (errorDelivery) setopenTooltip(true);
    else
      CVAlertError({
        addToast,
        message: 'Corrija campos en rojo'
      });
    return false;
  }

  if (information?.first_name == '' && information?.last_name == '') {
    CVAlertError({
      addToast,
      message: 'Complete sus datos'
    });
    return false;
  }

  if (infoenvio?._id == '') {
    CVAlertError({
      addToast,
      message: 'Seleccione o agregue una direccion a enviar'
    });
    setopenTooltip(!openTooltip);

    return false;
  }

  if (itemsPrice > 700 && tipodoc == 'Boleta' && factura.ruc.length == 0) {
    CVAlertError({
      addToast,
      message: 'Para boletas mayor a S/ 700 debe dar su DNI y nombre'
    });
    return false;
  }
  if (
    tipodoc == 'Factura' &&
    factura.ruc.length == 0 &&
    factura.razon_social.length == 0
  ) {
    CVAlertError({
      addToast,
      message: 'Para factura es obligtorio su RUC y Razon social'
    });
    return false;
  }
  return true;
};

export const initcheckout = async ({
  data,
  setbasket,
  setinfoenvio,
  setfactura,
  settipodoc,
  setmediopago,
  setmethod_payment,
  setitemsPrice,
  setantifraude,
  setorder,
  setcliente,
  setIdcupon
}) => {
  const alluri = await shortcutfindbyuri(data);
  const ally = fromBase64(alluri.params);
  const datos = JSON.parse(ally);
  let mediopago = 'Tarjeta';
  let methodPaymentID = '';

  if (datos?.tipopago == 'Coupon') mediopago = 'Coupon';
  else {
    let values = datos?.tipopago.toString().split('|');
    methodPaymentID = values[0] || '';
    mediopago = values[1] || 'Tarjeta';
  }

  setbasket(datos?.basket || []);
  setinfoenvio(datos?.infoenvio || {});
  setfactura(datos?.factura || {});
  settipodoc(datos?.tipodoc || 'Boleta');
  setmediopago(mediopago);
  setmethod_payment(methodPaymentID);
  setitemsPrice(datos?.itemsPrice || 0);
  setIdcupon(datos?.idcupon || '');
  let userFind = getLoggedInUser();

  setantifraude({
    transactionCode: '101',
    paymentConcept: 'Demo',
    additionalData: '',
    userEmail: userFind.email || 'manrrique.my@gmail.com',
    userName: 'Manrrique',
    userLastName: 'Meneses',
    userUbigeo: '010101',
    userCountry: 'PERU',
    userDocumentType: 'DNI',
    userDocumentNumber: '71246792',
    userCodeCountry: '+51',
    userPhone: '910103845'
  });

  /************* */
  let numero = Date.now();
  setorder({
    amount: eval(datos?.itemsPrice || 0).toFixed(2),
    purchaseNumber: numero.toString().substr(0, 12),
    installment: [numero.toString().substr(12, 13)],
    // productId: datos?.basket[0].id,
    productId: userFind?.user_id,
    currency: 'PEN',
    tipodoc: datos?.tipodoc || 'Boleta',
    direction: datos?.infoenvio?.direccion || '-'
  });

  setcliente({
    name: userFind?.first_name || '',
    lastName: userFind.last_name || '',
    email: userFind.email || '43434343',
    phoneNumber: '910102020',
    documentNumber: userFind?.dni || '',
    documentType: '0'
  });

  // console.log(object)
};
