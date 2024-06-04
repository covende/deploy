import React, { useEffect } from 'react';

// Componentes
import MCategorias from '../../tienda/TiendasOficiales/componetes/MCategorias';
import { Box, Flex } from '@chakra-ui/layout';
import { CVLine } from '@/common/CovendeTemplate';
import { useSelector } from 'react-redux';
import CVText from '@CVTemplate/core/CVText';

import useWindowSize from '@/common/hooks/useWindowSize';
function CategoriasMasBuscadas() {
  // const screenSize = useWindowSize();
  // const isMobile = screenSize.width < 576;

  const { CategoriesHeaderPublic, loading } = useSelector(
    (state) => state.HomeData
  );

  return (
    <Box>
      <CVLine
        color='#C4C4C4'
        lineHeight='0.1rem'
        titles={[
          '',
          <CVText
            fontSize='1.9rem'
            fontSizeResponsive='1.5rem'
            justifyContent='center'
            //  {isMobile? '1.3rem ': '1.9rem'}
            color='blue'
            fontWeight='bold'
            display='flex'>
            Categorías más buscadas
            {/* <Flex 
      //  width={isMobile?'320px': '500px'} 
        justifyContent='center' color='#004574'>
       Categorías más buscadas
       </Flex>  */}
          </CVText>,
          ''
        ]}
      />
      <MCategorias
        SCategoriesHeaderPublic={CategoriesHeaderPublic}
        loading={loading}
      />
    </Box>
  );
}

export default CategoriasMasBuscadas;
