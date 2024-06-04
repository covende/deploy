import { FULL_QUERY_PRODUCTS } from '@/app/api/graphql/webpublic/category/CategoryService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CVGoUp } from '@/common/CovendeTemplate/CVMethods';
import WMProduct from '@/app/api/graphql/webmodel/WMProduct';
import ProductsList from '../categoria/ProductsList';
import { CVPanel, CVText } from '@/common/CovendeTemplate';
import { Box, Flex } from '@chakra-ui/react';
import { Container } from '@material-ui/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { FaTimesCircle } from 'react-icons/fa';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';

const consult = (search) => `{
  productSearchPublic(search:"${search}")${WMProduct}
}`;
function Buscar() {
  const [loading, setloading] = useState(false);
  const [lista, setlista] = useState([]);
  const { search } = useParams();
  const [sortBy, setSortBy] = useState('');
  const [view, setView] = useState(true);

  const initdata = async (filtro, codigoCategoria, page, setInfoPagination) => {
    CVGoUp();
    setloading(true);
    const productsByCategoryPublic = await AxiosGQL(
      FULL_QUERY_PRODUCTS(filtro, codigoCategoria, page, sortBy, 20)
    );

    if (productsByCategoryPublic?.productsPublic?.info?.total == 0)
      setView(false);

    productsByCategoryPublic?.productsPublic?.productsItemPublic &&
      setlista(productsByCategoryPublic.productsPublic.productsItemPublic);

    productsByCategoryPublic?.productsPublic?.info &&
      setInfoPagination(productsByCategoryPublic.productsPublic.info);

    setloading(false);
  };

  useEffect(() => {
    setView(true);
  }, [search]);

  // return view ? (
  //   <ProductsList
  //     loading={loading}
  //     setloading={setloading}
  //     lista={lista}
  //     slug={''}
  //     search={search}
  //     fetchdata={initdata}
  //     setSortBy={setSortBy}
  //     sortBy={sortBy}
  //   />
  // ) : (
  //   <Container>
  //     <SizeBox />
  //     <CVPanel variant='box'>
  //       <SizeBox />
  //       <Flex justifyContent='center' alignItems='center'>
  //         <span>
  //           <FaTimesCircle style={{ color: COLORS['red'] }} />
  //         </span>
  //         <CVText>
  //           No se encontraron resultados para
  //           <span style={{ fontWeight: 'bold', marginLeft: '0.5rem' }}>
  //             {search}
  //           </span>
  //         </CVText>
  //       </Flex>
  //     </CVPanel>
  //   </Container>
  // );

  return (
    <ProductsList
      loading={loading}
      setloading={setloading}
      lista={lista}
      slug={''}
      search={search}
      fetchdata={initdata}
      setSortBy={setSortBy}
      sortBy={sortBy}
    />
  );
}

export default Buscar;
