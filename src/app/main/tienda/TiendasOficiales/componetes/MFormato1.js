import React, { useEffect, useState } from 'react';

import { Box, Flex, Skeleton, Text, Image } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import { v4 } from 'uuid';
import AxiosGQL from '@/app/api/rest/AxiosGQL';

import { CATEGORY_PRODUCTS_OFFERT_PUBLIC } from '@/app/api/graphql/webpublic/category/CategoryService';
import { COLORS } from '@CVTemplate/core/CVThemes';
import { CVCardProductOffer } from '@/common/CovendeTemplate';
import { Link } from 'react-router-dom';
import { ofertas } from './MMock';
import MTienda from './MTienda';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function MFormato1({ category, position = 'right', isAll, index = 0 }) {
  const [loading, setloading] = useState(true);
  const [offers, setoffers] = useState(ofertas);
  const initdata = async () => {
    setloading(true);
    const { categoryProductsOfferPublic } = await AxiosGQL(
      CATEGORY_PRODUCTS_OFFERT_PUBLIC(10)
    );
    setoffers(categoryProductsOfferPublic);
    setloading(false);
  };

  useEffect(() => {
    initdata();
  }, [category]);

  return (
    <Box mt='35px'>
      <Grid container spacing={1}>
        {position == 'left' && (
          <Grid item xs={12} sm={4} md={3}>
            <Grid container spacing={1}>
              {index + 1 >= offers.length
                ? offers.slice(0, 1).map((item) => (
                    <Grid item xs={12} sm={12} md={12} key={v4()}>
                      <CVCardProductOffer
                        time='2021-11-13T14:32:02.480Z'
                        image={item.slider}
                        title={item.name}
                        products={item.products.map((it) => ({
                          image: it.product_photo,
                          price: it.precio,
                          offert_percent: it.percentage_oferta
                        }))}
                      />
                    </Grid>
                  ))
                : offers.slice(index, index + 1).map((item) => (
                    <Grid item xs={12} sm={12} md={12} key={v4()}>
                      <CVCardProductOffer
                        time='2021-11-13T14:32:02.480Z'
                        image={item.slider}
                        title={item.name}
                        products={item.products.map((it) => ({
                          image: it.product_photo,
                          price: it.precio,
                          offert_percent: it.percentage_oferta
                        }))}
                      />
                    </Grid>
                  ))}
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} sm={8} md={9}>
          <Box w='100%' h='208px'>
            {loading ? (
              <Skeleton height='208px' />
            ) : (
              <Image
                src={category.banner}
                borderRadius='16px'
                w='100%'
                height='212px'
              />
            )}
          </Box>
          <SizeBox />
          <Grid
            container
            spacing={1}
            style={{ overflow: 'auto', height: '50%' }}>
            {loading ? (
              <Skeleton height='200px' />
            ) : (
              (isAll
                ? category.stores.length == 4
                  ? category.stores.slice(0, 4)
                  : category.stores.slice(0, 3)
                : category.stores
              ).map((item) => (
                <Grid key={v4()} item xs={6} sm={4} md={3}>
                  <MTienda item={item} size='210px' />
                </Grid>
              ))
            )}
            {isAll && category.stores.length > 4 && (
              <Grid item align='center'>
                <Link to={`/tienda-oficiales/${category.category_id}`}>
                  <Flex
                    h='210px'
                    w='210px'
                    bg='white'
                    m='0.5rem'
                    align='center'
                    justify='center'
                    textAlign='center'
                    fontSize='20px'
                    fontWeight={600}
                    color={COLORS['blue']}
                    borderRadius='1.2rem'>
                    Ver <br /> todas
                  </Flex>
                </Link>
              </Grid>
            )}
          </Grid>
        </Grid>
        {position == 'right' && (
          <Grid item xs={12} sm={4} md={3}>
            <Grid container spacing={1}>
              {index + 1 >= offers.length
                ? // Publicidad
                  offers.slice(0, 1).map((item) => (
                    <Grid item xs={12} sm={12} md={12} key={v4()}>
                      <CVCardProductOffer
                        time='2021-11-13T14:32:02.480Z'
                        image={item.slider}
                        title={item.name}
                        products={item.products.map((it) => ({
                          image: it.product_photo,
                          price: it.precio,
                          offert_percent: it.percentage_oferta
                        }))}
                      />
                    </Grid>
                  ))
                : offers.slice(index, index + 1).map((item) => (
                    <Grid item xs={12} sm={12} md={12} key={v4()}>
                      <CVCardProductOffer
                        time='2021-11-13T14:32:02.480Z'
                        image={item.slider}
                        title={item.name}
                        products={item.products.map((it) => ({
                          image: it.product_photo,
                          price: it.precio,
                          offert_percent: it.percentage_oferta
                        }))}
                      />
                    </Grid>
                  ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default MFormato1;
