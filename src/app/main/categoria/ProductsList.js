import { CATEGORY_PRODUCT_BY_SLUG } from '@/app/api/graphql/webpublic/category/CategoryService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { Container, Grid } from '@material-ui/core';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Resultados from './Resultados';
import { CVGoUp } from '@/common/CovendeTemplate/CVMethods';
import { CVImage, CVSelect, CVText } from '@/common/CovendeTemplate';
import CVPagination from '@/common/CovendeTemplate/CVPagination';
import { ORDERTYPE } from '@/common/CovendeTemplate/CVThemes';
import Filtros from './Filtros';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import LinksHelp from '../tienda/TiendasOficiales/componetes/LinksHelp';
import CVBreadcrumb from '@CVTemplate/core/CVBreadcrumb';
import { AddsSpace } from './AddsSpace';

export const initfiltro = {
  category_id: '',
  filtro: {
    marca_id: '',
    condicion: '',
    price_range: {
      desde: '',
      hasta: ''
    },
    type_sale: 'BOTH',
    search: ''
  },
  filtro_o: {
    mayor_precio: false,
    menor_precio: false,
    novedades: false,
    mas_vendido: false,
    mejor_calificado: false
  },
  offer: false
};

function ProductsList({
  loading,
  setloading,
  lista,
  slug,
  fetchdata,
  setSortBy,
  sortBy,
  search
}) {
  const [category, setcategory] = useState({ _id: '' });
  const [filtro, setfiltro] = useState(initfiltro);
  const [blug, setblug] = useState('');
  const [banner, setBanner] = useState('');
  const [page, setPage] = useState(1);
  const [headers, setHeaders] = useState([]);
  const [init, setInit] = useState(true);

  const [infoPagination, setInfoPagination] = useState([]);

  const initdataslug = async (slugs) => {
    CVGoUp();
    setloading(true);
    const { categoryProductBySlug } = await AxiosGQL(
      CATEGORY_PRODUCT_BY_SLUG(slugs, true)
    );
    setBanner(categoryProductBySlug.banner);
    setcategory(categoryProductBySlug || { _id: '' });
    setblug(categoryProductBySlug._id);

    let parents = [];
    if (categoryProductBySlug.parents) {
      parents = categoryProductBySlug.parents.map((p) => ({
        text: p.name,
        uri: p.slug
      }));
    }

    setInit(true);
    setPage(1);
    parents.unshift({ text: 'inicio', uri: '/' });
    setHeaders(parents);
    await fetchdata(filtro, categoryProductBySlug, 1, setInfoPagination);
    setloading(false);
  };

  const initdatablug = async (blugs) => {
    if (sortBy == '' && typeof blugs == 'string' && category._id == blug)
      return;

    CVGoUp();
    setloading(true);
    setInit(true);
    setPage(1);
    await fetchdata(
      typeof blugs == 'string' ? filtro : blugs,
      { _id: blug },
      1,
      setInfoPagination
    );
    setloading(false);
  };

  const initdataSearch = async () => {
    CVGoUp();
    setfiltro({ ...filtro, filtro: { ...filtro.filtro, search } });
    setloading(true);
    setInit(true);
    await fetchdata(
      { ...filtro, filtro: { ...filtro.filtro, search } },
      {},
      1,
      setInfoPagination
    );
    setPage(1);
    setloading(false);
  };

  const initdatapage = async (pages) => {
    if (init) return;
    CVGoUp();
    setloading(true);
    await fetchdata(filtro, { _id: blug }, pages, setInfoPagination);
    setloading(false);
  };

  const changePage = (page) => {
    setInit(false);
    setPage(page);
  };

  useEffect(() => {
    slug && initdataslug(slug);
  }, [slug]);

  useEffect(() => {
    if (blug) initdatablug(blug);
    else if (!!search) initdataSearch();
  }, [blug, sortBy]);

  useEffect(() => {
    page && initdatapage(page);
  }, [page]);

  useEffect(() => {
    search && initdataSearch();
  }, [search]);

  return (
    <Container>
      <Box>
        {/* <LinksHelp /> */}
        <CVBreadcrumb backgroundColor='white' data={headers} />
      </Box>
      <SizeBox />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4} md={3}>
          <Box position='relative'>
            <Filtros
              filtro={filtro}
              setfiltro={setfiltro}
              category={category}
              fetchdata={initdatablug}
              blug={blug}
              setblug={setblug}
              setHeaders={setHeaders}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Box>
            {banner != '' && (
              <Box p={3}>
                <CVImage image={banner} borderRadius='12px' />
              </Box>
            )}
            <Flex w='98%' justify='end'>
              <Flex w='50%' mb={1} justify='space-between' align='center'>
                <Flex>
                  <Text w='9rem' color='#949494' fontWeight='bold'>
                    {infoPagination?.total || lista.length}{' '}
                    <span style={{ fontWeight: 'normal' }}>Productos</span>
                  </Text>
                </Flex>
                <CVSelect
                  title='Ordenar: '
                  onChange={(value) => setSortBy(value)}
                  options={ORDERTYPE}
                  value={sortBy}
                />
              </Flex>
            </Flex>
            <Resultados data={lista} data2={lista} onload={loading} />
            <CVPagination
              page={page}
              setPage={changePage}
              pageNumber={infoPagination.pages}
            />
          </Box>
        </Grid>
      </Grid>
      <Box py={10}></Box>
    </Container>
  );
}

export default ProductsList;
