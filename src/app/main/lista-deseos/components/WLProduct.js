import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { getLoggedInUser } from '@/app/helpers/authUtils';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { Link } from 'react-router-dom';
import {
  CVButton,
  CVCheck,
  CVImage,
  CVRating,
  CVText
} from '@/common/CovendeTemplate';
import { DELETE_WISH_FROM_LIST } from '@/app/api/graphql/webtopbar/WishlistService';
import {
  carrito,
  offerPercentage,
  offerPrice,
  precios,
  productincart,
  retail
} from '@/common/CovendeTemplate/CVCardProduct/CVCardProductMethod';
import CVCardProductComponentWish from '@/common/CovendeTemplate/CVCardProduct/CVCardProductComponents/CVCardProductComponentWish';
import slugify from 'slugify';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { v4 } from 'uuid';
import { DeleteIconDisabled } from '@CVPages/core/bo/faq/components/assets/WarnIcon';
import {
  add_item,
  A_CARD_PRODUCT
} from '@CVTemplate/core/CVCardProduct/CVCardProductRedux/Actions';
import { addCarDirect } from '@CVPages/core/producto/components/PPresentacion';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import { CVMoneyFormat } from '@CVTemplate/core/CVMethods';
import iconDelivery from '@/app/assets/images/car-delivery-free.svg';

