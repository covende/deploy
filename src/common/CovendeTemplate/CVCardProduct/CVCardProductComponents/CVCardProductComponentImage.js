import { Box } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { addCarDirect } from '@CVPages/core/producto/components/PPresentacion';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CVImage } from '../..';
import { carrito, productincart } from '../CVCardProductMethod';
import { add_item, A_CARD_PRODUCT } from '../CVCardProductRedux/Actions';
import CVCardProductComponentsActions from './CVCardProductComponentsActions';
import CVCardProductComponentWish from './CVCardProductComponentWish';
import { CVAlertError } from '@CVTemplate/core/CVAlert';

function CVCardProductComponentImage({
  buttons,
  type_of_sale,
  item,
  product_photo,
  goto,
  width,
  product_id,
  product_slug,
  precio
}) {
  const { lista_carrito, id_car_pay } = useSelector(
    (state) => state.CardProduct
  );
  const addToast = useToast();

  const dispatch = useDispatch();
  let incart = useMemo(
    () => productincart({ lista_carrito, product_id }),
    [product_id, lista_carrito]
  );
  let hasVariant = item?.product_attributes?.length || 0;

  return (
    <span
      style={{
        position: 'relative',
        width,
        height: width,
        display: 'flex',
        flexDirection: 'column'
      }}>
      <div onClick={() => goto()}>
        <CVImage
          image={product_photo}
          width={width}
          height={width}
          borderRadius='1rem'
        />
      </div>

      <Box
        width={width}
        display='flex'
        alignItems='start'
        justifyContent='center'
        height={width}
        marginTop='-2rem'>
        <CVCardProductComponentsActions
          addcart={
            () => {
              if (hasVariant) {
                dispatch(
                  add_item({
                    photographs: item.product_photo,
                    product_name: item.product_name,
                    product_attributes: item.product_attributes,
                    price: item.precio,
                    wholesale: item.wholesale || [],
                    variations: item.variations,
                    stock: item.stock,
                    product_id: item.product_id,
                    has_attributes: true,
                    optional: true,
                    offer: item.offer,
                    offer_type: item.offer_type,
                    offer_value: item.offer_value,
                    delivery_free: item.delivery_free,
                    type_of_sale
                  })
                );
                dispatch(A_CARD_PRODUCT({ carrito_added: true }));
              } else {
                if (item?.stock == 0) {
                  return CVAlertError({
                    addToast,
                    message: 'Producto sin stock'
                  });
                }
                addCarDirect({
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
                  type_of_sale,
                  dispatch
                });
              }
            }
            // carrito({
            //   incart,
            //   dispatch,
            //   lista_carrito,
            //   product_id,
            //   addToast,
            //   price: precio,
            //   store_id: item.store_id,
            //   product_photo,
            //   product_name: item.product_name
            // })
          }
          hasVariant={hasVariant}
          buttons={buttons}
          typesale={type_of_sale}
          incart={incart}
          product_slug={product_slug}
          AddWish={
            <CVCardProductComponentWish
              store_id={item.store_id}
              product_id={product_id}
            />
          }
        />
      </Box>
    </span>
  );
}

export default CVCardProductComponentImage;
