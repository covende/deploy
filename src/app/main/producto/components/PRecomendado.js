import {
  PRODUCTS_RANDOM_PUBLIC,
  PRODUCTS_BEST_SELLERS
} from '@/app/api/graphql/webpublic/products/HomeProducts';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CVLine, CVOverflow } from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ProductList from '../../home/shared/ProductVerticalList';

function PRecomendado({ idsCategories }) {
  const [loading, setLoading] = useState(false);
  const [bestS, setBestS] = useState([]);
  const [random, setRandom] = useState([]);
  const initData = async () => {
    try {
      setLoading(true);
      const { productsRandomPublic } = await AxiosGQL(
        PRODUCTS_RANDOM_PUBLIC(6, idsCategories)
      );
      const { BestSellers } = await AxiosGQL(
        PRODUCTS_BEST_SELLERS(idsCategories)
      );
      setBestS(BestSellers?.productsItemPublic);
      setRandom(productsRandomPublic?.productsItemPublic);
      setLoading(false);
    } catch (error) {
      if (error) console.log(error);
    }
  };
  useEffect(() => {
    initData();
  }, [idsCategories]);
  return (
    <Grid item xs={12} sm={12} md={12}>
      <CVLine titles={['Recomendados']} color='blue' />
      <CVOverflow>
        <Flex>
          <ProductList limit={6} loading={loading} data={bestS || []} />
        </Flex>
      </CVOverflow>
      <CVLine titles={['Productos Similares']} color='blue' />
      <CVOverflow>
        <ProductList limit={6} loading={loading} data={random || []} />
      </CVOverflow>
    </Grid>
  );
}

export default PRecomendado;
