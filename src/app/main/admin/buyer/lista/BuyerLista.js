import React, { useState } from 'react';
import WLList from '@/app/main/lista-deseos/components/WLList';
import WProductosSimilares from '@/app/main/lista-deseos/components/WProductosSimilares';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVInput, CVRow, CVText } from '@/common/CovendeTemplate';
import { Container } from '@material-ui/core';
import { Box } from '@chakra-ui/react';

function BuyerLista() {
  const [tmpSearch, setTmpSearch] = useState('');
  const [search, setsearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <Container>
      <Box pr={50}>
        <CVRow justifyContent='space-between'>
          <CVText fontSize='1.5rem' color='red' fontWeight='bold'>
            Lista de Deseos
          </CVText>
          <CVInput
            width='350px'
            value={tmpSearch}
            onChange={setTmpSearch}
            buttonClick={() => setsearch(tmpSearch)}
            iconFind={true}
          />
        </CVRow>
        <SizeBox />
        <Box P={5}>
          <WLList
            search={search}
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
        </Box>

        <SizeBox />
        {categories.length > 0 && (
          <WProductosSimilares categories={categories} products={products} />
        )}
      </Box>
    </Container>
  );
}

export default BuyerLista;
