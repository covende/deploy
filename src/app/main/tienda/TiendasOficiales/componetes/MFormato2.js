import { Box, Flex, Skeleton, Text } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import tiendasimage from '@/app/assets/img/tiendasimage.jpg';
import { v4 } from 'uuid';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { ALL_COMPANYS } from '@/app/api/graphql/webpublic/stores/StoresService';
import MTienda from './MTienda';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { ofertas } from './MMock';
import { CATEGORY_PRODUCTS_OFFERT_PUBLIC } from '@/app/api/graphql/webpublic/category/CategoryService';
import { CVCardProductOffer, CVImage } from '@/common/CovendeTemplate';
import MuebleIcon from '../components/MuebleIcon';

function MFormato2() {
  const [loading, setloading] = useState(true);
  const [tiendas, settiendas] = useState([]);
  const [paginacion, sepaginacion] = useState({});
  const initdata = async (page = 1, limit = 12) => {
    setloading(true);
    const { companys } = await AxiosGQL(ALL_COMPANYS({ page, limit }));
    sepaginacion({ ...companys, docs: [] });
    settiendas(companys?.docs || []);
    setloading(false);

    const listOffers = await AxiosGQL(CATEGORY_PRODUCTS_OFFERT_PUBLIC(10));
    setoffers(listOffers.categoryProductsOfferPublic);
  };
  const [offers, setoffers] = useState(ofertas);
  useEffect(() => {
    initdata();
  }, []);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4} md={3}>
        <Grid container spacing={1}>
          {offers.map((item) => (
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
      <Grid item xs={12} sm={8} md={9}>
        <Box backgroundColor='#17BF93' borderRadius='16px' width='100%'>
          <Flex
            justifyContent='space-around'
            alignItems='center'
            flexWrap='wrap'>
            <Box padding='1rem'>
              <Text fontSize='4rem' fontWeight='bold' color='#FFFFFF'>
                Electrohogar
              </Text>
              <Text fontSize='1.5rem' color='#FFFFFF'>
                Consigue tus mejores <br/> electrodomésticos para tu hogar 
              </Text>
            </Box>
            <MuebleIcon w='40rem'/>
          </Flex>
        </Box>
        <SizeBox />
        <Grid container spacing={1}>
          {loading ? (
            <Skeleton height='200px' />
          ) : (
            tiendas.map((item) => (
              <Grid key={v4()} item xs={6} sm={4} md={3}>
                <MTienda item={item} size='210px' />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MFormato2;
