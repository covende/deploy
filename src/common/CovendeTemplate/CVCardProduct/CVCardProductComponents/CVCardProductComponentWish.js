import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { Tooltip } from '@chakra-ui/tooltip';
import { BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';

import { CVButton } from '../..';
import { favorito, productFavourite } from '../CVCardProductMethod';
import { getLoggedInUser } from '@/app/helpers/authUtils';

function CVCardProductComponentWish({
  store_id,
  product_id,
  iconcolor = 'primary',
  hovercolor = 'primary',
  activecolor = 'primary',
  iconsize = '1.5rem',
  clearProducts = () => {}
}) {
  const { lista_deseos, whislist_added } = useSelector(
    (state) => state.CardProduct
  );
  const us = getLoggedInUser();
  let inwish = useMemo(
    () => productFavourite({ lista_deseos, product_id }),
    [product_id, lista_deseos]
  );
  const dispatch = useDispatch();
  const addToast = useToast();

  const addfavourite = () =>
    favorito({
      inwish,
      dispatch,
      lista_deseos,
      product_id,
      addToast,
      store_id,
      whislist_added
    });

  const [hoverwish, sethoverwish] = useState(false);
  const [bgwish, setbgwish] = useState('white');
  const hoveredwish = (status) => {
    sethoverwish(status);
    setbgwish('primary');
  };

  return !!us && us.platformID !== 'PBO' ? (
    <Tooltip
      label={
        inwish
          ? 'Retirar de la lista de deseos'
          : 'Agregar a la lista de deseos'
      }>
      <Box
        backgroundColor='white'
        rounded='2rem'
        height={iconsize}
        width={iconsize}
        display='flex'
        justifyContent='center'
        alignItems='center'>
        <CVButton
          backgroundColor={inwish ? activecolor : bgwish}
          onHover={hoveredwish}
          color={hoverwish ? 'white' : inwish ? activecolor : hovercolor}
          padding='3px'
          onClick={() => {
            addfavourite();
            clearProducts(product_id);
          }}
          boxShadow='none'
          height={iconsize}
          width={iconsize}
          variant={hoverwish ? 'contained' : 'outlined'}>
          {hoverwish ? (
            <BsSuitHeartFill />
          ) : inwish ? (
            <BsSuitHeartFill />
          ) : (
            <BsSuitHeart />
          )}
        </CVButton>
      </Box>
    </Tooltip>
  ) : (
    <></>
  );
}

export default CVCardProductComponentWish;
