import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { CVButton, CVPanel, CVText } from '@/common/CovendeTemplate';
import { successfull } from '../CarritoIcons';

function Confirmacion({ mediopago }) {
  return (
    <Box>
      <SizeBox />
      <CVText
        textAlign='center'
        color='blue'
        fontWeight='bold'
        fontSize='1.5rem'>
        Confirmación de Pedido
      </CVText>
      <SizeBox />

      <CVPanel variant='box' height='100%'>
        <SizeBox height='2rem' />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <CVPanel
              itemDirection='column'
              itemJustify='center'
              height='100%'
              itemsAlign='center'>
              <CVText color='red' fontWeight='bold' fontSize='2rem'>
                ¡Felicitaciones!
              </CVText>
              <SizeBox />

              {!['Tarjeta', 'Coupon'].includes(mediopago) ? (
                <>
                  <CVText textAlign='center' color='blue' fontWeight='bold'>
                    Tu código de pago ha sido generado con exito.
                  </CVText>
                  <SizeBox />
                  <CVText textAlign='center' color='blue'>
                    El vendedor atenderá tu pedido tan pronto efectues el pago.
                  </CVText>
                </>
              ) : (
                <CVText textAlign='center' color='blue'>
                  Tu compra ha sido realizada con éxito.
                </CVText>
              )}

              <SizeBox />
              {successfull}
            </CVPanel>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CVPanel
              backgroundColor='lightGray'
              itemDirection='column'
              itemJustify='center'
              itemsAlign='center'
              height='100%'>
              <CVText
                textAlign='center'
                color='blue'
                fontSize='1.25rem'
                fontWeight='bold'>
                Haz seguimiento a tu pedido desde tu cuenta
              </CVText>
              <SizeBox />
              <Flex width='100%' justifyContent='space-around'>
                <Link to='/buyer' style={{ width: '40%' }}>
                  <CVButton
                    width='100%'
                    variant='outlined'
                    backgroundColor='white'
                    borderRadius='0.5rem'>
                    IR A MI CUENTA
                  </CVButton>
                </Link>
                <Link to='/' style={{ width: '40%' }}>
                  <CVButton width='100%' borderRadius='0.5rem'>
                    SEGUIR COMPRANDO
                  </CVButton>
                </Link>
              </Flex>
            </CVPanel>
          </Grid>
        </Grid>
        <SizeBox height='2rem' />
      </CVPanel>
    </Box>
  );
}

export default Confirmacion;
