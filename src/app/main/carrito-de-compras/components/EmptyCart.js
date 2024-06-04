import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVImage, CVText } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import carritovacio from '@/app/assets/products/carritovacio.svg';
import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <Flex justifyContent='center'>
      <Flex flexDirection='column' alignItems='center'>
        <SizeBox />
        <CVImage image={carritovacio} />
        <SizeBox />
        <CVText color='red' fontWeight='bold' fontSize='1.25rem'>
          Tu carrito de compras está vacío
        </CVText>
        <CVText color='blue'>
          Mira todas las <SizeBox width='0.5rem' />
          <Link to='/ofertas'>
            <CVText color='primary'>ofertas increíbles</CVText>
          </Link>
          <SizeBox width='0.5rem' />o inicia sesión para ver tu carrito
        </CVText>
        <SizeBox height='2rem' />
      </Flex>
    </Flex>
  );
}

export default EmptyCart;
