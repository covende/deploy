import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Flex, Text } from '@chakra-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/toast';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  condicion_producto,
  origin_producto,
  typeofsale_producto,
  typeofsale_producto_icons
} from '@/common/utils';
import PVMenor from './precios/PVMenor';
import PVMayor from './precios/PVMayor';
import slugify from 'slugify';
import {
  CVButton,
  CVImageGallery,
  CVLine,
  CVPanel,
  CVRating,
  CVText
} from '@/common/CovendeTemplate';
import {
  carrito,
  toBase64,
  offerprice,
  productincart,
  retail,
  oferPricePublic,
  offerPercentage,
  offerPrice
} from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import {
  CVMoneyFormat,
  CVValidLogin
} from '@/common/CovendeTemplate/CVMethods';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { CVAlertError } from '@/common/CovendeTemplate/CVAlert';
import CVCardProductComponentWish from '@/common/CovendeTemplate/CVCardProduct/CVCardProductComponents/CVCardProductComponentWish';
import { FaEnvelope } from 'react-icons/fa';
import { CVErrorLabel } from '@CVTemplate/core/CVInput';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { ADD_SHOPPING_CART_PRODUCT } from '@CVApi/core/webpublic/products/HomeProducts';
import {
  add_item,
  A_CARD_PRODUCT,
  set_id_shopping_cart
} from '@CVTemplate/core/CVCardProduct/CVCardProductRedux/Actions';
import CVImage from '@CVTemplate/core/CVImage';
import iconDelivery from '@/app/assets/images/car-delivery-free.svg';

export const addCarDirect = async ({
  id_car_pay,
  product_id,
  quantity,
  product_detail,
  product_name,
  price,
  offer,
  offer_type,
  offer_value,
  delivery_free,
  type_of_sale,
  dispatch
}) => {
  const { addOne } = await AxiosGQL(
    ADD_SHOPPING_CART_PRODUCT({ _id: id_car_pay, product_id, quantity })
  );

  if (addOne?.status) {
    dispatch(
      add_item({
        photographs: product_detail.photographs[0],
        product_name,
        price,
        offer,
        offer_type,
        offer_value,
        delivery_free,
        type_of_sale
      })
    );
  }

  window.localStorage.setItem('id_car_pay', addOne.shopping_cart_id ?? '');
  dispatch(
    A_CARD_PRODUCT({
      id_car_pay: addOne.shopping_cart_id,
      carrito_added: true
    })
  );
};