function WLProduct({ item, clearProducts = () => {}, deleteWish }) {
  const addToast = useToast();
  const dispatch = useDispatch();
  const us = getLoggedInUser();
  const [loading, setLoading] = useState(false);
  const { lista_carrito, id_car_pay } = useSelector(
    (state) => state.CardProduct
  );
  let incart = productincart({ lista_carrito, product_id: item.product_id });
  const deleteFromWant = async () => {
    if (us != null) {
      await AxiosGQL(
        DELETE_WISH_FROM_LIST({
          product_id: item.product_id,
          user_id: us.user_id
        })
      );
      clearProducts(item.product_id);
    }
  };

  const storeName =
    item.company.comercial_name != '-' && item.company.comercial_name
      ? item.company.comercial_name
      : item.company.social_razon || '';
  const haveColor =
    item.product_attributes.length == 0
      ? false
      : item.product_attributes.find(({ name }) => name == 'Color');
  return (
    <Box borderBottom='1px solid #EFEFEF'>
      <SizeBox />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <Flex
            flexDirection='column'
            width='100%'
            justifyContent='space-between'>
            <DeleteIconDisabled
              onClick={() => deleteWish(item.product_id)}
              color='#FF5454'
            />
            {/* <Flex flexDirection='column'> */}

            {/* </Flex> */}
            <CVImage
              image={item.product_photo}
              height='150px'
              width='150px'
              borderRadius='1rem'
            />
            {item.delivery_free && (
              <>
                <SizeBox />
                <Box
                  style={{
                    borderRadius: '0 20px 20px 0',
                    padding: '4px',
                    backgroundColor: '#00ADF6',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    maxWidth: '120px',
                    marginTop: '-1.2rem'
                  }}>
                  <Box maxWidth='20px'>
                    <CVImage image={iconDelivery} width='auto' />
                  </Box>
                  <Flex>Envío GRATIS</Flex>
                </Box>
              </>
            )}
            <SizeBox />
          </Flex>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Link to={`/producto/${item.product_slug}`}>
            <CVText
              color='blue'
              fontWeight='bold'
              fontSize='1.15rem'
              variant='maxtext'>
              {item.product_name}
            </CVText>
          </Link>
          <Link to={`/tienda/${item?.company?._id}/${slugify(storeName)}`}>
            <CVText fontWeight='bold'>{storeName}</CVText>
          </Link>
          <CVCardProductComponentWish
            clearProducts={clearProducts}
            store_id={item.store_id}
            product_id={item.product_id}
            iconcolor='gray'
            hovercolor='gray'
            activecolor='primary'
            iconsize='2rem'
          />
          <Flex gap='1' my='0.5rem'>
            {haveColor ? (
              haveColor.attribute_details.map((det) => (
                <Box
                  fontFamily='Roboto'
                  key={v4()}
                  boxShadow='0px 0px 1px 1px rgba(236,236,236,0.75)'
                  border='0.7px solid #E0E0E0'
                  width='1.25rem'
                  height='1.25rem'
                  backgroundColor={det.color}
                  margin='0 0.25rem'
                  rounded='3px'></Box>
              ))
            ) : (
              <Text>{item.stock} unidades</Text>
            )}
          </Flex>
          <Flex align='center' gap='5px'>
            <CVRating height='2rem' puntuation={item.stars} />
            {item.comments != 0 && (
              <CVText color='gray'>{item.comments} comentarios</CVText>
            )}
          </Flex>
          {item.views != 0 && <CVText color='gray'>{item.views} Vistas</CVText>}
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Flex flexDirection='column' alignItems='end'>
            {retail(item.sale_type) ? (
              <CVButton
                onClick={async () => {
                  setLoading(true);

                  if (item.product_attributes.length !== 0) {
                    dispatch(
                      add_item({
                        photographs: item.product_photo,
                        product_name: item.product_name,
                        product_attributes: item.product_attributes,
                        price: item.precio,
                        wholesale: item.wholesale,
                        variations: item.variations,
                        stock: item.stock,
                        product_id: item.product_id,
                        has_attributes: true,
                        optional: true,
                        offer: item.offer,
                        offer_type: item.offer_type,
                        offer_value: item.offer_value,
                        delivery_free: item.delivery_free,
                        type_of_sale: item.sale_type
                      })
                    );
                    dispatch(A_CARD_PRODUCT({ carrito_added: true }));
                  } else {
                    if (item?.stock == 0) {
                      setLoading(false);
                      return CVAlertError({
                        addToast,
                        message: 'Producto sin stock'
                      });
                    }

                    await addCarDirect({
                      id_car_pay: id_car_pay || '',
                      product_id: item.product_id,
                      quantity: 1,
                      product_detail: { photographs: [item.product_photo] },
                      product_name: item.product_name,
                      price: item.precio,
                      offer: item.offer,
                      offer_type: item.offer_type,
                      offer_value: item.offer_value,
                      delivery_free: item.delivery_free,
                      type_of_sale: item.sale_type,
                      dispatch
                    });
                  }

                  setLoading(false);
                }}
                isLoading={loading}
                fontSize='0.9rem'
                backgroundColor='primary'>
                AÑADIR AL CARRITO
              </CVButton>
            ) : (
              <Text>
                <Link
                  style={{
                    color: '#FFFFFF',
                    backgroundColor: incart ? '#FF5454' : '#00ADF6',
                    height: '25px',
                    borderRadius: '20px',
                    width: '100%',
                    padding: '6px 8px'
                  }}
                  to={`/producto/${item.product_slug}`}>
                  IR A PRODUCTO
                </Link>
              </Text>
            )}
            <SizeBox />
            <Flex alignItems='end' wrap='wrap'>
              <Box>
                <CVText
                  color='blue'
                  fontSize='18'
                  fontWeight='900'
                  fontFamily='Roboto'>
                  {CVMoneyFormat({
                    amount: item.offer
                      ? offerPrice({
                          offer_type: item.offer_type,
                          offer_value: item.offer_value,
                          price: item.precio
                        })
                      : item.precio
                  })}
                </CVText>
                <Flex>
                  <CVText
                    fontFamily='Roboto'
                    textDecoration='line-through'
                    color='gray'
                    fontSize='0.85rem'>
                    {((item.offer || '') + '').length > 0
                      ? CVMoneyFormat({
                          amount: item.precio
                        })
                      : ''}
                  </CVText>
                  <SizeBox />
                  {((item.offer || '') + '').length ? (
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
                        offer_type: item.offer_type,
                        offer_value: item.offer_value,
                        price: item.precio
                      })}
                      %
                    </Box>
                  ) : (
                    ''
                  )}
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Grid>
      </Grid>
      <SizeBox />
    </Box>
  );
}

export default WLProduct;
