import React, { useEffect } from 'react';
import ProductList from '../shared/ProductVerticalList';
import { Flex } from '@chakra-ui/react';
import { CVLine, CVOverflow } from '@/common/CovendeTemplate';
import { useSelector } from 'react-redux';
import { SlLike } from 'react-icons/sl';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box } from '@/../node_modules/@material-ui/core/index';

function Recomendaciones() {
  let codCategory = localStorage.getItem('category');
  const { RecomendedByCategory, Suggested, loading } = useSelector(
    (state) => state.HomeData
  );
  return (
    <Box>
      <CVLine
        color='#C4C4C4'
        lineHeight='0.1rem'
        colortext='#004574'
        titles={[
          <Flex alignItems='center' fontSize='1.9rem'>
            <SlLike color='#00ADF6' style={{ fontSize: '30px' }} />
            <SizeBox /> Recomendados para ti
          </Flex>
        ]}
      />
      <CVOverflow>
        <Flex>
          <ProductList
            limit={20}
            loading={!loading}
            data={codCategory == null ? RecomendedByCategory : Suggested}
          />
        </Flex>
      </CVOverflow>
    </Box>
  );
}

export default Recomendaciones;
