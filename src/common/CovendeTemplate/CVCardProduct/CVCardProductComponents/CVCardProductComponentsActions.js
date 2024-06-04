import { getLoggedInUser } from '@/app/helpers/authUtils';
import { CVButton } from '@/common/CovendeTemplate';
import { Box, Flex } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { retail } from '../CVCardProductMethod';

function CVCardProductComponentsActions({
  typesale,
  incart,
  product_slug,
  addcart,
  buttons,
  AddWish,
  hasVariant = 0
}) {
  const history = useHistory();
  const us = getLoggedInUser();

  const goto = () => history.push(`/producto/${product_slug}`);
  const [hover, sethover] = useState(false);
  const [bg, setbg] = useState('primary');
  const hovered = (status) => sethover(status);
  useEffect(() => {
    setbg(incart ? 'red' : 'primary');
  }, [incart]);
  return (
    <Flex
      display='none'
      ref={buttons}
      width='95%'
      justifyContent='space-between'>
      <Box
        backgroundColor='white'
        rounded='2rem'
        height='1.5rem'
        display='flex'
        justifyContent='center'
        alignItems='center'>
        {/* {retail(typesale || '') && hasVariant == 0 ? ( */}
        <CVButton
          onHover={hovered}
          padding='5px 10px'
          height='1.5rem'
          onClick={() => addcart()}
          boxShadow='none'
          backgroundColor={bg}
          variant={hover ? 'contained' : 'outlined'}
          fontSize='0.75rem'>
          {incart ? 'Retirar' : 'Añadir al carrito'}
        </CVButton>
        {/* ) : (
          <CVButton
            variant={hover ? 'contained' : 'outlined'}
            onHover={hovered}
            onClick={() => goto()}
            padding='5px 10px'
            height='1.5rem'
            boxShadow='none'
            fontSize='0.75rem'
            backgroundColor={bg}>
            Ver Producto
          </CVButton>
        )} */}
      </Box>
      {us && AddWish}
    </Flex>
  );
}

export default CVCardProductComponentsActions;
