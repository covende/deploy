import React, { useEffect } from 'react';
import ProductList from '../shared/ProductHorizontalList';
import { Box, Flex, Skeleton } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVLine from '@/common/CovendeTemplate/CVLine';
import { Grid } from '@material-ui/core';
import { GiChart } from 'react-icons/gi';
import { BiLineChart } from 'react-icons/bi';
import { CVOverflow } from '@/common/CovendeTemplate';
import { v4 } from 'uuid';
import { CVImage } from '@/common/CovendeTemplate';
import { useSelector } from 'react-redux';
import { usePartsData } from '@/common/hooks/index';
import {
  breakPoints2Items,
  breakPointsMostSellers,
  breakpointsRow
} from '../MejorValorados/breakpoints';
import CVCarrusel from '@CVTemplate/core/CVCarrusel';
import CVCardProduct from '@CVTemplate/core/CVCardProduct';
import { LoaderCardRow } from '../MejorValorados/index';
import banneresp from '@/app/assets/images/banneresp.svg';
import useWindowSize from '@/common/hooks/useWindowSize';

function MasVendidos() {
  const screenSize = useWindowSize();
  const isMobile = screenSize.width < 576;

  const mystyle = { display: 'flex', flexDirection: 'row-reverse' };
  const { MasVisitadoBanner, MasVendido, BestSellers, loading } = useSelector(
    (state) => state.HomeData
  );

  const [part1, part2, part3, part4] = usePartsData(BestSellers);
  return (
    <Box>
      <CVLine
        color='#C4C4C4'
        lineHeight='0.1rem'
        colortext='#004574'
        titles={[
          <Flex alignItems='center' fontSize='1.9rem'>
            <BiLineChart color='#17BF93' style={{ fontSize: '30px' }} />
            <SizeBox /> Más vendidos
          </Flex>
        ]}
      />

      <Grid container spacing={1}>
        <Grid
          style={{ justifyContent: 'center', display: 'flex' }}
          item
          xs={12}
          sm={3}
          md={3}>
          {!loading ? (
            MasVendido.map((item) => (
              <Flex key={v4()} maxW='288px'>
                <CVImage
                  // link={item.imagelink}
                  image={item.image}
                  borderRadius='10px'
                />
              </Flex>
            ))
          ) : (
            <Skeleton mt='10px' width='100%' height='335px' rounded='15px' />
          )}
        </Grid>
        <Grid item xs={12} sm={9} md={9}>
          {!loading ? (
            <CVCarrusel
              pagination={false}
              navigation={true}
              breakPoints={breakPointsMostSellers}
              delay={4000}
              reverseSlide={false}
              speedTransition={2000}
              datalist={part1.map((item, index) => {
                if (index < 20) {
                  return (
                    <Flex justify='center'>
                      <CVCardProduct
                        key={v4()}
                        width='208px'
                        product_id={item?.product_id}
                        product_photo={item?.product_photo || ''}
                        precio={item?.precio}
                        product_name={item?.product_name}
                        precio_minimo={item?.precio_minimo}
                        precio_maximo={item?.precio_maximo}
                        offer={item?.offer}
                        offer_type={item?.offer_type}
                        offer_value={item?.offer_value}
                        percentage_oferta={item?.percentage_oferta}
                        puntuacion={item.stars}
                        product_slug={item.product_slug}
                        pedido_minimo={item?.pedido_minimo || 1}
                        item={item}
                        height='157px'
                        imgWidth='157px'
                      />
                    </Flex>
                  );
                }
              })}
            />
          ) : (
            <LoaderCardRow />
          )}
        </Grid>
      </Grid>

      <Box my={loading ? '5px' : '0'}>
        {!loading ? (
          <CVCarrusel
            pagination={false}
            navigation={true}
            breakPoints={breakpointsRow}
            reverseSlide={true}
            delay={4500}
            datalist={part2.map((item, index) => {
              if (index < 20) {
                return (
                  <Flex justify='center'>
                    <CVCardProduct
                      variant='large'
                      key={v4()}
                      product_id={item?.product_id}
                      product_photo={item?.product_photo || ''}
                      precio={item?.precio}
                      onSwiper={(e) => console.log(e)}
                      product_name={item?.product_name}
                      precio_minimo={item?.precio_minimo}
                      precio_maximo={item?.precio_maximo}
                      offer={item?.offer}
                      percentage_oferta={item?.percentage_oferta}
                      puntuacion={item.stars}
                      product_slug={item.product_slug}
                      pedido_minimo={item?.pedido_minimo || 1}
                      item={item}
                      height='157px'
                      imgWidth='157px'
                    />
                  </Flex>
                );
              }
            })}
          />
        ) : (
          <LoaderCardRow isVertical={false} numberItems={4} />
        )}
      </Box>

      {/* Adicional */}
      <Box>
        {!loading ? (
          <CVCarrusel
            pagination={false}
            navigation={true}
            breakPoints={breakpointsRow}
            reverseSlide={false}
            delay={3110}
            speedTransition={2000}
            datalist={part3.map((item, index) => {
              if (index < 20) {
                return (
                  <Flex justify='center'>
                    <CVCardProduct
                      variant='large'
                      key={v4()}
                      product_id={item?.product_id}
                      product_photo={item?.product_photo || ''}
                      precio={item?.precio}
                      onSwiper={(e) => console.log(e)}
                      product_name={item?.product_name}
                      precio_minimo={item?.precio_minimo}
                      precio_maximo={item?.precio_maximo}
                      offer={item?.offer}
                      percentage_oferta={item?.percentage_oferta}
                      puntuacion={item.stars}
                      product_slug={item.product_slug}
                      pedido_minimo={item?.pedido_minimo || 1}
                      item={item}
                      height='157px'
                      imgWidth='157px'
                    />
                  </Flex>
                );
              }
            })}
          />
        ) : (
          <LoaderCardRow isVertical={false} numberItems={4} />
        )}
      </Box>
      <Box w='100%' minH='180px'>
        {!loading ? (
          MasVisitadoBanner.map((item) => (
            <Grid item xs={12} sm={12} md={12} key={v4()}>
              <CVImage
                // link={item.imagelink}
                image={isMobile ? banneresp : item.image}
                width='auto'
                borderRadius='15px'
                height='100%'
              />
            </Grid>
          ))
        ) : (
          <Skeleton mt='10px' width='100%' height='100%' rounded='15px' />
        )}
      </Box>
    </Box>
  );
}

export default MasVendidos;
