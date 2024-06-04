import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Resultados from '../categoria/Resultados';
import MCategoriasOfertas from '../tienda/TiendasOficiales/componetes/MCategoriasOfertas';
import { ofertaIcons } from './OfertasIcons';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  FULL_QUERY_PRODUCTS_OFERTAS,
  CATEGORY_PRODUCTS_OFFERT_PUBLIC
} from '@/app/api/graphql/webpublic/category/CategoryService';
// import { CATEGORY_PRODUCTS_OFFERT_PUBLIC } from '@/app/api/graphql/webpublic/category/CategoryService';
import { v4 } from 'uuid';
import fondooferta from '@/app/assets/img/fondooferta.png';
import producto1offerta from '@/app/assets/img/producto1offerta.png';
import producto2offerta from '@/app/assets/img/producto2offerta.png';
import CVPagination from '@/common/CovendeTemplate/CVPagination';

import { CVImage, CVCardProductOffer } from '@/common/CovendeTemplate';

function Ofertas() {
  const [loading, setloading] = useState(false);
  const [category, setcategory] = useState('');
  const [page, setPage] = useState(1);
  const [infoPagination, setInfoPagination] = useState({});
  const [offers, setoffers] = useState([
    {
      image_fondo: fondooferta,
      title: 'PRENDAS Y ROPA',
      products: [
        {
          image: producto1offerta,
          price: 66,
          offert_percent: '25'
        },
        {
          image: producto2offerta,
          price: 66,
          offert_percent: '25'
        }
      ]
    },
    {
      image_fondo: fondooferta,
      title: 'PRENDAS Y ROPA',
      products: [
        {
          image: producto1offerta,
          price: 66,
          offert_percent: '35'
        },
        {
          image: producto2offerta,
          price: 66,
          offert_percent: '35'
        }
      ]
    }
  ]);
  const [lista, setlista] = useState([]);

  // const initdata = async (page = 1, limit = 12) => {
  //   setloading(true);
  //   const { companys } = await AxiosGQL(ALL_COMPANYS({ page, limit }));
  //   sepaginacion({ ...companys, docs: [] });
  //   settiendas(companys?.docs || []);
  //   setloading(false);

  //   const { categoryProductsOfferPublic } = await AxiosGQL(
  //     CATEGORY_PRODUCTS_OFFERT_PUBLIC(10)
  //   );
  //   setoffers(categoryProductsOfferPublic);
  // };

  // useEffect(() => {
  //   initdata();
  // }, []);

  const initdata = async (pageCurrent) => {
    setloading(true);

    const productsByCategoryPublic = await AxiosGQL(
      FULL_QUERY_PRODUCTS_OFERTAS(category || '', pageCurrent || 1)
    );
    setlista(productsByCategoryPublic.productsPublic.productsItemPublic);

    if (productsByCategoryPublic?.productsPublic?.info) {
      setInfoPagination(productsByCategoryPublic?.productsPublic?.info);
      setPage(productsByCategoryPublic?.productsPublic?.info?.page);
    }

    setloading(false);
  };

  useEffect(() => {
    initdata(1);
  }, [category]);

  return (
    <Box>
      {/* <Box backgroundColor='#FFFFFF' padding='0.5rem 0px'>
        <Container>
          <Flex justifyContent='space-between' flexWrap='wrap'>
            <Text color='#004772' marginBottom='1rem'>
              <Link to='/'>inicio</Link> / Ofertas
            </Text>
          </Flex>
        </Container>
      </Box> */}
      <Container>
        <SizeBox />
        <CVImage image={ofertaIcons} />
        <SizeBox height='10px' />
        <MCategoriasOfertas setcategory={setcategory} fetchdata={() => {}} />
        <SizeBox height='20px' />
        <Grid container spacing={1}>
          {/* <Grid item xs={12} sm={4} md={3}>
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
          </Grid> */}
          <Grid item xs={12} sm={12} md={12}>
            <Resultados data={lista} data2={lista} onload={loading} />
          </Grid>
        </Grid>
        <CVPagination
          page={page}
          setPage={initdata}
          pageNumber={infoPagination.pages}
        />
      </Container>
    </Box>
  );
}

export default Ofertas;
