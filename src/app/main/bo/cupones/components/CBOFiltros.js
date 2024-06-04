import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVInput } from '@/common/CovendeTemplate';
import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { Link } from 'react-router-dom';

function CBOFiltros({ search, setsearch }) {
  return (
    <Flex justifyContent='space-between' padding='0 1rem'>
      <Box maxWidth='400px'>
        <CVInput
          value={search}
          onChange={(value) => setsearch(value)}
          iconFind={true}
        />
      </Box>
      <Box display='flex'>
        <Link to='/bo/cupones/usados'>
          <CVButton fontWeight='bold' backgroundColor='green'>
            LISTA DE USADOS
          </CVButton>
        </Link>
        <SizeBox />
        <Link to='/bo/cupones/create'>
          <CVButton fontWeight='bold' backgroundColor='red'>
            CREAR CUPON
          </CVButton>
        </Link>
      </Box>
    </Flex>
  );
}

export default CBOFiltros;