function PPresentacion({
  product_name,
  product_id,
  wholesale,
  variations = [],
  product_attributes = [],
  stock,
  price_unit,
  offer,
  offer_percentage,
  offer_type,
  offer_value,
  product_detail,
  product_origin,
  product_condition,
  product_brand,
  type_of_sale,
  tienda,
  store_id,
  stars = 5,
  totalcomment,
  visits = 50,
  campaign,
  delivery_free
}) {
  const { lista_carrito, id_car_pay } = useSelector(
    (state) => state.CardProduct
  );
  const { BuyerSeller } = useSelector((state) => state.Auth);
  const addToast = useToast();
  const [price, setprice] = useState(price_unit);
  const [stockmax, setstockmax] = useState(stock || 0);
  const [details, setdetails] = useState(variations.length > details ? 0 : -1);
  const [quantity, setquantity] = useState(1);
  const [variation, setVariation] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  let incart = productincart({ lista_carrito, product_id });
  const [openTooltip, setopenTooltip] = useState(false);

  const [currentProduct, setCurrentProduct] = useState({
    variation_id: '',
    attributes: []
  });

  const [customdetail, setcustomdetail] = useState(null);
  const [loading, setLoading] = useState({
    buy_now: false,
    add_cart: false
  });

  const addCarPay = async ({
    seemodal = true,
    remove = true,
    trash = false,
    buyNow = false
  }) => {
    if (
      product_attributes.length > 0 &&
      product_attributes.length !== currentProduct.attributes.length
    ) {
      setopenTooltip(!openTooltip);
      CVAlertError({
        addToast,
        message: 'Seleccione las opciones disponibles'
      });
      return false;
    }

    if (stockmax < quantity) {
      CVAlertError({ addToast, message: 'Cantidad fuera de Stock' });
      return false;
    }

    setLoading({ ...loading, [buyNow ? 'buy_now' : 'add_cart']: true });

    const { addOne } = await AxiosGQL(
      ADD_SHOPPING_CART_PRODUCT({
        _id: id_car_pay || '',
        product_id,
        variation_id: currentProduct.variation_id,
        quantity,
        campaign,
        attributes: toBase64(JSON.stringify(currentProduct.attributes))
      })
    );

    if (addOne?.status) {
      dispatch(
        add_item({
          photographs: product_detail.photographs[0],
          product_name,
          price: price * quantity
        })
      );
      dispatch(set_id_shopping_cart(addOne.shopping_cart_id ?? ''));
    }

    window.localStorage.setItem('id_car_pay', addOne.shopping_cart_id ?? '');

    if (buyNow) {
      setLoading({ ...loading, buy_now: false });
      history.push('/carrito-de-compras');
      return false;
    }

    dispatch(
      A_CARD_PRODUCT({
        id_car_pay: addOne.shopping_cart_id,
        carrito_added: true
      })
    );

    setLoading({ ...loading, add_cart: false });
  };

  const redirection = () => {
    let current = getLoggedInUser();
    let url = `/cotizacion/${store_id}/${product_id}`;
    if (BuyerSeller.user != null || current != null) {
      history.push(url);
    } else {
      CVValidLogin(dispatch, url);
    }
  };

  useEffect(() => {
    setprice(price_unit);
  }, [price_unit]);

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={9}>
          <CVPanel height='100%'>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={5}>
                <Box style={{ position: 'relative' }}>
                  <CVImageGallery images={product_detail.photographs} />
                  <Box
                    style={{
                      position: 'absolute',
                      right: '0px',
                      margin: '1rem',
                      top: '0px'
                    }}>
                    <CVCardProductComponentWish
                      store_id={store_id}
                      product_id={product_id}
                      iconcolor='gray'
                      hovercolor='gray'
                      activecolor='primary'
                      iconsize='3rem'
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={7}>
                <Box style={{ padding: '1rem' }}>
                  <CVText fontWeight='medium' color='blue' fontSize='1.1rem'>
                    {product_name}
                    {details >= 0 && variations.length > details
                      ? Object.keys(variations[details]?.attributes || {}).map(
                          (e, v) =>
                            ' - ' + (variations[details]?.attributes[e] || '')
                        )
                      : ''}

                    {/* {typeof customdetail} */}
                    {/* {JSON.stringify(Object.keys(customdetail))} */}

                    {customdetail != null
                      ? Object.keys(customdetail || {}).map((e, v) => {
                          if (e == 'Color') {
                            return ' - ' + (customdetail[e].color || '');
                          }
                          return ' - ' + (customdetail[e] || '');
                          // return ' - ' + (customdetail.color[e] || '');
                        })
                      : ''}
                  </CVText>
                  <SizeBox />
                  <Flex alignItems='center' justifyContent='space-between'>
                    <Flex>
                      <CVRating
                        marginStar='0'
                        puntuation={stars}
                        color='yellow'
                        height='2.5rem'
                      />
                    </Flex>
                    <Text color='gray'>{visits || 0} Vistas</Text>
                    <a href='#comment_id'>
                      <Text color='gray'>{totalcomment} comentarios</Text>
                    </a>
                    <SizeBox />
                  </Flex>
                  <CVLine lineHeight='1px' color='gray' />

                  {delivery_free && (
                    <>
                      <Box
                        style={{
                          borderRadius: '0 20px 20px 0',
                          padding: '4px',
                          backgroundColor: '#00ADF6',
                          display: 'flex',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          color: '#ffffff',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          maxWidth: '150px',
                          marginTop: '-1rem'
                        }}>
                        <CVImage image={iconDelivery} width='auto' />
                        <Flex>Envío GRATIS</Flex>
                      </Box>
                      <SizeBox />
                    </>
                  )}

                  <CVText
                    color='blue'
                    fontWeight='900'
                    fontFamily='Roboto'
                    display='inline-block'>
                    Tipo de Venta:{' '}
                    <Text display='inline-block'>
                      {typeofsale_producto(type_of_sale)}
                    </Text>
                  </CVText>

                  <PVMayor
                    wholesale={wholesale}
                    price={price}
                    offer_percentage={offer_percentage}
                    offer_type={offer_type}
                    offer_value={offer_value}
                  />
                  <Flex alignItems='end'>
                    {type_of_sale == 'RETAIL' ? (
                      <Box>
                        <CVText
                          color='blue'
                          fontSize='18'
                          fontWeight='900'
                          fontFamily='Roboto'>
                          {CVMoneyFormat({
                            amount: offer
                              ? offerPrice({
                                  offer_type,
                                  offer_value,
                                  price
                                })
                              : price
                          })}
                        </CVText>
                        <Flex>
                          <CVText
                            fontFamily='Roboto'
                            textDecoration='line-through'
                            color='gray'
                            fontSize='0.85rem'>
                            {((offer || '') + '').length > 0
                              ? CVMoneyFormat({ amount: price })
                              : ''}
                          </CVText>
                          <SizeBox />
                          {((offer || '') + '').length ? (
                            <Box
                              style={{
                                borderRadius: '1rem',
                                backgroundColor: COLORS['red'],
                                color: 'white',
                                fontSize: '0.85rem',
                                width: '50px',
                                padding: '1px 5px',
                                display: 'flex',
                                justifyContent: 'center',
                                fontWeight: '900',
                                fontFamily: 'Roboto'
                              }}>
                              -{' '}
                              {offerPercentage({
                                offer_type,
                                offer_value,
                                price
                              })}
                              %
                            </Box>
                          ) : (
                            ''
                          )}
                        </Flex>
                      </Box>
                    ) : (
                      <>
                        <CVText
                          color='blue'
                          fontWeight='600'
                          fontSize='12'
                          fontFamily='Roboto'>
                          Precio Unitario:
                        </CVText>
                        <SizeBox />
                        <CVText
                          color='blue'
                          fontSize='18'
                          fontWeight='900'
                          fontFamily='Roboto'>
                          {CVMoneyFormat({
                            amount: offer
                              ? offerPrice({
                                  offer_type,
                                  offer_value,
                                  price
                                })
                              : price
                          })}
                        </CVText>
                        <SizeBox />

                        <CVText
                          fontFamily='Roboto'
                          textDecoration='line-through'
                          color='gray'
                          fontSize='0.85rem'>
                          {((offer || '') + '').length > 0
                            ? CVMoneyFormat({ amount: price })
                            : ''}
                        </CVText>

                        <SizeBox />
                        {((offer || '') + '').length ? (
                          <Box
                            style={{
                              borderRadius: '1rem',
                              backgroundColor: COLORS['red'],
                              color: 'white',
                              fontSize: '0.85rem',
                              width: '50px',
                              padding: '1px 5px',
                              display: 'flex',
                              justifyContent: 'center',
                              fontWeight: '900',
                              fontFamily: 'Roboto'
                            }}>
                            -{' '}
                            {offerPercentage({
                              offer_type,
                              offer_value,
                              price
                            })}
                            %
                          </Box>
                        ) : (
                          ''
                        )}
                      </>
                    )}
                  </Flex>

                  <SizeBox />
                  <CVText fontFamily='Roboto'>Stock: {stockmax}</CVText>
                  <SizeBox />
                  <Flex justifyContent='space-between' flexWrap='wrap'>
                    <Flex>
                      <Text fontWeight='bold'>Condición:</Text>
                      <SizeBox />
                      <Text>{condicion_producto(product_condition)}</Text>
                    </Flex>
                    <Flex>
                      <Text fontWeight='bold'>Origen:</Text>
                      <SizeBox />
                      <Text>{origin_producto(product_origin)}</Text>
                    </Flex>
                    <Flex>
                      <Text fontWeight='bold'>Marca:</Text>
                      <SizeBox />
                      <Text>{product_brand.name}</Text>
                    </Flex>
                  </Flex>
                  <CVLine lineHeight='1px' color='gray' />
                  <PVMenor
                    wholesale={wholesale}
                    currentProduct={currentProduct}
                    setCurrentProduct={setCurrentProduct}
                    setVariation={setVariation}
                    variations={variations}
                    product_attributes={product_attributes}
                    stockmax={stockmax}
                    setstockmax={setstockmax}
                    price={price}
                    price_unit={price_unit}
                    setprice={setprice}
                    quantity={quantity}
                    setquantity={setquantity}
                    details={details}
                    setdetails={setdetails}
                    setcustomdetail={setcustomdetail}
                    openTooltip={openTooltip}
                    setopenTooltip={setopenTooltip}
                  />
                  <CVLine lineHeight='1px' color='gray' />
                  <Link
                    to={
                      '/tienda/' + tienda._id + '/' + slugify(tienda.store_name)
                    }>
                    <Flex alignItems='center'>
                      <Text color='#004772' fontSize='1rem' fontWeight='bold'>
                        {tienda.store_name}
                      </Text>
                      <SizeBox />
                      <CVText color='blue'>es: </CVText>
                      <SizeBox />
                      {typeofsale_producto_icons(tienda.type_of_sale)}
                    </Flex>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </CVPanel>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <CVPanel height='100%' variant='box'>
            <Flex justifyContent='space-between'>
              <CVText
                color='blue'
                fontSize='1.5rem'
                fontWeight='bold'
                fontFamily='Roboto'>
                Sub Total
              </CVText>
              <CVText
                color='blue'
                fontSize='1.5rem'
                fontWeight='bold'
                fontFamily='Roboto'>
                {CVMoneyFormat({
                  amount: offer
                    ? offerPrice({
                        offer_type,
                        offer_value,
                        price,
                        quantity
                      })
                    : price * quantity
                })}
              </CVText>
            </Flex>
            <SizeBox />
            <CVButton
              fontWeight='bold'
              boxShadow='none'
              disabled={(stockmax || 0) == 0}
              isLoading={loading.buy_now}
              width='100%'
              backgroundImage='linear-gradient(to right, #00ADF6, #2E92EF)'
              onClick={() => {
                addCarPay({ buyNow: true });
              }}>
              COMPRAR AHORA
            </CVButton>
            {(stockmax || 0) == 0 && (
              <CVErrorLabel errorMessage='No disponible, fuera de stock' />
            )}
            <SizeBox />
            <CVButton
              fontWeight='bold'
              boxShadow='none'
              width='100%'
              isLoading={loading.add_cart}
              backgroundImage={'linear-gradient(to right, #00ADF6, #57CDFF)'}
              disabled={(stockmax || 0) == 0}
              onClick={async () => {
                if (product_attributes.length !== 0) {
                  await addCarPay({ trash: incart });
                } else {
                  setLoading({ ...loading, add_cart: true });
                  await addCarDirect({
                    id_car_pay: id_car_pay || '',
                    product_id,
                    quantity,
                    product_detail,
                    product_name,
                    price,
                    dispatch
                  });
                  setLoading({ ...loading, add_cart: false });
                }
              }}>
              AÑADIR AL CARRITO
            </CVButton>
            <SizeBox />
            <SizeBox />

            {type_of_sale != 'RETAIL' && (
              <>
                <CVText textAlign='center'>
                  Para consultar por precios para cantidades mayores:
                </CVText>
                <SizeBox />
                <Box onClick={() => redirection()}>
                  <CVButton
                    width='100%'
                    backgroundColor='green'
                    boxShadow='none'>
                    <FaEnvelope />
                    <SizeBox /> Solicitar Cotización
                  </CVButton>
                </Box>
              </>
            )}
          </CVPanel>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PPresentacion;
