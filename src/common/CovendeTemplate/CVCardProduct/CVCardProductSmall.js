import { Box, Flex } from '@chakra-ui/react';
import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { SmallProduct } from './CVCardCustomStyle';
import { useToast } from '@chakra-ui/toast';

import {
  favorito,
  oferPricePublic,
  offerPercentage,
  offerPrice,
  offerprice,
  productFavourite,
  productincart
} from './CVCardProductMethod';
import CVCardProductComponentWish from './CVCardProductComponents/CVCardProductComponentWish';
import { CVImage } from '..';
import { CVMoneyFormat } from '../CVMethods';

function CVCardProductSmall({
  product_id,
  product_photo,
  precio,
  product_name,
  precio_minimo,
  precio_maximo,
  offer = 0,
  percentage_oferta,
  offer_type,
  offer_value,
  puntuacion,
  product_slug,
  pedido_minimo,
  item
}) {
  const history = useHistory();
  const goto = () => history.push(`/producto/${product_slug}`);

  const { lista_deseos, lista_carrito } = useSelector(
    (state) => state.CardProduct
  );
  return (
    <SmallProduct>
      <span style={{ position: 'relative' }}>
        <div onClick={() => goto()}>
          <CVImage image={product_photo} />
        </div>
        <Flex
          justifyContent='end'
          position='absolute'
          top='110px'
          width='120px'
          padding='0 10px'>
          <CVCardProductComponentWish
            store_id={item.store_id}
            product_id={product_id}
          />
        </Flex>
      </span>
      <div onClick={() => goto()}>
        <div className='product-name'>{product_name}</div>

        <Flex justifyContent='space-between'>
          <Box fontSize='0.85rem' color='#004772' fontWeight='bold'>
            {CVMoneyFormat({
              amount: offer
                ? offerPrice({
                    offer_type,
                    offer_value,
                    price: precio
                  })
                : precio
            })}
          </Box>
          {offer ? (
            <Box
              fontSize='0.6rem'
              color='#C4C4C4'
              textDecoration='line-through'>
              {CVMoneyFormat({ amount: precio })}
            </Box>
          ) : (
            <></>
          )}

          {offer ? (
            <Box
              fontSize='0.7rem'
              backgroundColor='#FF5454'
              color='#FFFFFF'
              padding='1px 3px'
              rounded='0.6rem'>
              {offerPercentage({ offer_type, offer_value, price: precio })}%
            </Box>
          ) : (
            ''
          )}
        </Flex>
      </div>
    </SmallProduct>
  );
}

export default CVCardProductSmall;
