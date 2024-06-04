import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Box
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import {
  add_item,
  A_CARD_PRODUCT
} from '@/common/CovendeTemplate/CVCardProduct/CVCardProductRedux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { CVButton, CVImage, CVModal, CVText } from '@/common/CovendeTemplate';
import { ICON_CART_ADD } from '../Iconos';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { useHistory } from 'react-router';
import addedcart from '@/app/assets/products/addedcart.svg';
import { CVMoneyFormat } from '@/common/CovendeTemplate/CVMethods';
import PVMenor from '@CVPages/core/producto/components/precios/PVMenor';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { ADD_SHOPPING_CART_PRODUCT } from '@CVApi/core/webpublic/products/HomeProducts';
import {
  offerPercentage,
  offerPrice,
  toBase64
} from '@CVTemplate/core/CVCardProduct/CVCardProductMethod';
import { COLORS } from '@CVTemplate/core/CVThemes';
import iconDelivery from '@/app/assets/images/car-delivery-free.svg';

function MCartList({ auth }) {
  const { carrito_added, product_added, id_car_pay } = useSelector(
    (state) => state.CardProduct
  );

  const [price, setprice] = useState(0);
  const [quantity, setquantity] = useState(1);
  const [variation, setVariation] = useState([]);
  const [customdetail, setcustomdetail] = useState(null);
  const [stockmax, setstockmax] = useState(0);
  const [loading, setLoading] = useState(false);
  const [details, setdetails] = useState(-1);
  const [openTooltip, setopenTooltip] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    variation_id: '',
    attributes: []
  });

  const [subtotal, setSubtotal] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();
  const addToast = useToast();

  const onClose = () => {
    setCurrentProduct({ variation_id: '', attributes: [] });
    setquantity(1);
    dispatch(A_CARD_PRODUCT({ carrito_added: false }));
  };

  const gotoCart = () => {
    onClose();
    history.push('/carrito-de-compras');
  };

  useEffect(() => {
    setstockmax(product_added.stock);
    setprice(product_added.price);
    if (product_added.variations)
      setdetails(product_added.variations.length > details ? 0 : -1);
    return () => {
      setstockmax(0);
    };
  }, [product_added]);

  useEffect(() => {
    quantity && price && setSubtotal(quantity * price);
  }, [quantity, price]);

  const add_car_with_attributes = async () => {
    if (loading) return;
    setLoading(true);

    if (
      product_added.product_attributes?.length > 0 &&
      product_added.product_attributes.length !==
        currentProduct.attributes.length
    ) {
      setopenTooltip(!openTooltip);
      CVAlertError({
        addToast,
        message: 'Seleccione las opciones disponibles'
      });
      setLoading(false);
      return false;
    }

    if (stockmax < quantity) {
      CVAlertError({ addToast, message: 'Cantidad fuera de Stock' });
      setLoading(false);
      return false;
    }

    const { addOne } = await AxiosGQL(
      ADD_SHOPPING_CART_PRODUCT({
        _id: id_car_pay || '',
        product_id: product_added.product_id,
        variation_id: currentProduct.variation_id,
        quantity,
        attributes: toBase64(JSON.stringify(currentProduct.attributes))
      })
    );
    if (addOne?.status) {
      setCurrentProduct({ variation_id: '', attributes: [] });
      // setquantity(1);
      if (!id_car_pay)
        window.localStorage.setItem(
          'id_car_pay',
          addOne.shopping_cart_id ?? ''
        );
      CVAlertSuccess({ addToast, message: addOne.message });
      dispatch(
        add_item({
          photographs: product_added.photographs,
          product_name: product_added.product_name,
          price: product_added.price,
          offer: product_added?.offer,
          offer_type: product_added?.offer_type,
          offer_value: product_added?.offer_value,
          delivery_free: product_added?.delivery_free,
          type_of_sale: product_added?.type_of_sale
        })
      );
      dispatch(
        A_CARD_PRODUCT({
          id_car_pay: addOne.shopping_cart_id,
          carrito_added: true
        })
      );
    } else {
      CVAlertError({
        addToast,
        message: 'Algo salió mal, inténtelo mas tarde.'
      });
    }
    setLoading(false);
  };

  return carrito_added ? (
    <CVModal
      isOpen={carrito_added}
      onClose={onClose}
      bgHeader='green'
      size='2xl'
      colorHeader='white'
      header='¡Añadido a tu carrito de compras!'
      footer={
        <Flex width='100%' justifyContent='space-between'>
          {!product_added.has_attributes ? (
            <Flex w='100%'>
              <CVButton
                variant='outlined'
                color='green'
                onClick={() => onClose()}>
                SEGUIR COMPRANDO
              </CVButton>
              <SizeBox />
              <CVButton backgroundColor='green' onClick={() => gotoCart()}>
                VER CARRITO
              </CVButton>
            </Flex>
          ) : (
            <CVButton
              isLoading={loading}
              backgroundColor='green'
              onClick={async () => await add_car_with_attributes()}>
              AGREGAR
            </CVButton>
          )}
        </Flex>
      }>
      <Flex justifyContent='space-between' alignItems='center'>
        <Flex>
          <Flex flexDirection='column'>
            <CVImage
              height='100px'
              width='100px'
              image={product_added.photographs}
            />
            {product_added.delivery_free && (
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
                    maxWidth: '140px',
                    marginTop: '-1.2rem'
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
          <Box>
            <Box height='1rem' width='100%' />
            <CVText color='blue' fontWeight='bold' textAlign='start'>
              {product_added.product_name}
            </CVText>

            {product_added?.type_of_sale == 'RETAIL' ? (
              <Box>
                <CVText
                  color='blue'
                  fontSize='18'
                  fontWeight='900'
                  fontFamily='Roboto'>
                  {CVMoneyFormat({
                    amount: product_added.offer
                      ? offerPrice({
                          offer_type: product_added.offer_type,
                          offer_value: product_added.offer_value,
                          price: product_added.price,
                          quantity
                        })
                      : product_added.price * quantity
                  })}
                </CVText>
                <Flex>
                  <CVText
                    fontFamily='Roboto'
                    textDecoration='line-through'
                    color='gray'
                    fontSize='0.85rem'>
                    {((product_added.offer || '') + '').length > 0
                      ? CVMoneyFormat({
                          amount: product_added.price * quantity
                        })
                      : ''}
                  </CVText>
                  <SizeBox />
                  {((product_added.offer || '') + '').length ? (
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
                        offer_type: product_added.offer_type,
                        offer_value: product_added.offer_value,
                        price: product_added.price
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
                    amount: product_added.offer
                      ? offerPrice({
                          offer_type: product_added.offer_type,
                          offer_value: product_added.offer_value,
                          price: product_added.price,
                          quantity
                        })
                      : product_added.price * quantity
                  })}
                </CVText>
                <SizeBox />

                <CVText
                  fontFamily='Roboto'
                  textDecoration='line-through'
                  color='gray'
                  fontSize='0.85rem'>
                  {((product_added.offer || '') + '').length > 0
                    ? CVMoneyFormat({ amount: product_added.price * quantity })
                    : ''}
                </CVText>

                <SizeBox />
                {((product_added.offer || '') + '').length ? (
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
                      offer_type: product_added.offer_type,
                      offer_value: product_added.offer_value,
                      price: product_added.price
                    })}
                    %
                  </Box>
                ) : (
                  ''
                )}
              </>
            )}
          </Box>
        </Flex>

        {product_added.has_attributes && (
          <PVMenor
            wholesale={product_added.wholesale}
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
            setVariation={setVariation}
            variations={product_added.variations}
            product_attributes={product_added?.product_attributes || []}
            stockmax={stockmax}
            setstockmax={setstockmax}
            price={price}
            setprice={setprice}
            quantity={quantity}
            setquantity={setquantity}
            details={details}
            setdetails={setdetails}
            setcustomdetail={setcustomdetail}
            openTooltip={openTooltip}
            setopenTooltip={setopenTooltip}
          />
        )}
        <CVImage width='auto' height='auto' image={addedcart} />
      </Flex>
    </CVModal>
  ) : (
    <Box></Box>
  );
}

export default MCartList;
