import React from 'react';

// Components
import { Text, Flex, Box, Heading } from '@chakra-ui/react';

import { FormControl, Grid, MenuItem, Select } from '@material-ui/core';
import InformationPedido from './components/InformacionPedido';
import EnvioPedido from './components/EnvioPedido';
import { BsFileEarmark } from 'react-icons/bs';
import ProductoPedido from './components/ProductoPedido';
import PrecioPedido from './components/PrecioPedido';
import CompradorPedido from './components/CompradorPedido';
import EstadoPedido from './components/EstadoPedido';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVButton from '@CVTemplate/core/CVButton';
import CVText from '@CVTemplate/core/CVText';
import { CVEstadoPedido } from '@CVTemplate/core/CVEstado/CVEstadoPedido';
import CVLink from '@CVTemplate/core/CVLink';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { useLocation } from 'react-router-dom';
import RemisionGuide from './components/RemisionGuide/RemisionGuide';
export const TextLeft = ({ children, ...rest }) => (
  <Text
    textAlign='left'
    fontSize={rest?.fontSize ? rest?.fontSize : '12px'}
    {...rest}>
    {children}
  </Text>
);

const OrderDetails = ({
  data,
  cancelapedido,
  addExcessShipping,
  permisions,
  basepath,
  item
}) => {
  const { pathname } = useLocation();
  const showGuide = pathname.includes('bo');

  return (
    <Grid container spacing={1} alignContent='stretch' alignItems='stretch'>
      <Grid item xs={12} sm={7} md={8}>
        <Box
          padding='16px'
          w='100%'
          h='100%'
          bg='white'
          borderRadius='16px'
          boxShadow='0px 2px 6px #00000040'
          boxSizing='border-box'>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
              <Flex alignItems='center'>
                <TextLeft
                  width='max-content'
                  color='covende.default.main'
                  fontWeight='bold'>
                  Estado del pedido
                </TextLeft>
                <SizeBox />
                <CVText
                  fontWeight='bold'
                  color={CVEstadoPedido(data?.status).color}>
                  {CVEstadoPedido(data?.status).text}
                </CVText>
              </Flex>
            </Grid>
            <Grid item xs={12} sm={4} md={5}>
              <InformationPedido data={data} />
              <ProductoPedido data={data} />
            </Grid>
            <Grid item xs={12} sm={4} md={5}>
              <EnvioPedido data={data} />
              <CompradorPedido data={data} />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Flex justify='space-between'>
                {data?.receipt_url && (
                  <Flex align='end' direction='column'>
                    <CVLink
                      href={data?.receipt_url}
                      target='_blank'
                      color='blue'>
                      <Flex>
                        <RemisionGuide />
                        <Heading ml='5px' color={COLORS['black']}>
                          Comprobante de pago .PDF
                        </Heading>
                      </Flex>
                    </CVLink>
                  </Flex>
                )}

                {data?.guide_number && (
                  <Flex align='end' direction='column'>
                    <CVLink
                      href={
                        basepath + '/api.shippingguidepdf/' + data?.guide_number
                      }
                      target='_blank'
                      color='blue'>
                      <Flex>
                        <RemisionGuide />
                        <Heading ml='5px' color={COLORS['black']}>
                          Guía de remisión .PDF
                        </Heading>
                      </Flex>
                    </CVLink>
                  </Flex>
                )}

                <Box>
                  {permisions.eliminar && data?.permit_cancelled && (
                    <Flex>
                      <CVButton
                        disabled={!data?.permit_cancelled}
                        backgroundColor='red'
                        onClick={() =>
                          cancelapedido(data.information?.order_id)
                        }>
                        Cancelar pedido
                      </CVButton>
                    </Flex>
                  )}
                </Box>

                {showGuide &&
                  ['PROCESSED', 'SENDED', 'COMPLETED'].includes(data.status) &&
                  !data.weekly_cut_id && (
                    <Box>
                      <Flex>
                        <CVButton
                          backgroundColor='red'
                          onClick={() =>
                            addExcessShipping(data.information?.order_id)
                          }>
                          GENERAR EXCESO DE ENVÍO
                        </CVButton>
                      </Flex>
                    </Box>
                  )}
              </Flex>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={5} md={4}>
        <EstadoPedido data={data} />
      </Grid>
    </Grid>
  );
};

export default OrderDetails;
