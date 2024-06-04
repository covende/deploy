import React, { useState, useEffect } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { Container, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  addproduct,
  buy_validate,
  deleteitem,
  removeproduct,
  setQuantity
} from './CarritoMethods';
import PayDirection from './payable/PayDirection';
import { shortcutadd } from '@/app/api/graphql/shortcut/ShortCutService';
import {
  CVBreadcrumb,
  CVButton,
  CVInput,
  CVLine,
  CVText
} from '@/common/CovendeTemplate';
import { toBase64 } from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import { coupon_shopping_cart } from '@/app/api/graphql/webcoupon/WCouponService';
import { CVAlertSuccess, CVAlertError } from '@/common/CovendeTemplate/CVAlert';
import EmptyCart from './components/EmptyCart';
import DocumentForCart from './components/DocumentForCart';
import PaymentCart from './components/PaymentCart';
import ListCart from './components/ListCart';
import PayResume from './payable/PayResume';
import PayBuyerInformation from './payable/PayBuyerInformation';
import {
  CVGoUp,
  CVMoneyFormat,
  CVValidLogin
} from '@/common/CovendeTemplate/CVMethods';
import { isExistValue } from '@/app/helpers/utils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  CLEAR_SHOPPING_CART,
  DELETE_COUPON_SHOPPING_CART,
  GET_SHIPPING_PRICE_CART,
  GET_SHOPING_CART_BY_ID,
  SHIPPING_CHANGE_COURIER,
  deleteShoppingCartProducts
} from '@CVApi/core/webpublic/products/CartService';
import { method_payments } from '@CVApi/core/webbuy/TableAPIService';
import {
  set_id_shopping_cart,
  set_number
} from '@CVTemplate/core/CVCardProduct/CVCardProductRedux/Actions';
import PayResumeDelivery from './payable/PayResumeDelivery';

