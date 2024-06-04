import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Text,
  Box,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { moneyformat } from '@/common/utils/methods';
import { v4 } from 'uuid';
import { Eraser } from './icons';
import CVCardProductComponentWish from '@/common/CovendeTemplate/CVCardProduct/CVCardProductComponents/CVCardProductComponentWish';
import { CVErrorLabel } from '@CVTemplate/core/CVInput';
import CVImage from '@CVTemplate/core/CVImage';
import CVLine from '@CVTemplate/core/CVLine';
import CVText from '@CVTemplate/core/CVText';
import { CVMoneyFormat } from '@CVTemplate/core/CVMethods';
import {
  oferPricePublic,
  offerPercentage,
  offerPrice,
  offerprice
} from '@CVTemplate/core/CVCardProduct/CVCardProductMethod';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { UPDATE_STOCK_SHOPPING_CART } from '@CVApi/core/webpublic/products/CartService';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import { COLORS } from '@CVTemplate/core/CVThemes';
import CVRadio from '@CVTemplate/core/CVRadio';

const ItemCarritoDelivery = ({
  subtotal,
  total,
  precio,
  cantidad,
  id,
  images,
  name,
  producto,
  borrar,
  agregar,
  stock,
  actions = false,
  deliveries = [],
  envio,
  delivery_time,
  disponible = false,
  preparation_time_type = 'dias',
  descuento = 0,
  setOnDelete,
  setId_delete,
  setProductToCart,
  numberItems,
  store_name,
  variation_id,
  attributes,
  delivery_code,
  link_product = '',
  setShoppingCartData,
  changeDeliveryByID,
  saving = 0,
  deleteItemErrorDelivery,
  shoppingCartStatus,
  hasDelivery
}) => {
  let timer;
  const { id_car_pay } = useSelector((state) => state.CardProduct);
  const [activeNumber, setActiveNumber] = useState(true);
  const [numberValue, setNumberValue] = useState(cantidad);
  const [deliveryCurrent, setDeliveryCurrent] = useState(delivery_code);
  const addToast = useToast();

  const updateProductStock = async (product_id, quantity) => {
    console.log('API...');

    const {
      updateStockShoppingCart: { status, message, shoppingCart }
    } = await AxiosGQL(
      UPDATE_STOCK_SHOPPING_CART(id_car_pay, product_id, quantity)
    );

    if (status) {
      clearTimeout(timer);
      setShoppingCartData(shoppingCart);
    } else {
      CVAlertError({
        addToast,
        message: message + ', Por favor disminuya la cantidad.'
      });
    }

    setActiveNumber(true);
  };

  const changeDelivery = async (value) => {
    setDeliveryCurrent(value);
    let [courier, delivery_type] = value.split('-');
    await changeDeliveryByID(courier, delivery_type || '', id);
  };

  return (
    <Box p={5} key={id} opacity={disponible ? 1 : 0.5}>
      <Flex m={1} justifyContent='start' flexWrap='wrap'>
        <Box width='150px' height='150px'>
          <CVImage
            link={link_product ? `/producto/${link_product}` : '#!'}
            image={images}
            height='150px'
            width='150px'
            isDisabled={shoppingCartStatus == 'VALIDATED_COUPON'}
          />
        </Box>
        <SizeBox />
        <Flex
          flexDirection='column'
          justifyContent='space-between'
          flexWrap='wrap'
          width='calc( 100% - 180px )'>
          <Flex justifyContent='space-between'>
            <CVText fontWeight='bold' fontSize='1.25rem' color='blue'>
              {name || ''}
            </CVText>

            {actions && (
              <Box
                cursor='pointer'
                onClick={() => {
                  setOnDelete(true);
                  console.log('ID para eliminar....');
                  console.log(id);
                  setId_delete(id);
                }}
                margin='1rem'>
                <Eraser />
              </Box>
            )}
          </Flex>
          <Flex>
            <CVText fontWeight='bold'>{store_name || ''}</CVText>
          </Flex>
          <Flex justify='space-between'>
            {shoppingCartStatus !== 'VALIDATED_COUPON' && (
              <CVCardProductComponentWish
                store_id={producto?.store_id}
                product_id={producto?.product_id}
                iconcolor='gray'
                hovercolor='gray'
                activecolor='primary'
                iconsize='2rem'
              />
            )}

            <Flex w='100%' align='center' justify='end'>
              <CVText fontWeight='bold' color='#004574' fontSize='1.25rem'>
                {CVMoneyFormat({
                  amount: producto?.offer
                    ? offerPrice({
                        offer_type: producto.offer_type,
                        offer_value: producto.offer_value,
                        price: precio
                      })
                    : precio
                })}
              </CVText>
              <CVText>/ unidad</CVText>
              <SizeBox />

              <NumberInput
                defaultValue={cantidad}
                size='md'
                maxW={28}
                bg='#F9F9F9'
                isDisabled={true}>
                <NumberInputField />
                {/* <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper> */}
              </NumberInput>

              {/* <NumberInput
                bg='#F9F9F9'
                size='md'
                maxW={28}
                isDisabled={!activeNumber}
                defaultValue={cantidad}
                onKeyUp={async (e) => {
                  if (numberValue !== cantidad) {
                    if (cantidad > 0 && cantidad <= stock) {
                      await updateProductStock(id, numberValue || 1);
                    }
                  } else {
                    setActiveNumber(true);
                  }
                }}
                onChange={(value) => setNumberValue(Number(value))}
                min={1}
                max={stock}>
                {actions && (
                  <>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper
                        onClick={async (e) => {
                          if (cantidad < stock) {
                            setActiveNumber(false);
                            await updateProductStock(id, numberValue);
                          }
                        }}
                      />
                      <NumberDecrementStepper
                        onClick={async () => {
                          if (cantidad > 1) {
                            setActiveNumber(false);
                            await updateProductStock(id, numberValue);
                          }
                        }}
                      />
                    </NumberInputStepper>
                  </>
                )}
              </NumberInput> */}

              <SizeBox />
              <Box>
                <CVText fontWeight='bold' color='blue' fontSize='2rem'>
                  {CVMoneyFormat({ amount: eval(subtotal - saving) })}
                </CVText>
                {descuento > 0 && (
                  <CVText color='red' fontWeight='bold'>
                    - {CVMoneyFormat({ amount: descuento })}
                  </CVText>
                )}
              </Box>
            </Flex>
          </Flex>

          <Flex justify='center'>
            <CVText
              fontFamily='Roboto'
              textDecoration='line-through'
              color='gray'
              fontSize='0.85rem'>
              {((producto.offer || '') + '').length > 0
                ? CVMoneyFormat({ amount: precio })
                : ''}
            </CVText>
            <SizeBox />
            {((producto.offer || '') + '').length ? (
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
                  offer_type: producto.offer_type,
                  offer_value: producto.offer_value,
                  price: precio
                })}
                %
              </Box>
            ) : (
              ''
            )}
          </Flex>

          <Flex gap='1' my='0.5rem'>
            {attributes &&
              attributes.map((attribute) => {
                if (attribute.hexa != '') {
                  return (
                    <Box
                      fontFamily='Roboto'
                      key={v4()}
                      boxShadow='0px 0px 1px 1px rgba(236,236,236,0.75)'
                      border='0.7px solid #E0E0E0'
                      width='1.25rem'
                      height='1.25rem'
                      backgroundColor={attribute.hexa}
                      margin='0 0.25rem'
                      rounded='3px'></Box>
                  );
                } else {
                  return (
                    <Text key={v4()}>
                      {' '}
                      {attribute.name}: {attribute.value}
                    </Text>
                  );
                }
              })}
          </Flex>
          <Box>
            {producto?.details?.attributes
              ? Object.keys(producto?.details?.attributes).map((k, v) => {
                  return (
                    <Box key={v4()}>
                      {typeof producto?.details?.attributes[k] != 'string' ? (
                        <Flex>
                          <Text mr='5px'>Color:</Text>
                          <Box
                            fontFamily='Roboto'
                            boxShadow='0px 0px 1px 1px rgba(236,236,236,0.75)'
                            border='0.7px solid #E0E0E0'
                            width='1.25rem'
                            height='1.25rem'
                            backgroundColor={
                              producto?.details?.attributes[k].type
                            }
                            margin='0 0.25rem'
                            rounded='3px'></Box>
                        </Flex>
                      ) : (
                        <Text>
                          {k}:{' '}
                          <span style={{ marginLeft: '5px' }}>
                            {producto?.details?.attributes[k]}
                          </span>
                        </Text>
                      )}
                    </Box>
                  );
                })
              : ''}
          </Box>

          {deliveries &&
            hasDelivery &&
            (deliveries.length > 0 ? (
              <Flex flexWrap='wrap' justifyContent='space-between'>
                <Box rounded='1rem' padding='1rem'>
                  <CVText fontSize='1.25rem' fontWeight='bold' color='blue'>
                    {/* Tipo de Entrega */}
                    Opciones de Envío
                  </CVText>
                  <SizeBox />
                  <CVRadio
                    isDisabled={shoppingCartStatus == 'VALIDATED_COUPON'}
                    itemDirection='column'
                    value={deliveryCurrent}
                    onChange={(value) => changeDelivery(value)}
                    options={deliveries.map((item, i) => ({
                      value:
                        item.courier +
                        (item.delivery_type ? '-' + item.delivery_type : ''),
                      text: (
                        <CVText>
                          {item?.price == 0 ? (
                            <span style={{ fontWeight: 'bold' }}>
                              Envío GRATIS
                            </span>
                          ) : (
                            `Envío: ${CVMoneyFormat({ amount: item.price })}`
                          )}
                          {/* Envío: {CVMoneyFormat({ amount: item.price })}&nbsp; */}
                          &nbsp;entrega estimada&nbsp;
                          {item.delivery_time} días.
                        </CVText>
                      )
                    }))}
                  />
                </Box>
              </Flex>
            ) : (
              <Flex
                flexWrap='wrap'
                flexDirection='row'
                justifyContent='space-between'>
                <CVErrorLabel errorMessage='Envío no disponible a su dirección' />
                <Box
                  cursor='pointer'
                  onClick={() => {
                    deleteItemErrorDelivery(id);
                  }}
                  margin='1rem'>
                  <Eraser />
                </Box>
              </Flex>
            ))}
        </Flex>
      </Flex>
      {numberItems > 1 && <CVLine lineHeight='1px' color='gray' />}
    </Box>
  );
};
export default ItemCarritoDelivery;
