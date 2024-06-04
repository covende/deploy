// Packages Primaries
import React, { useEffect, useState } from 'react';

// Packages Secondaries
import { Box, Text } from '@chakra-ui/react';
import { Container } from '@material-ui/core';
import { useParams } from 'react-router-dom';

// Packages Trirthies
import { CVBreadcrumb } from '@/common/CovendeTemplate';
import { STORES_BY_CATEGORIES_PUBLIC } from '@/app/api/graphql/webpublic/category/CategoryService';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import MCategorias from './componetes/MCategorias';
import MFormato1 from './componetes/MFormato1';
import MTiendas from './componetes/MTiendas';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import TiendasOficialesIcon from './components/TiendasOficialesIcon';

function TiendasOficiales() {
  const { id_category } = useParams();
  const [bCategories, setBCategories] = useState([]);
  const isAll = id_category == 'all';
  const initData = async () => {
    const { storesByCategoriesPublic } = await AxiosGQL(
      STORES_BY_CATEGORIES_PUBLIC({
        category: id_category == 'all' ? '' : id_category
      })
    );
    if (storesByCategoriesPublic.status)
      setBCategories(storesByCategoriesPublic.storesByCategories);
  };
  useEffect(() => {
    initData();
  }, [id_category]);
  return (
    <Box>
      <CVBreadcrumb
        backgroundColor='white'
        data={[
          { text: 'Inicio', uri: '/' },
          { text: 'Tiendas Oficiales', uri: '/' }
        ]}
        color='#004772'
        fontWeight='500'
      />
      <Container>
        <SizeBox height='1rem' />
        <Box
          backgroundColor='#00ADF6'
          rounded='16px'
          display='flex'
          justifyContent='space-evenly'
          alignItems='center'
          flexWrap='wrap'>
          <Box padding='1rem' mr='-140px'>
            <Text
              fontSize='4rem'
              fontWeight='bold'
              color='#FFFFFF'
              wordBreak='break-word'>
              Tiendas oficiales
            </Text>
            <Text
              fontSize='4rem'
              fontWeight='bold'
              color='#FFFFFF'
              wordBreak='break-word'>
              en CoVende
            </Text>
          </Box>
          <TiendasOficialesIcon />
        </Box>
        <SizeBox height='1rem' />
        {id_category == 'all' && <MTiendas />}
        <MCategorias id_category={id_category} />
        {isAll && bCategories.length != 0 ? (
          bCategories.map((category, index) => (
            <Box key={category.category_id + index}>
              <SizeBox height='1rem' />
              <MFormato1
                category={category}
                position={index % 2 == 1 ? 'left' : 'right'}
                index={index}
                isAll={isAll}
              />
            </Box>
          ))
        ) : (
          <Box>
            <SizeBox height='1rem' />
            {bCategories.length != 0 && (
              <MFormato1 category={bCategories[0]} isAll={isAll} />
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default TiendasOficiales;
