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
  NumberDecrementStepper,
  Spacer
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
import useWindowSize from '@/common/hooks/useWindowSize';
import iconDelivery from '@/app/assets/images/car-delivery-free.svg';

const ItemCarrito = ({
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
  link_product = '',
  setShoppingCartData,
  tipodoc,
  saving = 0,
  infoenvio,
  delivery_free
}) => {
  let timer;
  const { id_car_pay } = useSelector((state) => state.CardProduct);
  const [activeNumber, setActiveNumber] = useState(true);
  const [numberValue, setNumberValue] = useState(cantidad);
  const addToast = useToast();
  const screenSize = useWindowSize();
  const isMobile = screenSize.width < 576;

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

  return (
    <Box p={5} key={id} opacity={disponible ? 1 : 0.5}>
      <Flex m={1} justifyContent='center' flexWrap='wrap'>
        <Flex flexDirection='column'>
          <CVImage
            link={link_product ? `/producto/${link_product}` : '#!'}
            image={producto?.thumbnail || images}
            height='150px'
            width='150px'
          />

          {delivery_free && (
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
                  maxWidth: '110px',
                  marginTop: '-1.5rem'
                }}>
                <Box maxWidth='20px'>
                  <CVImage image={iconDelivery} width='auto' />
                </Box>
                <Flex>Envío GRATIS</Flex>
              </Box>
            </>
          )}
        </Flex>

        <SizeBox />
        <Flex
          flexDirection='column'
          justifyContent='space-between'
          flexWrap='wrap'
          width={isMobile ? 'auto' : 'calc( 100% - 180px )'}>
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
            <CVCardProductComponentWish
              store_id={producto?.store_id}
              product_id={producto?.product_id}
              iconcolor='gray'
              hovercolor='gray'
              activecolor='primary'
              iconsize='2rem'
            />

            {tipodoc && infoenvio ? (
              <>
                <Flex ml={110} w='50%'>
                  <CVText fontWeight='bold' color='blue'>
                    Tipo Comprobante:&nbsp;&nbsp;
                  </CVText>
                  <CVText fontWeight='bold'> {tipodoc}</CVText>
                </Flex>
                <Flex ml={1} w='50%'>
                  <CVText fontWeight='bold' color='blue'>
                    Dirección:&nbsp;&nbsp;
                  </CVText>
                  <CVText fontWeight='bold'> {infoenvio}</CVText>
                </Flex>
              </>
            ) : (
              ''
            )}
            <Flex w='100%' align='center' justify='end'>
              <CVText fontWeight='bold' color='#004574' fontSize='1.25rem'>
                {CVMoneyFormat({
                  amount: producto.offer
                    ? offerPrice({
                        offer_type: producto.offer_type,
                        offer_value: producto.offer_value,
                        price: precio
                      })
                    : precio
                })}
              </CVText>
              <CVText>/ unidad </CVText>
              {/* {JSON.stringify(numberValue)} */}
              <SizeBox />

              {actions ? (
                <NumberInput
                  bg='#F9F9F9'
                  size='md'
                  maxW={28}
                  isDisabled={!activeNumber}
                  defaultValue={cantidad}
                  onKeyUp={async (e) => {
                    if (numberValue !== cantidad) {
                      // if (cantidad > 0 && cantidad <= stock) {
                      //   await updateProductStock(id, numberValue || 1);
                      // }
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
                </NumberInput>
              ) : (
                <NumberInput
                  defaultValue={cantidad}
                  size='md'
                  maxW={28}
                  bg='#F9F9F9'
                  isDisabled={true}>
                  <NumberInputField />
                  {/* <NumberInputStepper> */}
                  {/* <NumberIncrementStepper />
                    <NumberDecrementStepper /> */}
                  {/* </NumberInputStepper> */}
                </NumberInput>
              )}

              <SizeBox />
              <Box>
                <CVText fontWeight='bold' color='blue' fontSize='2rem'>
                  {/* S/example */}
                  {/* {moneyformat(subtotal)} */}
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
          <Flex flexWrap='wrap' justifyContent='space-between'>
            {disponible ? (
              <>
                {envio != 0 && (
                  <CVText color='blue'>
                    Envío: {CVMoneyFormat({ amount: envio })} soles
                  </CVText>
                )}

                {delivery_time != 0 && (
                  <CVText color='blue'>
                    Entrega estimada:{' '}
                    {`${delivery_time} ${preparation_time_type}`}
                  </CVText>
                )}
                <SizeBox />
              </>
            ) : (
              <>
                <CVErrorLabel errorMessage='Envio no disponible a su dirección' />
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
      {numberItems > 1 && <CVLine lineHeight='1px' color='gray' />}
    </Box>
  );
};
export default ItemCarrito;
