import React, { useEffect } from 'react';

import ProductList from '../shared/ProductHorizontalList';
import { Box, Flex } from '@chakra-ui/layout';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVCarrusel from '@CVTemplate/core/CVCarrusel';
import CVCardProduct from '@CVTemplate/core/CVCardProduct';
import CVLine from '@/common/CovendeTemplate/CVLine';
import { Grid } from '@material-ui/core';
import { FaEye } from 'react-icons/fa';
import { v4 } from 'uuid';
import { CVImage } from '@/common/CovendeTemplate';
import { CVOverflow } from '@/common/CovendeTemplate';
import { useSelector } from 'react-redux';
import { usePartsData } from '@/common/hooks/index';
import {
  breakPoints2Items,
  breakpointsRow,
  breakpointsCol
} from '../MejorValorados/breakpoints';
import { LoaderCardRow } from '../MejorValorados/index';

function MasVisitados() {
  const { MostVisited, MasVisitados, loading } = useSelector(
    (state) => state.HomeData
  );

  const [part1, part2, part3, part4] = usePartsData(MostVisited);

  return (
    <Box>
      <CVLine
        color='#C4C4C4'
        lineHeight='0.1rem'
        colortext='#004574'
        titles={[
          <Flex alignItems='center' fontSize='1.9rem'>
            <FaEye color='#6057D9' style={{ fontSize: '30px' }} />
            <SizeBox /> Más visitados
          </Flex>
        ]}
      />

      <Grid container spacing={1}>
        <Grid item xs={12} sm={5} md={4} lg={3}>
          {MasVisitados.map((item) => (
            <Flex
              key={v4()}
              width='100%'
              // height='100%'
              justify='center'
              alignItems='center'>
              <CVImage
                // link={item.imagelink}
                image={item.image}
                borderRadius='10px'
                width='auto'
                height='325px'
              />
            </Flex>
          ))}
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={9}>
          {!loading ? (
            <CVCarrusel
              pagination={false}
              navigation={true}
              breakPoints={breakpointsCol}
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
            <LoaderCardRow numberItems={3} />
          )}
        </Grid>

        {/* <CVOverflow>
              <Flex>
                <ProductList
                  limit={20}
                  loading={loading}
                  data={MostVisited && MostVisited.slice(0, 11)}
                  height='157px'
imgWidth='157px'
                />
              </Flex>
            </CVOverflow> */}
        {/* <Box width='100%'>
            <CVOverflow>
              <Flex>
                <ProductList
                  limit={20}
                  loading={loading}
                  data={MostVisited && MostVisited.slice(11, 20)}
                  height='157px'
                  imgWidth='157px'
                />
              </Flex>
            </CVOverflow>
          </Box> */}
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

export default MasVisitados;