function CarritoCompras() {
  const addToast = useToast();
  const { cant_carrito } = useSelector((state) => state.CardProduct);
  const [basket, setbasket] = useState([]);
  const [infoenvio, setinfoenvio] = useState({
    _id: '',
    direccion: ''
  });
  const [factura, setfactura] = useState({ ruc: '', razon_social: '' });
  const [tipodoc, settipodoc] = useState('Boleta');
  const [tipopago, settipopago] = useState('');
  const [cupon, setCupon] = useState('');
  const [paymethods, setpaymethods] = useState([]);
  const { lista_carrito, id_car_pay } = useSelector(
    (state) => state.CardProduct
  );
  const [information, setinformation] = useState(null);
  const [openTooltip, setopenTooltip] = useState(false);
  const [itemsDiscount, setItemsDiscount] = useState([]);
  const [validing, setvaliding] = useState(false);

  const [errorDelivery, setErrorDelivery] = useState(false);

  let [shoppingCartData, setShoppingCartData] = useState({
    products: [],
    total: 0,
    subtotal: 0,
    delivery_total: 0,
    discount_total: 0,
    saving_total: 0,
    coupon_code: '',
    coupon_total: 0,
    status: ''
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const [isConfirmed, setisConfirmed] = useState(false);
  const [push, setPush] = useState(false);
  const [validateInputCupon, SetvalidateInputCupon] = useState('');
  const [errors, seterrors] = useState(false);

  const validarCupon = async () => {
    const isLogin = CVValidLogin(dispatch);
    if (!isLogin) return false;
    setvaliding(true);

    let newCoupon = String(cupon).trim();

    if (newCoupon.length < 8) {
      SetvalidateInputCupon('Cupón invalido');
      setvaliding(false);
      return seterrors(true);
    }

    const { status, message, shoppingCart } = await coupon_shopping_cart({
      id: id_car_pay,
      code_cupon: newCoupon
    });

    setvaliding(false);
    if (status) {
      if (shoppingCart?.coupon_code) {
        CVAlertSuccess({ addToast, message: 'Cupón válido' });
        setShoppingCartData(shoppingCart);
        setItemsDiscount(shoppingCart.products.filter((p) => p.discount));
        if (shoppingCart?.total == 0) settipopago('Coupon');
        else {
          let methodDefault = paymethods[0];
          if (methodDefault)
            settipopago(methodDefault?._id + '|' + methodDefault?.code);
        }
      } else {
        return CVAlertError({ addToast, message: 'Cupón inválido' });
      }
    } else {
      CVAlertError({ addToast, message });
      SetvalidateInputCupon(message);
      seterrors(true);
    }
  };

  const clearProductFromCart = async () => {
    const {
      clearShoppingCart: { status, message, shoppingCart }
    } = await AxiosGQL(CLEAR_SHOPPING_CART(id_car_pay));

    if (status) {
      setShoppingCartData(shoppingCart);
      setItemsDiscount([]);
      setPush(false);
      dispatch(set_number(0));
      CVGoUp();
      return CVAlertSuccess({
        addToast,
        message: 'Productos eliminados correctamente.'
      });
    } else {
      CVAlertError({ addToast, message: 'Algo salió mal' });
    }
  };

  const removeProductFromCart = (product_id) => {
    removeproduct({ basket, lista_carrito, dispatch, setbasket, product_id });
  };

  const addProductToCart = (product_id, quantity) => {
    addproduct({
      basket,
      lista_carrito,
      dispatch,
      setbasket,
      product_id,
      setShoppingCartData,
      quantity
    });
  };

  const setProductToCart = (product_id, quantity) => {
    setQuantity({
      basket,
      lista_carrito,
      dispatch,
      setbasket,
      product_id,
      quantity
    });
  };

  const deleteProductFromCart = (product_id) =>
    deleteitem({
      dispatch,
      setShoppingCartData,
      setItemsDiscount,
      product_id,
      id_car_pay,
      addToast
    });

  const redireccion = async () => {
    if (
      !buy_validate({
        addToast,
        infoenvio,
        tipodoc,
        factura,
        itemsPrice: shoppingCartData.total,
        information,
        setopenTooltip,
        openTooltip,
        errorDelivery
      })
    ) {
      return false;
    }

    let short = await shortcutadd({
      redirect: '',
      uri: v4(),
      params: toBase64(
        JSON.stringify({
          basket: shoppingCartData.products,
          tipodoc,
          id_shoping: shoppingCartData.id,
          tipopago,
          itemsPrice: shoppingCartData.total,
          infoenvio,
          factura,
          idcupon: shoppingCartData?.coupon_code
        })
      )
    });

    dispatch(set_number(0));
    history.push('/checkout/' + short.uri);
  };

  const getDelivery = async (_id) => {
    try {
      setShoppingCartData({ ...shoppingCartData, status: 'PENDING' });
      const { setShippingPriceCart: resp } = await AxiosGQL(
        GET_SHIPPING_PRICE_CART(id_car_pay, _id)
      );

      if (resp?.status) {
        setShoppingCartData(resp.shoppingCart);

        if (resp?.shoppingCart?.delivery_error) {
          setopenTooltip(true);
          setErrorDelivery(true);
        } else {
          console.log('Precio asignado corerctamtent');
          setopenTooltip(false);
          setErrorDelivery(false);
          return CVAlertSuccess({
            addToast,
            message: 'Precio de envío asignado correctamente.'
          });
        }
      } else {
        setinfoenvio({ _id: '', direccion: '' });
        CVAlertError({
          addToast,
          message: 'Algo salió mal, por favor inténtalo más tarde.'
        });
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

  const deleteCoupon = async () => {
    try {
      setvaliding(true);
      const { deleteCouponShoppingCart } = await AxiosGQL(
        DELETE_COUPON_SHOPPING_CART(id_car_pay)
      );
      setvaliding(false);

      if (deleteCouponShoppingCart?.status) {
        setShoppingCartData(deleteCouponShoppingCart.shoppingCart);
        setItemsDiscount([]);
        setPush(false);
        let methodDefault = paymethods[0];
        if (methodDefault)
          settipopago(methodDefault?._id + '|' + methodDefault?.code);
        CVAlertSuccess({ addToast, message: 'Cupón retirado correctamente.' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initShoppingCart = async () => {
    const { getShoppingCartByID } = await AxiosGQL(
      GET_SHOPING_CART_BY_ID(id_car_pay)
    );
    if (getShoppingCartByID?.status) {
      getShoppingCartByID.shoppingCart?.delivery_address &&
        setinfoenvio(getShoppingCartByID.shoppingCart.delivery_address);

      if (getShoppingCartByID.shoppingCart.id && !id_car_pay) {
        dispatch(
          set_id_shopping_cart(getShoppingCartByID.shoppingCart.id ?? '')
        );
        window.localStorage.setItem(
          'id_car_pay',
          getShoppingCartByID.shoppingCart.id ?? ''
        );
      }

      setShoppingCartData(getShoppingCartByID.shoppingCart);
      setItemsDiscount(
        getShoppingCartByID.shoppingCart.products.filter((p) => p.discount)
      );
      getShoppingCartByID.shoppingCart?.coupon_code && setPush(true);
    }
  };

  const initData = async () => {
    console.log('inti data...');
    let methods = await method_payments();
    setpaymethods(methods);

    if (methods[0]) settipopago(methods[0]._id + '|' + methods[0].code);

    await initShoppingCart();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    initData();
  }, []);

  useEffect(() => {
    if (id_car_pay == '' && shoppingCartData.products.length > 0) {
      setShoppingCartData({
        products: [],
        total: 0,
        subtotal: 0,
        delivery_total: 0,
        discount_total: 0,
        saving_total: 0,
        coupon_code: ''
      });
    }
  }, [id_car_pay]);

  const itemChangeDelivery = async (courier, delivery_type, item_id) => {
    const { shippingChangeCourier } = await AxiosGQL(
      SHIPPING_CHANGE_COURIER(id_car_pay, item_id, courier, delivery_type)
    );

    if (shippingChangeCourier.status) {
      setShoppingCartData({
        ...shoppingCartData,
        delivery_total: shippingChangeCourier.delivery_total,
        total: shippingChangeCourier.shoppingCart_total,
        products: shoppingCartData.products.map((product) =>
          product._id == item_id
            ? {
                ...product,
                delivery_time: shippingChangeCourier.delivery_time,
                delivery_price: shippingChangeCourier.delivery_price,
                total: product.subtotal + shippingChangeCourier.delivery_price,
                delivery_code:
                  courier + (delivery_type ? '-' + delivery_type : '')
              }
            : product
        )
      });
    }
  };

  const deleteItemErrorDelivery = async (item_id) => {
    const { deleteShoppingCartProducts: resp } =
      await deleteShoppingCartProducts({
        _id: id_car_pay,
        products_ids: item_id
      });

    if (resp?.status) {
      if (resp?.shoppingCart?.status == 'EMPTY') {
        setShoppingCartData({ ...resp.shoppingCart });
        setisConfirmed(false);

        CVGoUp();
        CVAlertSuccess({
          addToast,
          message: 'Todos los productos eliminados correctamente.'
        });
      } else {
        setShoppingCartData({
          ...shoppingCartData,
          status: resp?.shoppingCart?.status,
          subtotal: resp?.shoppingCart?.subtotal,
          total: resp?.shoppingCart?.total,
          saving_total: resp?.shoppingCart?.saving_total,
          products: shoppingCartData?.products?.filter(
            (product) => product._id !== item_id
          )
        });

        if (isConfirmed) {
          if (resp?.shoppingCart?.delivery_error) {
            setErrorDelivery(true);
            setopenTooltip(true);
          } else {
            setErrorDelivery(false);
            setopenTooltip(false);
          }
        }

        CVAlertSuccess({
          addToast,
          message: 'Producto eliminado correctamente.'
        });
      }
    }
  };

  return (
    <>
      <CVBreadcrumb
        data={[
          { text: 'Inicio', uri: '/' },
          { text: 'Carrito de Compras', uri: '/carrito-de-compras' }
        ]}
        backgroundColor='white'
      />
      <SizeBox />
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={9}>
            {!isConfirmed && (
              <Box bg='white' borderRadius='1rem' justifyContent='center'>
                {shoppingCartData?.products.length == 0 ? (
                  <EmptyCart />
                ) : (
                  <ListCart
                    basket={shoppingCartData?.products}
                    setShoppingCartData={setShoppingCartData}
                    removeProductFromCart={removeProductFromCart}
                    addProductToCart={addProductToCart}
                    setProductToCart={setProductToCart}
                    deleteProductFromCart={deleteProductFromCart}
                    clearProductFromCart={clearProductFromCart}
                  />
                )}
              </Box>
            )}

            {isConfirmed && (
              <>
                <PayBuyerInformation
                  information={information}
                  setinformation={setinformation}
                  setfactura={setfactura}
                />
                <SizeBox />

                {shoppingCartData?.total > 0 && (
                  <>
                    <PaymentCart
                      paymethods={paymethods}
                      tipopago={tipopago}
                      settipopago={settipopago}
                    />
                    <SizeBox />
                  </>
                )}

                {information?.dni != null && information?.dni !== '' && (
                  <PayDirection
                    getDelivery={getDelivery}
                    errorDelivery={errorDelivery}
                    infoenvio={infoenvio}
                    setinfoenvio={setinfoenvio}
                    openTooltip={openTooltip}
                    setopenTooltip={setopenTooltip}
                    shoppingCartStatus={shoppingCartData?.status}
                    resetShoppingCart={initShoppingCart}
                  />
                )}
                <SizeBox />
                <DocumentForCart
                  information={information}
                  settipodoc={settipodoc}
                  tipodoc={tipodoc}
                  factura={factura}
                  setfactura={setfactura}
                />

                <PayResumeDelivery
                  basket={shoppingCartData?.products}
                  hasDelivery={
                    shoppingCartData?.delivery_address ? true : false
                  }
                  shoppingCartStatus={shoppingCartData?.status}
                  itemChangeDelivery={itemChangeDelivery}
                  deleteItemErrorDelivery={deleteItemErrorDelivery}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box bg='white' padding='1rem' borderRadius='1rem'>
              <CVText color='blue' fontSize='1.25rem' fontWeight='bold'>
                Resumen de Compra
              </CVText>
              <CVLine lineHeight='1px' height='1.5rem' color='gray' />
              <Flex justifyContent='space-between' alignItems='center'>
                <CVText>Subtotal</CVText>
                <CVText
                  fontFamily='Roboto'
                  fontSize='1.25rem'
                  fontWeight='bold'
                  color='blue'>
                  {CVMoneyFormat({ amount: shoppingCartData.subtotal })}
                </CVText>
              </Flex>
              {isConfirmed && (
                <>
                  <CVLine lineHeight='1px' height='1.5rem' color='gray' />
                  <Flex justifyContent='space-between' alignItems='center'>
                    <CVText>Envío</CVText>
                    <CVText
                      fontFamily='Roboto'
                      fontSize='1.25rem'
                      fontWeight='bold'
                      color='blue'>
                      {CVMoneyFormat({
                        amount: shoppingCartData.delivery_total
                      })}
                    </CVText>
                  </Flex>
                </>
              )}

              {shoppingCartData.saving_total != 0 && (
                <>
                  <CVLine lineHeight='1px' height='1.5rem' color='gray' />
                  <Flex justifyContent='space-between' alignItems='center'>
                    <CVText color='green'>Ahorraste</CVText>
                    <CVText
                      fontFamily='Roboto'
                      fontSize='1.25rem'
                      fontWeight='bold'
                      color='green'>
                      {CVMoneyFormat({
                        amount: shoppingCartData.saving_total
                      })}
                    </CVText>
                  </Flex>
                </>
              )}

              <CVLine lineHeight='1px' height='1.5rem' color='gray' />

              {shoppingCartData?.status == 'VALIDATED_DELIVERY' &&
                !isExistValue(shoppingCartData.coupon_code) && (
                  <Text
                    mb={2}
                    color={COLORS['skyblue']}
                    cursor='pointer'
                    fontSize='12'
                    fontWeight='600'
                    textDecoration='underline'
                    onClick={(e) => {
                      setPush(!push);
                    }}>
                    Aplicar cupón
                  </Text>
                )}

              {shoppingCartData?.status == 'VALIDATED_COUPON' &&
                isExistValue(shoppingCartData.coupon_code) && (
                  <Text
                    mb={2}
                    color={COLORS['red']}
                    cursor='pointer'
                    fontSize='12'
                    fontWeight='600'
                    textDecoration='underline'
                    onClick={async () => {
                      if (!validing) await deleteCoupon();
                    }}>
                    Quitar cupón
                  </Text>
                )}

              {push && (
                <>
                  {isConfirmed && !isExistValue(shoppingCartData.coupon_code) && (
                    <Flex justifyContent='space-between' alignItems='center'>
                      <CVInput
                        defaultValue={shoppingCartData?.coupon_code || ''}
                        value={shoppingCartData?.coupon_code || ''}
                        color='red'
                        error={errors}
                        errorMessage={
                          errors
                            ? '* ' + validateInputCupon
                            : '*Código incorrecto'
                        }
                        placeholder='Ingresa tu código'
                        onChange={setCupon}
                      />
                    </Flex>
                  )}
                  <SizeBox />

                  {isConfirmed && (
                    <CVButton
                      width='100%'
                      isLoading={validing}
                      variant='outlined'
                      fontWeight='bold'
                      boxShadow='none'
                      disabled={
                        validing || isExistValue(shoppingCartData.coupon_code)
                      }
                      onClick={() => validarCupon()}>
                      {!isExistValue(shoppingCartData?.coupon_code)
                        ? 'APLICAR'
                        : shoppingCartData.coupon_code}
                    </CVButton>
                  )}
                </>
              )}
              <SizeBox />

              {itemsDiscount.length > 0
                ? itemsDiscount.map((item) => (
                    <>
                      <SizeBox />
                      <Flex key={v4()} justifyContent='space-between'>
                        <CVText color='green' variant='maxtext'>
                          {item.product?.product_name || ''}
                        </CVText>
                        <CVText color='green'>
                          {CVMoneyFormat({ amount: item.discount })}
                        </CVText>
                      </Flex>
                    </>
                  ))
                : shoppingCartData.discount_total > 0 && (
                    <Flex key={v4()} justifyContent='space-between'>
                      <CVText variant='maxtext'>Dscto (total)</CVText>
                      <CVText
                        color='blue'
                        fontFamily='Roboto'
                        fontSize='1.25rem'
                        fontWeight='bold'>
                        -&nbsp;
                        {CVMoneyFormat({
                          amount: shoppingCartData?.discount_total
                        })}
                      </CVText>
                    </Flex>
                  )}

              <CVLine lineHeight='1px' height='1.5rem' color='gray' />
              <Flex justifyContent='space-between' alignItems='center'>
                <CVText color='blue' fontWeight='bold' fontSize='1.5rem'>
                  TOTAL:
                </CVText>

                <CVText
                  fontFamily='Roboto'
                  color='primary'
                  fontWeight='bold'
                  fontSize='1.5rem'>
                  {CVMoneyFormat({ amount: shoppingCartData.total })}
                </CVText>
              </Flex>
              <SizeBox />
              <CVButton
                fontWeight='bold'
                width='100%'
                backgroundColor={
                  shoppingCartData.products.length == 0 ? 'gray' : 'primary'
                }
                disabled={
                  shoppingCartData.products.length == 0 ||
                  shoppingCartData.status == 'PENDING'

                  // isConfirmed
                  //   ? !['VALIDATED_DELIVERY', 'VALIDATED_COUPON'].includes(
                  //       shoppingCartData.status
                  //     )
                  //   : !(shoppingCartData?.status == 'VALIDATED_PRICE')
                }
                onClick={() => {
                  if (!isConfirmed) setisConfirmed(true);
                  else redireccion();
                }}>
                {!isConfirmed ? 'CONFIRMAR' : 'IR PAGAR'}
              </CVButton>
              <SizeBox />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CarritoCompras;
