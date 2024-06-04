import React from 'react';
import { Flex,Center} from '@chakra-ui/react';
import { CVButton, CVModal, CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function StoreRegistered({ isOpen, onClose }) {
  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      bgHeader='green'
      colorHeader='white'
      header='Tienda Creada'
      justifyContentFooter='center'
      footer={
        <Center>
        <Flex justifyContent='center'>
          <CVButton
          onClick={onClose} 
           variant='outlined'>
            Aceptar
          </CVButton>
        </Flex>
        </Center>
      }>
      <CVText
        color='green'
        fontWeight='bold'
        textAlign='center'
        fontSize='1.25rem'>
        Solo queda un paso para tener tu tienda
      </CVText>
      <SizeBox />
      <CVText color='blue' textAlign='center'>
        Ahora vamos a crear un plan de afiliación
      </CVText>
    </CVModal>
  );
}

export default StoreRegistered;
