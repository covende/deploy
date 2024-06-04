import React from 'react';

import { useQueryGQL } from '@/common/hooks';
import { PRODUCTS_RANDOM_PUBLIC } from '@/app/api/graphql/webpublic/products/HomeProducts';
import ProductList from '../../home/shared/ProductHorizontalList';
import { Box, Text } from '@chakra-ui/react';

function WTRecomendamos() {
  const { loading, error, data } = useQueryGQL(PRODUCTS_RANDOM_PUBLIC(6));
  return (
    <Box backgroundColor='#FFFFFF' padding='1.5rem 0px' borderRadius='1rem'>
      <Text
        color='#004574'
        fontSize='1.25rem'
        paddingLeft='1rem'
        fontWeight='bold'
      >
        Te recomendamos
      </Text>
      <ProductList
        limit={6}
        loading={loading}
        error={error}
        data={
          data ? data?.productsRandomPublic?.productsItemPublic || [] : data
        }
      />
    </Box>
  );
}

export default WTRecomendamos;
