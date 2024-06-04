import { PUBLIC_PRODUCT_BY_ID } from '@/app/api/graphql/webpublic/products/CartService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CVButton, CVImage, CVRating, CVText } from '@/common/CovendeTemplate';
import { Flex, Spinner, Text, Spacer } from '@chakra-ui/react';
import { Box, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { CVRenderHTML } from '@/common/CovendeTemplate/CVMethods';
import { _CONDICIONPROD, _ORIGINPROD } from '@/common/CovendeTemplate/CVThemes';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { estadoTexto } from '@/common/utils/index';
import { CVEstadoPedido } from '@CVTemplate/core/CVEstado/CVEstadoPedido';
import useWindowSize from '@/common/hooks/useWindowSize';

function LastPedidosItem({ item, idx, ver }) {
  const [product, setproduct] = useState(null);
  const [loading, setloading] = useState(true);
   const screenSize = useWindowSize();
  const isMobile = screenSize.width < 576;
  const initdata = async () => {
    setloading(true);

    const { productById } = await AxiosGQL(
      PUBLIC_PRODUCT_BY_ID({
        product_id: item.product_id,
        store_id: item.company_id
      })
    );

    setproduct(productById.product);
    setloading(false);
  };

  useEffect(() => {
    initdata();
  }, [item]);

  return (
    <Grid className='rows' key={v4()} item xs={12} sm={12} md={12}>
      <Box px='50px'>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4} md={3} w='160px'>
            <CVText variant='maxtext' color='blue' fontWeight='bold'>
              {item?.seller.first_name} {item?.seller.last_name}
            </CVText>
            {loading ? (
              <Spinner />
            ) : (
              <Text w='157px' color='#004772'>
                {item.receiver_district['name']}
              </Text>
            )}
            <Text color='#004772' fontWeight='bold'>
              {item?.store?.comercial_name != '-'
                ? item?.store?.comercial_name
                : item?.store?.social_razon}
            </Text>
            <CVText
              fontWeight='bold'
              color={CVEstadoPedido(item?.status).color}>
              {/* {CVEstadoPedido(item?.status).text} */}
            </CVText>
            <Flex>
              <CVRating puntuation={item.puntuacion} variant='simple' />
            </Flex>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
           <Grid container spacing={1} >
           <Grid item xs={12} sm={12} md={3}>
              <Box
                style={{
                  paddingRight: '0rem',
                  display: 'ruby',
                  marginRight: '2rem'
                }}>
                <CVImage
                  image={
                    item?.product?.photo || 'https://via.placeholder.com/100'
                  }
                  width={'100px'}
                  height={'100px'}
                />
              </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
              <Box style={{}}>
                <CVText fontWeight='bold' color='blue' variant='maxtext'>
                  {item?.product?.name}
                </CVText>
                <SizeBox />
                <Flex justifyContent='space-between'>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <CVText fontWeight='bold'>
                      {_CONDICIONPROD(product?.product_condition)?.text}
                    </CVText>
                  )}
                  <Box style={{ width: '23rem' }}>&nbsp;</Box>
                  {loading ? (
                    <Spinner />
                  ) : (
                    <CVText fontWeight='bold'>
                      {_ORIGINPROD(product?.product_origin)?.text}
                    </CVText>
                  )}
                </Flex>
                <SizeBox />

                <CVText
                  variant='maxtext'
                  lines={4}
                  marginRight='2rem'
                  overflow='auto'
                  display='flex'
                  justifyContent='center' >
                  <CVRenderHTML>
                    {item?.product?.featured_description || ''}
                  </CVRenderHTML>
                </CVText>
              </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={2} md={3}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%'
              }}>
              <Link to={'/buyer/pedidos/detalle/' + item.pedido_id}>
                {ver && <CVButton backgroundColor='red'>Ver Pedidos</CVButton>}
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default LastPedidosItem;
