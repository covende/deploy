import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { Box, Text, Center } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  CVButton,
  CVCardProductOffer,
  CVCardProduct,
  CVCarrusel,
  CVLine,
  CVImage
} from '@/common/CovendeTemplate';
import { useSelector } from 'react-redux';
import { SCREEN } from '@CVTemplate/core/CVThemes';
import { TitleFastOffer } from './component/assets';
import CountDownTime from './component/CountDownTime';
import { breakPointsOffers } from '../MejorValorados/breakpoints';
import { Grid } from '@/../node_modules/@material-ui/core/index';

function Ofertas() {
  const { CategoryProductsOfferPublic } = useSelector(
    (state) => state.HomeData
  );

  return (
    <div>
      {/* <CVLine
        color='yellow'
        titles={[
          'Ofertas de la Semana',
          <Link to='/ofertas'>
            <CVButton
              backgroundColor='yellow'
              boxShadow='none'
              fontSize='1.25rem'
              fontWeight='bold'>
              Ver todo
            </CVButton>
          </Link>
        ]}
      /> */}

      <>
        <Box
          // justifyContent='space-between'
          // alignItems='center'
          // p='0px 3rem'
          pl={5}
          borderTopEndRadius='20px'
          borderTopStartRadius='20px'
          bg='#FF5454'>
          <Grid
            container
            spacing={1}
            direction='row'
            justifyContent='center'
            alignItems='center'
            //   justifyContent="flex-end
          >
            <Grid item xs={12} sm={12} md={4}>
              <TitleFastOffer />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <CountDownTime hours={5} minutes={1} seconds={10} />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Text fontSize='15px' color='#fff'>
                Ofertas increibles solo por pocas horas
              </Text>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              {/* <Box marginLeft='54px' marginBottom='17px'> */}
              <Link
                to='/ofertas'
                style={{
                  textDecoration: 'none',
                  padding: '3px 15px',
                  border: '1px solid #fff',
                  color: '#fff',
                  textTransform: 'uppercase',
                  borderRadius: '16px',
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}>
                ver más
              </Link>
              {/* </Box> */}
            </Grid>
          </Grid>
        </Box>
        {/* <CVImage image='https://covendefiles.s3.amazonaws.com/images/5-10+1.png' /> */}
      </>

      <CVCarrusel
        pagination={false}
        navigation={true}
        reverseSlide={false}
        breakPoints={breakPointsOffers}
        datalist={CategoryProductsOfferPublic.map(
          (item, index) =>
            index < 20 && (
              <CVCardProduct
                key={v4()}
                product_id={item?.product_id}
                product_photo={item?.product_photo || ''}
                precio={item?.precio}
                product_name={item?.product_name}
                precio_minimo={item?.precio_minimo}
                precio_maximo={item?.precio_maximo}
                offer={item?.offer}
                percentage_oferta={item?.percentage_oferta}
                offer_type={item?.offer_type}
                offer_value={item?.offer_value}
                puntuacion={item.stars}
                product_slug={item.product_slug}
                pedido_minimo={item?.pedido_minimo || 1}
                item={item || []}
              />
            )
        )}
      />
    </div>
  );
}

export default Ofertas;
