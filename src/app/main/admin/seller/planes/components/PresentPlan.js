import { iconHouse } from '@/app/main/crea-tu-tienda/components/CreateStoreIcons';
import { CVButton, CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Flex, Button, Text, Box, useDisclosure } from '@chakra-ui/react';
import { Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import DetailPlane from '../DetailPlane';

function PresentPlan({ title, price, periodo, plan }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box width='300px' padding={2} background='#fff' borderRadius='12px'>
        <Flex
          justifyContent='center'
          direction='column'
          alignItems='center'
          mt={1}>
          <CVText fontSize='1.5rem' fontWeight='bold' color='skyblue'>
            <Flex justifyContent='center'>{title}</Flex>
          </CVText>

          <SizeBox height='2rem' />
          {iconHouse}
          <Flex align='center'>
            <Text color='#004772' fontWeight='bold' fontSize='24px'>
              S/ {price}
            </Text>
            <Text color='#004772' fontWeight='bold' fontSize='15px'>
              /{periodo || '0'} meses
            </Text>
          </Flex>
          <Text color='#004772' mb='13px'>
            + Comisiones por ventas
          </Text>
          <CVButton onClick={onOpen} fontSize='14px' fontWeight='600'>
            Ver detalle
          </CVButton>
        </Flex>
      </Box>
      <DetailPlane plan={plan} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
export default PresentPlan;
