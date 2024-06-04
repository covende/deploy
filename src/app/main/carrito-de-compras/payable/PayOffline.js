import React, { useState } from 'react';
import {
  CVButton,
  CVImage,
  CVNiubizPagoEfectivo
} from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { pgefectivocards } from '../components/icons';
import CVCajaHuancayo from '@/common/CovendeTemplate/CVCajaHuancayo';

function PayOffline({
  itemsPrice,
  callback,
  antifraude,
  setsuccess,
  mediopago = 'pagoefectivo'
}) {
  const [loading, setloading] = useState(false);

  const [payable, setpayable] = useState(false);
  const [uri, seturi] = useState('');

  const transaction = async (result) => {
    try {
      callback(result, mediopago);
      if (!result.status) {
        setpayable(false);
      }
      setsuccess(result.status);
    } catch (error) {
      console.log({ error, message: 'unmounted newbiz payoffline' });
    }
  };
  return (
    <Box>
      {!uri ? (
        <Grid
          container
          spacing={1}
          style={{ background: 'white', borderRadius: '12px' }}>
          <Grid item xs={12} sm={8} md={9}>
            <Box
              width='100%'
              height='100%'
              rounded='1rem'
              padding='2rem'
              justifyContent='space-between'>
              <Flex flexWrap='wrap'>
                <Text color='#004772' fontSize='2.2rem' fontWeight='bold'>
                  Pago con efectivo
                </Text>
                <Text fontSize='18px'>
                  Deberás utilizar el{' '}
                  <strong>
                    {' '}
                    código {mediopago == 'pagoefectivo' ? 'CIP' : ''}{' '}
                  </strong>{' '}
                  que se te enviará para pagar a través de tu Banca por
                  Internet, Banca móvil, agentes o agencias de{' '}
                  {mediopago == 'pagoefectivo' ? 'los siguientes bancos' : ''}:
                </Text>
                {mediopago == 'pagoefectivo' ? (
                  pgefectivocards
                ) : (
                  <CVImage
                    width='auto'
                    height='50px'
                    image='https://covendefiles.s3.amazonaws.com/images/1638333773356'
                  />
                )}
              </Flex>

              <Flex justifyContent='center' mt={5}>
                {!payable ? (
                  ''
                ) : (
                  <Box>
                    {/* <CVButton onClick={() => transaction()}>Pagar</CVButton> */}
                    {mediopago == 'pagoefectivo' ? (
                      <CVNiubizPagoEfectivo
                        callback={transaction}
                        seturl={seturi}
                        order={antifraude.order}
                        customer={antifraude.customer}
                      />
                    ) : (
                      <CVCajaHuancayo
                        callback={transaction}
                        seturl={seturi}
                        order={antifraude.order}
                        customer={antifraude.customer}
                      />
                    )}
                    {/* 
                    <Text color='#004772' fontSize='20px' fontWeight='bold'>
                      Información del envío
                    </Text> */}
                  </Box>
                )}
              </Flex>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Box
              width='100%'
              borderLeft='2px solid #004772'
              mt='2rem'
              padding='0 2rem 1rem 4.5rem'
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
                  onClick={() => setpayable(!payable)}
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
        <iframe src={uri} width='100%' height='1300vh'></iframe>
      )}
      {uri}
    </Box>
  );
}

export default PayOffline;
