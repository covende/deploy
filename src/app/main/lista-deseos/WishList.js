import React, { useEffect, useState } from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVBreadcrumb } from '@/common/CovendeTemplate';
import { Text } from '@chakra-ui/react';
import { Box, Container, Grid } from '@material-ui/core';
import WLList from './components/WLList';
import WProductosSimilares from './components/WProductosSimilares';

function WishList({}) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <CVBreadcrumb
        backgroundColor='white'
        data={[
          { text: 'Inicio', uri: '/' },
          { text: 'Lista de Deseos', uri: '/wish-list' }
        ]}
      />
      <SizeBox />
      <Box>
        <Container>
          <Text color='#004772' fontSize='1.5rem'>
            Lista de Deseos
          </Text>
        </Container>
      </Box>
      <SizeBox />

      <Container>
        <WLList
          setLists={(data) => {
            let cats = new Set();
            let prts = new Set();
            data.forEach((item) => {
              prts.add(item.product_id);
              cats.add(item.main_category);
            });
            setProducts(Array.from(prts.values()));
            setCategories(Array.from(cats.values()));
          }}
        />
        <SizeBox height='1rem' />
        <WProductosSimilares categories={categories} products={products} />
      </Container>
    </>
  );
}

export default WishList;
