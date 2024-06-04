import React, { useState } from 'react';

import { Grid } from '@material-ui/core';
import { Box, Flex, Text } from '@chakra-ui/react/';
import { Link } from 'react-router-dom';

import { COLORS } from '@CVTemplate/core/CVThemes';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';
import { CVText } from '@CVTemplate/core/index';
import PresentPlan from './PresentPlan';
import { PdfIcon } from '@/common/utils/icons';

export function DataPlans({ expand = false, plan }) {
  const [isExpand, setIsExpand] = useState(expand);
  return (
    <Box
      bg='white '
      border='1px'
      transition='all .5s ease'
      borderColor='#004772'
      borderLeftWidth='15px'
      mb='1rem'
      borderRadius='12px'>
      <Flex
        borderBottom={isExpand ? '1px solid #00ADF6' : 'none'}
        onClick={() => setIsExpand(!isExpand)}
        m={isExpand ? '22px' : '0'}
        p={isExpand ? '0' : '22px'}
        cursor='pointer'
        justify='space-between'
        align='center'
        color={COLORS['blue']}>
        <Text fontSize='20px' fontWeight='600'>
          {plan.name || ''}
        </Text>
        <Text fontSize='14px'>
          {plan.fecha_inicio ? CVFormatDate({ date: plan.fecha_inicio }) : ''}
        </Text>
      </Flex>
      {isExpand && (
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={5} md={5}>
              <Flex justifyContent='center'>
                <PresentPlan
                  title=''
                  price={plan.amount_final}
                  periodo={plan.period?.value}
                  plan={plan}
                />
              </Flex>
            </Grid>

            <Grid item xs={12} sm={7} md={7}>
              <Box mt='26px'>
                <Flex>
                  <Text fontSize='14px' color={COLORS['blue']} w='12rem'>
                    Estado del plan:
                  </Text>{' '}
                  <CVText
                    fontSize='14px'
                    fontWeight='300'
                    color={plan.status == 'Activo' ? 'green' : 'red'}>
                    {' '}
                    {plan.status}{' '}
                  </CVText>
                </Flex>
                <Flex>
                  <Text fontSize='14px' color={COLORS['blue']} w='12rem'>
                    Vigencia:
                  </Text>{' '}
                  <CVText color='gray' fontSize='14px' fontWeight='300'>
                    Del{' '}
                    {plan.fecha_inicio
                      ? CVFormatDate({ date: plan.fecha_inicio })
                      : '-'}
                    al{' '}
                    {plan.fecha_fin
                      ? CVFormatDate({ date: plan.fecha_fin })
                      : '-'}{' '}
                  </CVText>
                </Flex>

                <Flex>
                  <Text fontSize='14px' color={COLORS['blue']} w='12rem'>
                    Estado del pago:
                  </Text>{' '}
                  <CVText color='gray' fontSize='14px' fontWeight='300'>
                    {plan.payment_status == 'COMPLETED'
                      ? 'Pagado'
                      : plan.payment_status == 'PENDING'
                      ? 'Pendiente'
                      : 'Expirado'}
                  </CVText>
                </Flex>

                <Flex>
                  <Text fontSize='14px' color={COLORS['blue']} w='12rem'>
                    Fecha de pago:
                  </Text>{' '}
                  <CVText color='gray' fontSize='14px' fontWeight='300'>
                    {plan.payment_date
                      ? CVFormatDate({ date: plan.payment_date })
                      : '-'}
                  </CVText>
                </Flex>

                <Flex mb='.5rem'>
                  <Text fontSize='14px' color={COLORS['blue']} w='12rem'>
                    Medio de pago:
                  </Text>{' '}
                  <CVText color='gray' fontSize='14px' fontWeight='300'>
                    {plan?.methodPayment?.title || '-'}{' '}
                  </CVText>
                </Flex>

                <Link
                  to='#'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                  <PdfIcon />
                  <CVText color='blue' fontSize='14px'>
                    Factura
                  </CVText>
                </Link>
              </Box>
            </Grid>
          </Grid>
          {plan.status === 'Activo' && (
            <Flex
              justifyContent='center'
              mt='-12px'
              mb='10px'
              textDecoration='underline'
              color={COLORS['primary']}>
              <Link to='/seller/cancelar'>
                <CVText fontSize='1.2rem' color='skyblue'>
                  Cancelar suscripción
                </CVText>
              </Link>
            </Flex>
          )}
        </Box>
      )}
    </Box>
  );
}
