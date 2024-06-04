import React, { useEffect, useState } from 'react';

import ProductList from '../shared/ProductHorizontalList';
import { Box, Flex, Skeleton } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVLine from '@/common/CovendeTemplate/CVLine';
import { Grid } from '@material-ui/core';
import { AiFillStar } from 'react-icons/ai';
import { v4 } from 'uuid';
import { CVImage } from '@/common/CovendeTemplate';
import { useSelector } from 'react-redux';
import CVCarrusel from '@CVTemplate/core/CVCarrusel';
import CVCardProduct from '@CVTemplate/core/CVCardProduct';
import { breakPointsBestValorated, breakpointsRow } from './breakpoints';
import { usePartsData } from '@/common/hooks/index';
import { MyLoader } from '@/common/components/Loaders/MyLoader';
import { MyLoaderVertical } from '../shared/ProductVerticalList';

export const LoaderCardRow = ({
  gap = '5px',
  numberItems = 5,
  isVertical = true
}) => {
  return (
    <Flex overflow='hidden' gap={gap}>
      {Array(numberItems)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            style={{
              background: '#fff',
              boxSizing: 'border-box',
              borderRadius: '14px'
            }}>
            {isVertical ? <MyLoaderVertical /> : <MyLoader />}
          </div>
        ))}
    </Flex>
  );
};

function MejorValorados() {
  const { MejorValorado, BestRated, loading } = useSelector(
    (state) => state.HomeData
  );

  const [part1, part2, part3, part4] = usePartsData(BestRated);

  return (
    <Box w='100%'>
      <CVLine
        color='#C4C4C4'
        lineHeight='0.1rem'
        colortext='#004574'
        titles={[
          <Flex alignItems='center' fontSize='1.9rem'>
            <AiFillStar color='#FFC703' style={{ fontSize: '30px' }} />
            <SizeBox /> Mejor valorado
          </Flex>
        ]}
      />
      <Grid container>
        <Grid
          style={{ justifyContent: 'center', display: 'flex' }}
          item
          xs={12}
          sm={5}
          md={4}
          lg={3}>
          {!loading ? (
            MejorValorado.map((item) => (
              <Flex key={v4()} maxW='288px'>
                <CVImage
                  // link={item.imagelink}
                  borderRadius='10px'
                  image={item.image}
                />
              </Flex>
            ))
          ) : (
            <Skeleton maxW='288px' height='auto' borderRadius='10px' />
          )}
        </Grid>

        <Grid item xs={12} sm={7} md={8} lg={9}>
          {!loading ? (
            <CVCarrusel
              pagination={false}
              navigation={true}
              breakPoints={breakPointsBestValorated}
              delay={2000}
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
    </Box>
  );
}

export default MejorValorados;
