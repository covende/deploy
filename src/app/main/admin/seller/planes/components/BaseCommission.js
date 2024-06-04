import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVLine, CVText, CVCheckBox } from '@/common/CovendeTemplate';
import { Flex, Text, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

function BaseCommission() {
  useEffect(() => {}, []);
  return (
    <Box>
      <SizeBox height='2rem' />
      <CVLine
        backgroundColor='white'
        height='1px'
        color='blue'
        titles={[
          '',
          <CVText
            fontSize='1.3rem'
            fontWeight='bold'
            color='blue'
            display='flex'>
            <Flex width='190px !important' justifyContent='center'>
              Comisiones por Ventas
            </Flex>
          </CVText>,
          ''
        ]}
      />
      <Box>
        <Flex mt={3} p={3}>
          Covende cobra comisiones por cada venta dependiendo de la categoría
          del producto.<br></br> Por lanzamiento, las siguientes comisiones
          aplican a todas las categorías:
        </Flex>
      </Box>
      <Box>
        <Flex
          ml={230}
          background='#004772'
          p={2}
          pl={5}
          color='#fff'
          borderTopRadius='12px'>
          <Box px={3}> Comisión Fija *</Box>
          <Box px={3}> Comisión Variable *</Box>
        </Flex>
        <Box>
          <Flex
            borderTopStartRadius='12px'
            color='#004772'
            p={5}
            border='1px'
            borderColor='#004772'>
            <Box mx={1}>Transacción menor a S/ 200</Box>
            <Box mx={46}>S/ 8</Box>
            <Box mx={46}>8%</Box>
          </Flex>
          <Flex
            borderBottomRadius='12px'
            color='#004772'
            p={5}
            border='1px'
            borderColor='#004772'>
            <Box mx={1}>Transacción menor a S/ 200</Box>
            <Box mx={46}>S/ 6</Box>
            <Box mx={46}>6%</Box>
          </Flex>
        </Box>
        <Text pl={1} color='#00ADF6'>
          *Comisiones sujetas a cambio.
        </Text>
      </Box>
    </Box>
  );
}

export default BaseCommission;
