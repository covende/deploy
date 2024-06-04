import React, { useState } from 'react';
import { CVButton } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

function PayCoupon({
  itemsPrice,
  callback,
  antifraude,
  setsuccess,
  mediopago = 'coupon'
}) {
  const [loading, setloading] = useState(false);
  const [view, setView] = useState(true);

  return (
    <Box>
      {view ? (
        <Grid
          container
          spacing={1}
          style={{ background: 'white', borderRadius: '12px' }}
          justifyContent='center'>
          <Grid item xs={12} sm={8} md={6}>
            <Box
              width='100%'
              mt='2rem'
              padding='0 2rem 1rem 2rem'
              backgroundColor='#FFFFFF'>
              <SizeBox />
              <Flex justifyContent='space-between'>
                <Text color='#004574' fontWeight='bold'>
                  TOTAL A PAGAR
                </Text>
                <Text color='#004574' fontWeight='bold'>
                  S/ {eval(itemsPrice).toFixed(2)}
                </Text>
              </Flex>
              <Flex justifyContent='space-between'>
                <Text color='#004574' fontWeight='bold'>
                  Dirección:
                </Text>
                <Text color='#004574' fontWeight='bold'>
                  {antifraude?.order.direction || '-'}
                </Text>
              </Flex>
              <Flex justifyContent='space-between'>
                <Text color='#004574' fontWeight='bold'>
                  Tipo de comprobante:
                </Text>
                <Text color='#004574' fontWeight='bold'>
                  {antifraude?.order.tipodoc || 'Boleta'}
                </Text>
              </Flex>
              <SizeBox />
              <span>
                Al hacer clic en "Pagar" aceptas los{' '}
                <Link to='/terminos-y-condiciones' style={{ color: '#00ADF6' }}>
                  Términos y Condiciones
                </Link>{' '}
                de Covende.{' '}
              </span>
              <SizeBox />
              <Flex justifyContent='center'>
                <CVButton
                  onClick={async () => {
                    setloading(true);
                    await callback({ status: true }, mediopago);
                    setloading(false);
                    setView(false);
                  }}
                  fontSize='1.5rem'
                  fontWeight='bold'
                  padding='1rem 1.5rem'
                  isLoading={loading}
                  disabled={loading}>
                  Pagar Ahora
                </CVButton>
              </Flex>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default PayCoupon;
