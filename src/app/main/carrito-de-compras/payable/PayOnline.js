import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVNiubizCardPay } from '@/common/CovendeTemplate';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Button, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function PayOnline({ itemsPrice, callback, antifraude }) {
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(true);
  const [payable, setpayable] = useState(false);
  const transaction = (result) => {
    callback(result, 'niubiz');
    if (!result.status) {
      setpayable(false);
      setsuccess(false);
    }
  };
  useEffect(() => {
    if (itemsPrice > 0 && antifraude?.order?.amount != null) {
      setpayable(true);
    }
  }, [itemsPrice, antifraude?.order]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={8} md={9}>
        <Flex justifyContent='center'>
          {!payable ? (
            success ? (
              <Box>
                <Text color='#004574' fontWeight='bold'>
                  Cargando formulario de Pago
                </Text>
              </Box>
            ) : (
              <CVButton onClick={() => setpayable(true)}>
                Volver a Intentarlo
              </CVButton>
            )
          ) : (
            <CVNiubizCardPay
              callback={transaction}
              order={antifraude.order}
              customer={antifraude.customer}
            />
          )}
        </Flex>
      </Grid>
      <Grid item xs={12} sm={4} md={3}>
        <Box
          width='100%'
          height='20%'
          rounded='1rem'
          padding='2rem'
          backgroundColor='#FFFFFF'>
          <SizeBox />
          <Flex justifyContent='space-between'>
            <Text color='#004574' fontWeight='bold'>
              TOTAL A PAGAR
            </Text>
            <Text color='#66C1FD' fontWeight='bold'>
              S/ {eval(itemsPrice).toFixed(2)}
            </Text>
          </Flex>
          <SizeBox />
        </Box>
      </Grid>
    </Grid>
  );
}

export default PayOnline;
